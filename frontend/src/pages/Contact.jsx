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

    
    return (
        <div className="page-container">
            {contactInfo && (<ContactBlock contactCards={contactInfo["contactCards"]} /> )}
        </div>
    )
}