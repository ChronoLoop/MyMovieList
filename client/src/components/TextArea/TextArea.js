import React from 'react';
import './TextArea.scss';
const TextArea = ({ name, label, error, Icon, rows, className, ...rest }) => {
    return (
        <div className={`text-area-container ${className}`}>
            {label && <label> {label} </label>}
            {Icon && <Icon className="text-area-icon" />}
            <textarea name={name} {...rest} rows={rows} />
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
};

export default TextArea;
