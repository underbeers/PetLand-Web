import React from 'react';
import ImageGallery, {ReactImageGalleryItem} from 'react-image-gallery';

import styles from './Gallery.module.css';


const Gallery: React.FC<{ items: Array<ReactImageGalleryItem> }> = ({items}) => {
    return (
        <ImageGallery additionalClass={styles.gallery} showPlayButton={false} items={items}/>
    );
};

export default Gallery;
