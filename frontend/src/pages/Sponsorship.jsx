import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Sponsorship.css";
import SponsorBlock from "../components/SponsorBlock/SponsorBlock";
import ContentBlock from "../components/ContentBlock/ContentBlock"
import { SponsorBlockLists } from "../components/SponsorBlock/SponsorBlockLists"


export default function Sponsorship() {
    const donateLink = "https://securelb.imodules.com/s/1676/giving4/giving4.aspx?sid=1676&gid=2&pgid=824&cid=1657&appealcode=18C3L&bledit=1&dids=419"
    const { hash, pathname } = useLocation();

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
            <ContentBlock title = "We value our sponsors!!" content="Blurb of we value our sponsors... I'm just gonna type a ton of stuff in here until i get more text. what if i wrote the lyrics to steely dan song. in the corner of my eye/i saw you at rudy's you were very high/you were high/ it was a crying disgrace/they saw your face/on the counter/by your keys/was a book of numbers/and your remedy/one of these/ surely will bring out the sorrow/ where are you tomorrow"/>
            <section id="sponsors">
                <SponsorBlock tier="PLATINUM" imgList={SponsorBlockLists["Platinum"]}/>
                <SponsorBlock tier="GOLD" imgList={SponsorBlockLists["Gold"]}/>
                <SponsorBlock tier="SILVER" imgList={SponsorBlockLists["Silver"]}/>
                <SponsorBlock tier="BRONZE" imgList={SponsorBlockLists["Bronze"]}/>
            </section>
            <section id="donate">
                <ContentBlock title= "DONATE" content="pls give us money" buttonText = "Make A Donation" buttonLink={donateLink}></ContentBlock>
            </section>
        </div>
    );
};