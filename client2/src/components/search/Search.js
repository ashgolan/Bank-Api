import React from "react";
import "./Search.css";
function Search() {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="enter your search here"
      />
    </div>
  );
}

export default Search;
