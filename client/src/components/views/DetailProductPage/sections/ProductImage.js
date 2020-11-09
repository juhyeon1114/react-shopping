import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

const ProductImage = ({ product }) => {
    const [images, setImages] = useState([])

    useEffect(() => {
        if (product.images && product.images.length > 0) {
            let tempImages = [];
            product.images.forEach(item => {
                tempImages.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`,
                })
            });
            setImages(tempImages);
        }
    }, [product.images]);

    return (
        <div>
            <ImageGallery items={images} />
        </div>
    )
};

export default ProductImage;