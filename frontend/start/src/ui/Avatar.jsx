import Image from 'next/image';
import React from 'react';

const Avatar = ({src,width = 24}) => {
    return (
        <Image
        src={src || "/images/avatar.png"}
        width={width}
        height={width}
        className='rounded-full ring-1 ring-secondary-300 ml-2'
        alt="img"
        />
    );
}

export default Avatar;
