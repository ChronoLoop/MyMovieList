import React from 'react';
import './Input.scss';

const Input = ({ name, label, error, Icon, className, ...rest }) => {
    return (
        <div className={`input-container ${className}`}>
            {label && <label> {label} </label>}
            {Icon && <Icon className="input-icon" />}
            <input name={name} {...rest} />
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
};

export default Input;
