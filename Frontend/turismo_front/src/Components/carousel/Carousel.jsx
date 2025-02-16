import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./Carousel.module.css";

const ControlledCarousel = ({ images }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {images.map((image, idx) => (
                <Carousel.Item key={idx}>
                    <img
                        className={`d-block w-100 ${styles.carouselImage}`} 
                        src={image.src}
                        alt={image.alt || `Slide ${idx + 1}`}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ControlledCarousel;
