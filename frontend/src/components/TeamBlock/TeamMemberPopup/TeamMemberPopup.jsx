import "./TeamMemberPopup.css"

import { useEffect, useState } from "react"

import { FaLinkedin, FaTimes } from "react-icons/fa";


function TeamMemberPopup({selectedMember, onClose}){
    const [visible, setVisible] = useState(false)

    useEffect(() => {
    setVisible(true);

    document.body.classList.add("no-scroll");

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
    const year = selectedMember.year ? <h4>This is {selectedMember.name}'s {selectedMember.year} year on Baja</h4> : null;
    const linkedin = selectedMember.linkedin ? <a className="linkedin" href={selectedMember.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a> : null
    return(
        <div className={`popup-overlay ${visible ? "show" : ""}`} onClick={onClose}>
            <div className={`popup-content ${visible ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
                <button className="popup-close" onClick={onClose}>
                    <FaTimes />
                </button>
                <img src={selectedMember.img || "/team_member_pics/profile-pic-default.png"} alt={selectedMember.name} className="popup-image"/>
                <h2>{selectedMember.name}</h2>
                <h4>{selectedMember.position}</h4>
                {role}
                {year}          
                {linkedin}              
            </div>
        </div>
    );
};

export default TeamMemberPopup;