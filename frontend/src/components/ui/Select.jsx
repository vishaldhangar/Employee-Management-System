import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

const Select = ({ 
  label, 
  error, 
  options = [], 
  placeholder = 'Select an option',
  className = '',
  required = false,
  ...props 
}) => {
  const selectClasses = clsx(
    'w-full pl-3 pr-10 py-2 border rounded-lg shadow-sm transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    'appearance-none bg-white',
    error 
      ? 'border-red-300 bg-red-50 text-red-900 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 bg-white text-gray-900',
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select className={selectClasses} {...props}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};

Select.defaultProps = {
  options: [],
  placeholder: 'Select an option',
  className: '',
  required: false,
};

export default Select;