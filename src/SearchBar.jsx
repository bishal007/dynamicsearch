import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState(0);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchAPI = async () => {
      if (query.length > 2) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/comments?postId=12&email=${query}`
          );
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    const debounceTimer = setTimeout(searchAPI, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {isLoading && <p>Loading...</p>}
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
