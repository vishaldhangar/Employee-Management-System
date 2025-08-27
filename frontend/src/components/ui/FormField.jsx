import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const FormField = ({ 
  label, 
  error, 
  required = false, 
  children, 
  className = '',
  description,
  showError = true, // New prop to control error display
  ...props 
}) => {
  return (
    <div className={clsx('space-y-1', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      
      <div className="relative">
        {children}
      </div>
      
      {/* Only show error in FormField if showError is true and child components don't handle errors */}
      {showError && error && (
        <div className="flex items-center mt-1">
          <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  description: PropTypes.string,
  showError: PropTypes.bool,
};

FormField.defaultProps = {
  required: false,
  className: '',
  showError: true,
};

export default FormField;