import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, Filter, X } from 'lucide-react';
import Input from './Input';
import Select from './Select';
import Button from './Button';

const SearchFilter = ({ 
  onSearch, 
  onFilter, 
  onClear,
  searchPlaceholder = "Search...",
  filterOptions = [],
  showFilters = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilters({});
    onClear();
    setIsFilterOpen(false);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== null);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          {showFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`relative flex-1 sm:flex-none ${hasActiveFilters ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              <Filter className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Filters</span>
              <span className="sm:hidden">Filter</span>
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.values(filters).filter(v => v !== '' && v !== null).length}
                </span>
              )}
            </Button>
          )}

          {(searchTerm || hasActiveFilters) && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="flex-1 sm:flex-none"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && isFilterOpen && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900 mb-3">Filter Options</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterOptions.map((option) => (
              <div key={option.key}>
                <Select
                  label={option.label}
                  options={option.options}
                  value={filters[option.key] || ''}
                  onChange={(e) => handleFilterChange(option.key, e.target.value)}
                  placeholder={`Select ${option.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          {filterOptions.length === 0 && (
            <p className="text-gray-500 text-sm">No filter options available</p>
          )}
        </div>
      )}
    </div>
  );
};

SearchFilter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  showFilters: PropTypes.bool,
};

SearchFilter.defaultProps = {
  searchPlaceholder: "Search...",
  filterOptions: [],
  showFilters: true,
};

export default SearchFilter;