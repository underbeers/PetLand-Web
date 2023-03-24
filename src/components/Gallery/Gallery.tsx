import React from 'react';
import ImageGallery from 'react-image-gallery';


const Gallery: React.FC<{images: Array<{original: string, thumbnail: string}>}> = ({images}) => {
    return (
        <ImageGallery items={images}/>
    )
}

export default Gallery;
