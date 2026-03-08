import { useEffect, useState } from "react";
import { useLoading } from "../LoadingContext"

import ContactBlock from "../components/ContactBlock/ContactBlock.jsx"


export default function Contact() {
    const {startLoading, stopLoading} = useLoading();
    const [contactInfo, setContactInfo] = useState(null);

    
    useEffect(() => {
        startLoading();
        fetch("/.netlify/functions/getContactInfo")
            .then(res => res.json())
            .then(data => setContactInfo(data))
            .catch(err => console.error("Failed to fetch contactInfo", err))
            .finally(stopLoading);
    }, []);

    
    //wait for contactInfo to render before returning, since it's an object not an array
    return (
        <div className="page-container">
            {contactInfo && (<ContactBlock contactCards={contactInfo["contactCards"]} /> )}
        </div>
    )
}