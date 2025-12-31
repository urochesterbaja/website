import "./Footer.css";
import {useEffect, useRef, useState } from "react"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


function Footer() {
    return(
        <footer className="footer">
            <div className="footer-content">
                <div className= "raised-box">
                    <h2>University of Rochester Baja Racing</h2>
                    <p>General Inquiries: example@gmail.com</p>
                    <p>Sponsorship: example@gmail.com</p>
                    <div className="icon-row">
                        <a id="facebook" href="https://www.facebook.com/rochesterbaja/" target="_blank" rel="noreferrer"><FaFacebook /></a>
                        <a id ="instagram" href="https://www.instagram.com/ur_bajasae/" target="_blank" rel="noreferrer"><FaInstagram /></a>
                        <a id="youtube" href="https://www.youtube.com/channel/UCdGcGZGMqcPICAijvLqaBOQ" target="_blank" rel="noreferrer"><FaYoutube /></a>
                        <a id="linkedin" href="https://www.linkedin.com/groups/4268521/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                    </div>
                </div>
                <div className= "main-text">
                    <p>Want to hear more from us? Enter your email to subscribe to our newsletter!</p>
                    <form class="subscribe-form">
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            aria-label="Email address"
                            required
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
