import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Card = ({ 
  children, 
  className = '',
  padding = 'md',
  shadow = 'md',
  ...props 
}) => {
  const baseClasses = 'bg-white border border-gray-200 rounded-lg';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  return (
    <div
      className={clsx(
        baseClasses,
        paddingClasses[padding],
        shadowClasses[shadow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
};

Card.defaultProps = {
  className: '',
  padding: 'md',
  shadow: 'md',
};

export default Card;