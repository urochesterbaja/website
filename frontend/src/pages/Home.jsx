import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useLoading } from "../LoadingContext"

import "./Home.css" //gets its own css because it has a light background section

import ContentBlock from "../components/ContentBlock/ContentBlock.jsx"
import TeamBlock from "../components/TeamBlock/TeamBlock.jsx"

export default function Home() {
    const {startLoading, stopLoading} = useLoading();
    const { hash, pathname } = useLocation();
    const [teamMembers, setTeamMembers] = useState([]);
    const [aboutPageContent, setAboutPageContent] = useState([]);
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
            .finally(() => stopLoading());
    }, []);

    useEffect(() => {
        startLoading();
        fetch("/.netlify/functions/getAboutPageContent")
            .then(res => res.json())
            .then(data => setAboutPageContent(data))
            .catch(err => console.error("Failed to fetch aboutPageContent", err))
            .finally(() => stopLoading());
    }, []);

    useEffect(() => {
        startLoading();
        fetch("/.netlify/functions/getSubsystems")
            .then(res => res.json())
            .then(data => setSubsystems(data))
            .catch(err => console.error("Failed to fetch subSystems", err))
            .finally(() => stopLoading());
    }, []);

    //in returns, always map values from db pull to aid scalability
    return (
        <div className="page-container">

            {Object.values(aboutPageContent).map((item, index)  => (
                    <ContentBlock key={index} title={item.title} content={item.content} content2={item.content2} imgURL={item.img} flip={item.flip} buttonText={item.buttonText} buttonLink={item.buttonLink}/>
                ))}

            <section id="our-team">
                <div className = "light-background">
                    <br></br>
                    <h1>Our Team</h1>
                    {Object.values(teamMembers).map((item, index) => (
                            <TeamBlock key={index} name={item.group} memberList={item.Members} />
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