import React from 'react';
import { Alert } from 'react-bootstrap';
import './Input.scss';

const Input = ({ name, label, error, Icon, className, ...rest }) => {
    return (
        <div className={`input-container ${className}`}>
            {label && <label> {label} </label>}
            {Icon && <Icon className="input-icon" />}
            <input name={name} {...rest} />
            {error && <Alert variant="danger">{error}</Alert>}
        </div>
    );
};

export default Input;
