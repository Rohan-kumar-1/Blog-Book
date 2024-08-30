import React from 'react';
import logoimage from '../../src/assets/logoimage.png'; // Ensure the image is imported correctly

function Logo({ width = '70px' }) {
    return (
        <div className='flex items-center justify-center h-full'>
            <img 
                src={logoimage} 
                alt="LOGO" 
                className='w-auto' 
                style={{ width }}
            />
        </div>
    );
}

export default Logo;
