import "./TeamMemberPopup.css"

import { useEffect, useState } from "react"

import { FaLinkedin, FaTimes,  } from "react-icons/fa";
import { CiMail } from "react-icons/ci";


function TeamMemberPopup({selectedMember, onClose}){
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true); 

        document.body.classList.add("no-scroll"); //prevent scrolling on rest of site

        const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
        document.body.classList.remove("no-scroll");
        window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    const role = selectedMember.role ? <h4>Role: {selectedMember.role}</h4> : null;
    const major = selectedMember.major ? <h4>Major: {selectedMember.major}</h4> : null;
    const year = selectedMember.year ? <h4>This is {selectedMember.name}'s {selectedMember.year} year on Baja</h4> : null;
    let linkedinUrl = selectedMember.linkedin;

    // ensure starts with https:// to prevent routing within domain
    // if link doesn't contain https://, this would route to urbajasae.com/{linkedinUrl}
    if (linkedinUrl && !linkedinUrl.startsWith("https://")) {
    linkedinUrl = "https://" + linkedinUrl;
    }

    //dump url into icon
    const linkedin = linkedinUrl
        ? (
            <a className="linkedin" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label={`Linkedin page for ${selectedMember.name}`}>
                <FaLinkedin />
            </a>
        )
        : null;  

    const email = selectedMember.email ? <a className="email" href={`mailto:${selectedMember.email}`} target="_blank" aria-label={`Send mail to ${selectedMember.name}`}><CiMail/></a> : null;

    //overlay onClick closes function if you click outside of the box
    //content onClick prevents click passthrough so you don't accidentally click "behind" the box
    return(
        <div className={`popup-overlay ${visible ? "show" : ""}`} onClick={onClose}>
            <div className={`popup-content ${visible ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
                <button className="popup-close" onClick={onClose} aria-label="Close team member popup.">
                    <FaTimes />
                </button>
                <img src={selectedMember.img || "/team_member_pics/profile-pic-default.png"} className="popup-image"/>
                <h2 className="h2-no-margin">{selectedMember.name}</h2>
                <h4>{selectedMember.position}</h4>
                {role}
                {major}
                {year}
                <div className = "popup-icon-row">
                    {linkedin}
                    {email}
                </div>
            </div>
        </div>
    );
};

export default TeamMemberPopup;