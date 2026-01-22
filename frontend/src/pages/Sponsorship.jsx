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
            <ContentBlock title = "We value our sponsors!" content="Our team could not operate without the generous support of our local and global sponsors. We greatly appreciate all the help we have received.
"/>
            <section id="sponsors">
                <SponsorBlock tier="HIVE" imgList={SponsorBlockLists["Hive"]}/>
                <SponsorBlock tier="QUEEN" imgList={SponsorBlockLists["Queen"]}/>
                <SponsorBlock tier="WORKER" imgList={SponsorBlockLists["Worker"]}/>
                <SponsorBlock tier="DRONE" imgList={SponsorBlockLists["Drone"]}/>
            </section>
            <section id="donate">
                <ContentBlock title= "DONATE" content="Not a company but interested in supporting our team?" buttonText = "Make A Donation" buttonLink={donateLink}></ContentBlock>
            </section>
        </div>
    );
};