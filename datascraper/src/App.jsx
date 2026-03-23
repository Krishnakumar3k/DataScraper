import { useState } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import CompanyList from './components/CompanyList';
import { supabase } from './lib/supabase';
import './App.css';
import logo from './images/adslogo.png';

function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchText) => {
    setLoading(true);
    setError(null);
/*  kkkkkkkkkk ----------- kkk */
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/search-companies`;

      const result = await axios.post(apiUrl, 
        { searchText },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (result.data.success) {
        setCompanies(result.data.data);

        for (const company of result.data.data) {
          try {
            await supabase.from('companies').insert([company]);
          } catch (insertError) {
            console.error('Error inserting company:', insertError);
          }
        }
      } else {
        setError('Failed to fetch companies');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-content">
          <img src={logo} alt="Company Data Scraper Logo" className="navbar-logo" />
          <h1> Data Scraper</h1>
        </div>
      </nav>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {error && <div className="error-message">{error}</div>}

      <CompanyList companies={companies} loading={loading} />
    </div>
  );
}

export default App;
