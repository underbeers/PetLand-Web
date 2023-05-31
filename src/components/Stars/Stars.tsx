import React from 'react';

import Icons from '../UIKit/Icons';


const Stars: React.FC<{ rating: number }> = ({rating}) =>
    <div>
        <Icons icon={rating >= 0.5 ? 'round-star' : 'round-star-border'}/>
        <Icons icon={rating >= 1.5 ? 'round-star' : 'round-star-border'}/>
        <Icons icon={rating >= 2.5 ? 'round-star' : 'round-star-border'}/>
        <Icons icon={rating >= 3.5 ? 'round-star' : 'round-star-border'}/>
        <Icons icon={rating >= 4.5 ? 'round-star' : 'round-star-border'}/>
    </div>;

export default Stars;
