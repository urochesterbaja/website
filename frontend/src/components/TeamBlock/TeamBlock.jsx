import "./TeamBlock.css"
import TeamMemberPopup from "./TeamMemberPopup/TeamMemberPopup.jsx"
import { useState } from "react";


function TeamBlock({ name, memberList }) {
    const [selectedMember, setSelectedMember] = useState(null);

    return(
        <>
            <div className="team-block">
                    <h3>{name}</h3>
                    <div className="team-member-container">
                        {memberList.map((item, index) => (
                            <div key={index} className="team-member" onClick={() => setSelectedMember(item)}>
                                <img className="team-member-image" src={item.img ? item.img : "/team_member_pics/profile-pic-default.png"}></img>
                                <p>{item.name}</p>
                                <p>{item.position}</p>
                            </div>
                        ))}
                    </div>
            </div>

            {selectedMember && <TeamMemberPopup selectedMember={selectedMember} onClose={() => setSelectedMember(null)}/>}
        </>
    );
};

export default TeamBlock;