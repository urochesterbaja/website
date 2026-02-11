import "./Footer.css";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

import { useState, useEffect } from "react"

function Footer( { footerInfo }) {
    const [email, setEmail] = useState("");   //user email
    const [status, setStatus] = useState(""); //success/error message

    //this function handles when an email address is submitted through the form
    //frankly, it was written by ChatGPT, so take that as you will
    //however, the comments are mine (WH) and so hopefully they are helpful
    const handleSubmit = async (e) => {
        e.preventDefault();     //prevents page from reloading when email is submitted

        setStatus("Subscribing...");    //sets status message so it shows that something is happening when the button is pressed

        //this try/catch fetches the google sheets api functions
        try {
        const response = await fetch("/.netlify/functions/add-to-sheet", {
            method: "POST",     //"posts" to the function instead of "getting" it as an element
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ value: email }),
        });

        if (!response.ok) throw new Error("Request failed");

        setStatus("Success! Thanks for subscribing!");
        setEmail(""); // clear input
        } catch (error) {
        console.error(error);
        setStatus("Something went wrong. Please try again.");
        }
    };

    return(
        <footer className="footer">
            <div className="footer-content">
                <div className= "raised-box">
                    <h2>University of Rochester Baja Racing</h2>
                    <p>General Inquiries: {footerInfo["email"]}</p>
                    <div className="icon-row">
                        <a id ="instagram" href={footerInfo["instagram"]} target="_blank" rel="noreferrer"><FaInstagram /></a>
                        <a id="youtube" href={footerInfo["youtube"]} target="_blank" rel="noreferrer"><FaYoutube /></a>
                    </div>
                </div>
                <div className= "main-text">
                    <p>Want to hear more from us? Enter your email to subscribe to our newsletter!</p>
                    <form className="subscribe-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            aria-label="Email address"
                            value={email}
                            //this little function sets the email variable for the api call above
                            onChange={(e) => { setEmail(e.target.value);
                            }}
                            required
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                    {/*this is the status message that displays below the form when you try to submit an email*/}
                    {status && <p className="form-status">{status}</p>} 
                </div>
            </div>
        </footer>
    );
};

export default Footer;
