import React, { useState } from 'react';
import './search.css';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        if (city.trim() !== '') {
            onSearch(city);
        }
    };

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <div className="search-icon" onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    );
};

export default Search;