import "./Home.css"
import banner_image from "/banner_image_temp.png"

export default function Home() {
    return (
        <div className="page-container">
            <div className="background-image" style={{ backgroundImage: `url(${banner_image})` }}></div>

            <div className="content">
                <h1>Homepage</h1>
            </div>
        </div>
    );
};