import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../LoadingContext"

import PartnerBlock from "../components/PartnerBlock/PartnerBlock";
import ContentBlock from "../components/ContentBlock/ContentBlock"


export default function Sponsorship() {
    const {startLoading, stopLoading} = useLoading();
    const { hash, pathname } = useLocation();
    const [partnerPageContent, setPartnerPageContent] = useState(null);
    const [partners, setPartners] = useState([])

    //this bit is copied into most of the pages, it handles the smooth scrolling when you select a dropdown in the navbar
    //it's also why the pages are divided into <section> tags, so the sections are clearly laid out
    useEffect(() => {
    if (hash) {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
    }
    else {
        window.scrollTo({top : 0, behavior: "smooth"});
    }
    }, [hash, pathname]);

    useEffect(() => {
        startLoading();
        fetch("/.netlify/functions/getPartnerPageContent")
            .then(res => res.json())
            .then(data => setPartnerPageContent(data))
            .catch(err => console.error("Failed to fetch partnerPageContent", err))
            .finally(() => stopLoading());
    }, []);

    useEffect(() => {
        startLoading();
        fetch("/.netlify/functions/getPartners")
            .then(res => res.json())
            .then(data => setPartners(data))
            .catch(err => console.error("Failed to fetch partners", err))
            .finally(() => stopLoading());
    }, []);

    const partnersByTier = partners.reduce((acc, partner) => {
        if (!acc[partner.tier]) acc[partner.tier] = [];
        acc[partner.tier].push(partner);
        return acc;
    }, {});

    return (
        <div className="page-container">
            {partnerPageContent && <ContentBlock title={partnerPageContent.blurb.title} content={partnerPageContent.blurb.content}/>}
            <section id="partners">
                {Object.entries(partnersByTier).map(([tier, imgList]) => (
                    <PartnerBlock
                        key={tier}
                        tier={tier.toUpperCase()} 
                        imgList={imgList}  
                    />
                ))}
            </section>
            <section id="donate">
                {partnerPageContent && <ContentBlock 
                    title={partnerPageContent.donateBlock.title} 
                    content={partnerPageContent.donateBlock.content} 
                    buttonText={partnerPageContent.donateBlock.buttonText} 
                    buttonLink={partnerPageContent.donateBlock.buttonLink}>
                </ContentBlock> }
            </section>
        </div>
    );
};