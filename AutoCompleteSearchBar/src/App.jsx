import "./App.css";
import React, { useEffect, useState, useCallback } from "react";

const App = () => {
  // --- STATES (HAMARE JAADUI DIBBE) ---
  const [input, setInput] = useState(""); // User kya type kar raha hai
  const [results, setResults] = useState([]); // Search ke baad kya dikhana hai
  const [showSuggestions, setShowSuggestions] = useState(false); // Suggestions ka box dikhana hai ya nahi
  const [cache, setCache] = useState({}); // Purane search results save karne ke liye

  // --- LOGIC (HAMARA DIMAAG) ---

  // Debouncing aur Caching ka logic `useEffect` mein
  useEffect(() => {
    // 1. Agar input khaali hai, to kuch mat karo, suggestions chhupa do
    if (input.trim() === "") {
      setResults([]);
      return;
    }

    // 2. Caching: Pehle apne cache mein dhoondo
    if (cache[input]) {
      // Agar 'pasta' ka result pehle se hai, to seedha state mein daal do
      setResults(cache[input]);
    } else {
      // 3. Debouncing: Agar cache mein nahi hai, to ruk kar API call karo
      const timer = setTimeout(() => {
        // API se data laane wala function
        const fetchData = async () => {
          try {
            console.log("Making API call for:", input); // Dekhne ke liye ki API call kab ho rahi hai
            const data = await fetch(
              "https://dummyjson.com/recipes/search?q=" + input.trim()
            );
            const json = await data.json();
            const recipes = json?.recipes || [];
            
            // API se aaye result ko 'results' state mein daalo
            setResults(recipes);
            // Aur future ke liye 'cache' mein bhi save kar lo
            setCache((prevCache) => ({ ...prevCache, [input]: recipes }));

          } catch (error) {
            console.error("API call failed:", error);
          }
        };

        fetchData();
      }, 300); // 300 millisecond rukne ke baad call karo

      // 4. Cleanup Function: Ye sabse important hai!
      return () => {
        clearTimeout(timer);
      };
    }
  }, [input, cache]); // Ye effect 'input' ya 'cache' ke badalne par chalega

  // --- UI (SCREEN PAR KYA DIKHEGA) ---
  return (
    <div>
      <h1>Auto Complete Search Bar</h1>
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="Enter Here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // Jab input par click karein (focus), to suggestions dikhao
          onFocus={() => setShowSuggestions(true)}
          // Jab input se bahar click karein (blur), to suggestions chhupa do
          // Thoda delay diya taaki suggestion par click karne ka time mile
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        
        {/* Suggestions ka box tabhi dikhega jab showSuggestions = true aur results hon */}
        {showSuggestions && results.length > 0 && (
          <div className="suggestions-box">
            {results.map((r) => (
              <div 
                key={r.id} 
                className="suggestion-item"
                // Jab suggestion par click ho, to input box mein uska naam daal do
                onMouseDown={() => setInput(r.name)}
              >
                {r.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;