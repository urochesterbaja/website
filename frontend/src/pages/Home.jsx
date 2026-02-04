import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Home.css"
import ContentBlock from "../components/ContentBlock/ContentBlock.jsx"
import TeamBlock from "../components/TeamBlock/TeamBlock.jsx"
import { TeamMembers } from "../components/TeamBlock/TeamMembers"
import { Subsystems } from "../components/Subsystems.js"
import { AboutInfo } from "../components/AboutInfo.js"

export default function Home() {
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
            {Object.values(AboutInfo).map((item, index)  => (
                <ContentBlock key={index} title={item.title} content={item.content} content2={item.content2} imgURL={item.img} flip={item.flip}/>              
            ))}

            <section id="our-team">
                <div className = "light-background">
                    <br></br>
                    <h1>Our Team</h1>
                    {/* Use object.entries so the groupname can be accessed too*/}
                    {Object.entries(TeamMembers).map(([groupName, members], index) => (
                            <TeamBlock key={groupName} name={groupName} memberList={members} />
                    ))}
                <br></br>
                </div>
            </section>

            <section id="subsystems">
                <br></br>
                <h1>Subsystems</h1>
                {Object.values(Subsystems).map((item, index)  => (
                    <ContentBlock key={index} title={item.title} content={item.content} content2={item.content2} imgURL={item.img} flip={item.flip}/>
                ))}
                <br></br>
            </section>
        </div>
    );
};