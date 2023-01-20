import React, {useState} from "react";

import styles from "./Image.module.css";
import cn from "classnames";

interface iImageProps {
    imageProps: { src: any, alt: string, title?: string, width: string, height: string },
    borderRadius: string
}

const Image: React.FC<iImageProps> = ({imageProps, borderRadius}: iImageProps) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className={styles.image__wrapper}
             style={{flexBasis: imageProps.width, height: imageProps.height, borderRadius}}>
            {!loaded && <div className={styles.loader} style={{borderRadius: borderRadius}}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>}
            <img style={{borderRadius}}
                 className={loaded ? styles.loaded : styles.not__loaded}
                 onLoad={() => setLoaded(true)}
                 {...imageProps}/>
        </div>
    );
};

export default Image;
