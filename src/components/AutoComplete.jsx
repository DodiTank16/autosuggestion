import React, { useCallback, useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import debounce from "lodash/debounce";

const AutoComplete = ({
  placeholder,
  fetchList,
  dataKey,
  customeLoading,
  onSelect,
  onChange,
  onBlur,
  onFocus,
  customeStyles,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" && selectedSuggestionIndex > 0) {
      setSelectedSuggestionIndex((prevIndex) => prevIndex - 1);
    } else if (
      event.key === "ArrowDown" &&
      selectedSuggestionIndex < suggestions.length - 1
    ) {
      setSelectedSuggestionIndex((prevIndex) => prevIndex + 1);
    } else if (event.key === "Enter" && selectedSuggestionIndex >= 0) {
      setInputValue(suggestions[selectedSuggestionIndex]);
    }
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      result = await fetchList(query);
      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggection list.");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggection) => {
    setInputValue(dataKey && suggection[dataKey]);
    onSelect(suggection);
    setSuggestions([]);
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <>
      <div className="container">
        <h2>
          <u>Component</u>
        </h2>
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          style={customeStyles}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        {(suggestions.length > 0 || loading || error) && (
          <ul className="suggestions-list" role="listbox">
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">{customeLoading}</div>}
            <SuggestionsList
              dataKey={dataKey}
              highlight={inputValue}
              suggestions={suggestions}
              selectedIndex={selectedSuggestionIndex}
              onSuggestionClick={handleSuggestionClick}
            />
          </ul>
        )}
      </div>
    </>
  );
};

export default AutoComplete;
