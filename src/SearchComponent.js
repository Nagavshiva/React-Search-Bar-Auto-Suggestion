import React, { useState, useEffect } from "react";

const SearchComponent = ({ suggestionsData }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = suggestionsData.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, suggestionsData]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setActiveSuggestionIndex(-1);
  };

  const handleClearInput = () => {
    setInputValue("");
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === 0 ? filteredSuggestions.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" && activeSuggestionIndex !== -1) {
      setInputValue(filteredSuggestions[activeSuggestionIndex]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-container">
      <div className="input-wrapper">
        <i className="search-icon">🔍</i>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="search-input"
        />
        {inputValue && (
          <i className="clear-icon" onClick={handleClearInput}>
            ✖
          </i>
        )}
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={index === activeSuggestionIndex ? "active" : ""}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
