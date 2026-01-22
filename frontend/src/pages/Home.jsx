import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Home.css"
import ContentBlock from "../components/ContentBlock/ContentBlock.jsx"
import TeamBlock from "../components/TeamBlock/TeamBlock.jsx"
import { TeamMembers } from "../components/TeamBlock/TeamMembers"

export default function Home() {
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
            <ContentBlock 
                title="Who We Are" 
                content="Yellowjacket Racing UR Baja SAE is a student-run, non-profit organization which designs, fabricates, tests, and competes with a single-seater off-road vehicle. From engineering and applied science to business and marketing, our team welcomes anyone who is interested in hands-on STEM experience!" 
                content2="Whether you have built a car from scratch or have never touched a wrench in your life, we will utilize any of your experience and will teach you designing, manufacturing, and testing methods."
            />
            <ContentBlock title="What We Do" 
                content="blurb two" 
                />

            <section id="our-team">
                <div className = "light-background">
                    <h1>Our Team</h1>
                    <TeamBlock name="Executive Board" memberList={TeamMembers["Executive Board"]}></TeamBlock>
                    <TeamBlock name="Subsystem Leads" memberList={TeamMembers["Subsystem Leads"]}></TeamBlock>
                    <TeamBlock name="Project Team Leads" memberList={TeamMembers["Project Team Leads"]}></TeamBlock>
                </div>
            </section>

            <section id="subsystems">
                <h1>Subsystems</h1>
                <ContentBlock title = "name" content="blurb" imgURL="/banner_image_temp.png"/>
                <ContentBlock title = "name" content="blurb" imgURL="/banner_image_temp.png" flip="true"/>
            </section>
        </div>
    );
};