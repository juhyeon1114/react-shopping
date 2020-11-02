import React from 'react';
import { Carousel } from 'antd';

const ImageSlider = ({ images }) => {
    const onChange = (a, b, c) => {
        // console.log(a, b, c);
    }

    return (
        <dvi>
            <Carousel autoplay afterChange={onChange}>
                {images.map((image, idx) => (
                    <div key={`image${idx}`}>
                        <img style={{ width: '100%', maxHeight: '150px' }} src={`http://localhost:5000/${image}`} />
                    </div>
                ))}
            </Carousel>
        </dvi>
    )
};

export default ImageSlider