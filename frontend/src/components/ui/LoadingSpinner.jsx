import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div
        className={clsx(
          'animate-spin rounded-full border-4 border-gray-300 border-t-blue-600',
          sizes[size]
        )}
      />
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  size: 'md',
  className: '',
};

export default LoadingSpinner;