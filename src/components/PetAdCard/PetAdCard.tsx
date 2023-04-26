import React, {useState} from 'react';
import cn from 'classnames';

import styles from '../PetAdCard/PetAdCard.module.css';

export interface iPetAdCardProps {
    id: string,
    petName: string,
    photo: string,
    isSelected: boolean;
    setSelected: (isChecked: boolean) => void;
}

const PetAdCard: React.FC<iPetAdCardProps> = ({id,petName, photo, isSelected, setSelected}) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700);
    });

    return (
        <div className={cn(styles.card, isSelected && styles.selected)} onClick={()=>{setSelected(!isSelected)}}>
            <img src={photo} alt={'Фото питомца'} className={styles.img}/>
            <div className={styles.pet__info}>
                {!isMobile ?
                    <h4>{petName}</h4>
                    :
                    <h3>{petName}</h3>
                }
            </div>
        </div>
    )
};

export default PetAdCard;
