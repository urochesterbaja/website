import "./Sponsorship.css";
import SponsorBlock from "../components/SponsorBlock";
import { SponsorBlockLists } from "../components/SponsorBlockLists"


export default function Sponsorship() {
    return (
        <div className="page-container">
            <div className="content">
                <SponsorBlock tier="Platinum" imgList={SponsorBlockLists["Platinum"]}/>
            </div>
        </div>
    );
};