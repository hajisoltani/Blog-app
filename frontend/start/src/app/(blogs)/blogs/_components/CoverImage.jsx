import Image from 'next/image';
import React from 'react';

const CoverImage = ({title,coverImageUrl}) => {
    return (
        <div className="relative aspect-video overflow-hidden rounded-md">
            <Image
                src={coverImageUrl}
                alt={title}
                fill
                className='object-cover object-center hover:scale-110 transition-all duration-300 ease-out'

            />

        </div>

    );
}

export default CoverImage;
