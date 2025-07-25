import React from 'react';

type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
    <button onClick={onClick}>
        {children}
    </button>
);

export default Button;