import "./TeamMemberPopup.css"

import { useEffect, useState } from "react"

function TeamMemberPopup({selectedMember, onClose}){
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true);
    });

    const role = selectedMember.role ? <h4>Role: {selectedMember.role}</h4> : null;
    const year = selectedMember.year ? <h4>This is {selectedMember.name}'s {selectedMember.year} year on Baja</h4> : null;
    return(
        <div className={`popup-overlay ${visible ? "show" : ""}`} onClick={onClose}>
            <div className={`popup-content ${visible ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
                <img src={selectedMember.img || "/team_member_pics/profile-pic-default.png"} alt={selectedMember.name} className="popup-image"/>
                <h2>{selectedMember.name}</h2>
                <h4>{selectedMember.position}</h4>
                {role}
                {year}
            </div>
        </div>
    );
};

export default TeamMemberPopup;