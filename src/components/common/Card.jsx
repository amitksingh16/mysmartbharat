import React from 'react';

const Card = ({ children, className = '', style = {} }) => {
    return (
        <div
            className={`card ${className}`}
            style={{
                background: 'var(--white)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border)',
                ...style
            }}
        >
            {children}
        </div>
    );
};

export default Card;
