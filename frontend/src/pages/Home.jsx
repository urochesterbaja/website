import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../LoadingContext"

import "./Home.css"
import ContentBlock from "../components/ContentBlock/ContentBlock.jsx"
import TeamBlock from "../components/TeamBlock/TeamBlock.jsx"

export default function Home() {
    const {startLoading, stopLoading} = useLoading();
    const { hash, pathname } = useLocation();
    const [teamMembers, setTeamMembers] = useState([]);
    const [aboutPageContent, setAboutPageContent] = useState(null);
    const [subsystems, setSubsystems] = useState([]);

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
        fetch("/.netlify/functions/getTeamMembers")
            .then(res => res.json())
            .then(data => setTeamMembers(data))
            .catch(err => console.error("Failed to fetch teamMembers", err))
            .finally(stopLoading);
    }, []);

    const teamMembersByGroup = teamMembers.reduce((acc, member) => {
        if (!acc[member.group]) acc[member.group] = [];
        acc[member.group].push(member);
        return acc;
    }, {});

    useEffect(() => {
        startLoading();
        fetch("/.netlify/functions/getAboutPageContent")
            .then(res => res.json())
            .then(data => setAboutPageContent(data))
            .catch(err => console.error("Failed to fetch aboutPageContent", err))
            .finally(stopLoading);
    }, []);

    useEffect(() => {
        startLoading();
        fetch("/.netlify/functions/getSubsystems")
            .then(res => res.json())
            .then(data => setSubsystems(data))
            .catch(err => console.error("Failed to fetch subSystems", err))
            .finally(stopLoading);
    }, []);

    return (
        <div className="page-container">
            {aboutPageContent && <ContentBlock title={aboutPageContent.block1.title} content={aboutPageContent.block1.content} content2={aboutPageContent.block1.content2} imgURL={aboutPageContent.block1.img} flip={aboutPageContent.block1.flip}/>}              
             {aboutPageContent && <ContentBlock title={aboutPageContent.block2.title} content={aboutPageContent.block2.content} content2={aboutPageContent.block2.content2} imgURL={aboutPageContent.block2.img} flip={aboutPageContent.block2.flip}/>}          

            <section id="our-team">
                <div className = "light-background">
                    <br></br>
                    <h1>Our Team</h1>
                    {/* Use object.entries so the groupname can be accessed too*/}
                    {Object.entries(teamMembersByGroup).map(([group, members], index) => (
                            <TeamBlock key={group} name={group} memberList={members} />
                    ))}
                <br></br>
                </div>
            </section>

            <section id="subsystems">
                <br></br>
                <h1>Subsystems</h1>
                {Object.values(subsystems).map((item, index)  => (
                    <ContentBlock key={index} title={item.title} content={item.content} content2={item.content2} imgURL={item.img} flip={item.flip}/>
                ))}
                <br></br>
            </section>
        </div>
    );
};