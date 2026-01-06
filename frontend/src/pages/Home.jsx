import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Home.css"
import ContentBlock from "../components/ContentBlock/ContentBlock.jsx"

export default function Home() {
    const { hash } = useLocation();

    useEffect(() => {
    if (!hash) return;

    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: "smooth" });
    }, [hash]);

    return (
        <div className="page-container">
            <ContentBlock title="Title" imgURL="/banner_image_temp.png" content="idk put stuff here lmao" content2="second paragraph if you want. this whole block will flex depending on how much text there is so if there's a lot of text the image will get smaller."/>
            <ContentBlock title="another content block" imgURL="/banner_image_temp.png" content="man i'm really getting sick of this image. what if i just typed a bunch of random shit in here aabababababababababababa hehehehhe" flip="true" />
        </div>
    );
};