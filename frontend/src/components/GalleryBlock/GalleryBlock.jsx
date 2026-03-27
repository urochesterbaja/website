import "./GalleryBlock.css"
import { useState, useRef, useEffect } from "react"

//the way this one works is a little confusing
//basically, there's a viewport that's exactly the width of 1 image
//and behind the viewport, there's a number of images arranged horizontally that stretch outside of the viewport
//so, when the gallery "slides", it's really just transposing the images behind the viewport one "image unit" to the left or right
function GalleryBlock({ gallery }) {
    const images = gallery.images

    const [currentIndex, setCurrentIndex] = useState(0)
    const trackRef = useRef(null)
    const intervalRef = useRef(null) // store interval reference

    const startInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current) // clear existing
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev >= images.length - 1 ? 0 : prev + 1))
        }, 3000)
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= images.length - 1 ? 0 : prev + 1))
        startInterval() // reset timer on click
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? images.length - 1 : prev - 1))
        startInterval() // reset timer on click
    }

    useEffect(() => {
        startInterval()
        return () => clearInterval(intervalRef.current) // cleanup on unmount
    }, [images.length])

    return(
        <div className="gallery-block">
            <h1 className="gallery-h1">{gallery.title}</h1>
            <div className="gallery-row">
                <button className="button-left" onClick={() => handlePrev()} alt="Scroll Left.">&#10094;</button>
                <div className="viewport">
                    <div className="track" ref={trackRef} style={{transform : `translateX(-${currentIndex * 100}%)`}}>
                        {images.map((src, index) => {
                        return <img key={index} src={src.URL} alt={src.altText}></img>
                    })}
                    </div>
                </div>
                <button className="button-right" onClick={() => handleNext()} alt="Scroll right.">&#10095;</button>
            </div>
            <div className="button-container">
                <a className="big-button" href={gallery.link} target="_blank" rel="noopener noreferrer"><i>See the whole gallery!</i>
                </a>
            </div>
        </div>
    )
}

export default GalleryBlock;