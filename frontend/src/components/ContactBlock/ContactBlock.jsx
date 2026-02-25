import "./ContactBlock.css"

function ContactBlock ( { contactCards } ) {
    return (
        <div className="contact-block">
            <h2>Contact</h2>
            <p>We appreciate any and all contact. Reach out to us at the addresses below!</p>
            <div className="contact-container">
                {contactCards?.map((item, index) => (
                    <div key={index} className="contact-component">
                        <h3>{item.title}</h3>
                        <h3>{item.name}</h3>
                        <p>{item.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactBlock;