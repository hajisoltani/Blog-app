import React from 'react';

const TextField = ({
    type='text',
    lable,
    name,
    value,
    dir='rtl',
    onChange,
    isRequired,
    className
}) => {

    

    return (
        <div className='textField'>
            <lable htmlFor={name} className="text-secondary-600 text-sm">
                {lable}
                {isRequired && <span className='text-errpr'>*</span>}
            </lable>
            <input
                type={type}
                name={name}
                id={name}
                dir={dir}
                className={`textField-input ${dir === 'ltr' ? 'text-left' : "text-right"} ${className}`}
                value={value}
                onChange={onChange}

            />

        </div>
    );
}

export default TextField;
