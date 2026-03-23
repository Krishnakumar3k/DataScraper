import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch, loading }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };
  /* Krishna  ------------------------------------------ */
  const quickSearches = [
    'digital marketing company Noida',
    'digital marketing agency Delhi',
    'digital marketing services Dubai',
    'seo company Noida',
    'digital marketing India',
  ];

  const handleQuickSearch = (searchText) => {
    setSearchInput(searchText);
    onSearch(searchText);
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group full-width">
          <label htmlFor="search">Search Companies</label>
          <input
            type="text"
            id="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="e.g., digital marketing company Noida"
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search Companies'}
        </button>
      </form>

      <div className="quick-searches">
        <p className="quick-searches-label">Quick searches:</p>
        <div className="quick-search-buttons">
          {quickSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => handleQuickSearch(search)}
              disabled={loading}
              className="quick-search-btn"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
