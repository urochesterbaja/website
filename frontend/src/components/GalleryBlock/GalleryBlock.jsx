import "./GalleryBlock.css"
import { useState, useRef, useEffect } from "react"

function GalleryBlock({ gallery }) {
    const images = gallery.images

    const [currentIndex, setCurrentIndex] = useState(0)
    const trackRef = useRef(null)

    const handleNext = () => {
        setCurrentIndex((prev) => {
            if (prev >= images.length - 1) return 0
            return prev + 1
        })
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            if(prev <= 0) return images.length - 1
            return prev - 1
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev >= images.length - 1) return 0
                return prev + 1
            })
        }, 3000)
        return () => clearInterval(interval) // cleanup on unmount
        }, [images.length])

    return(
        <div className="gallery-block">
            <h1>{gallery.title}</h1>
            <div className="gallery-row">
                <button className="button-left" onClick={() => handlePrev()}>&#10094;</button>
                <div className="viewport">
                    <div className="track" ref={trackRef} style={{transform : `translateX(-${currentIndex * 100}%)`}}>
                        {images.map((src, index) => {
                        return <img key={index} src={src.URL}></img>
                    })}
                    </div>
                </div>
                <button className="button-right" onClick={() => handleNext()}>&#10095;</button>
            </div>
            <div className="button-container">
                <a className="big-button" href={gallery.link} target="_blank" rel="noopener noreferrer"><i>See the whole gallery!</i>
                </a>
            </div>
        </div>
    )
}

export default GalleryBlock;