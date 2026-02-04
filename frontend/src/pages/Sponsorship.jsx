import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Sponsorship.css";
import SponsorBlock from "../components/SponsorBlock/SponsorBlock";
import ContentBlock from "../components/ContentBlock/ContentBlock"
import { SponsorBlockLists } from "../components/SponsorBlock/SponsorBlockLists"


export default function Sponsorship() {
    const { hash, pathname } = useLocation();

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

    return (
        <div className="page-container">
            <ContentBlock title={SponsorBlockLists["Blurb"].title} content={SponsorBlockLists["Blurb"].content}/>
            <section id="sponsors">
                <SponsorBlock tier="HIVE" imgList={SponsorBlockLists["Hive"]}/>
                <SponsorBlock tier="QUEEN" imgList={SponsorBlockLists["Queen"]}/>
                <SponsorBlock tier="WORKER" imgList={SponsorBlockLists["Worker"]}/>
                <SponsorBlock tier="DRONE" imgList={SponsorBlockLists["Drone"]}/>
            </section>
            <section id="donate">
                <ContentBlock 
                    title={SponsorBlockLists["DonateBlock"].title} 
                    content={SponsorBlockLists["DonateBlock"].content} 
                    buttonText={SponsorBlockLists["DonateBlock"].buttonText} 
                    buttonLink={SponsorBlockLists["DonateBlock"].buttonLink}>
                </ContentBlock>
            </section>
        </div>
    );
};