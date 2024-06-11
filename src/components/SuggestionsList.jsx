import React from "react";

const SuggestionsList = ({
  suggestions = [],
  highlight,
  dataKey,
  selectedIndex,
  onSuggestionClick,
}) => {
  const getHighlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts?.map((part, index) => {
          return part.toLowerCase() === highlight?.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;
        const isSelected = index == selectedIndex;
        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className={
              isSelected ? "active suggestion-item" : "suggestion-item"
            }>
            {getHighlightText(currSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionsList;
