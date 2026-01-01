import "./Sponsorship.css";
import SponsorBlock from "../components/SponsorBlock/SponsorBlock";
import { SponsorBlockLists } from "../components/SponsorBlock/SponsorBlockLists"


export default function Sponsorship() {
    return (
        <div className="page-container">
                <SponsorBlock tier="Platinum" imgList={SponsorBlockLists["Platinum"]}/>
        </div>
    );
};