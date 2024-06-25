import './CustomButton.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type CustomButtonProps = {
  children: string;
  icon?: IconDefinition;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const CustomButton = ({ children, icon, ...props }: CustomButtonProps) => {
  return (
    <button className="customButtonContainer" {...props}>
      {children}
      {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
};

export default CustomButton;
