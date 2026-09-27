import React from "react";

export default function Header({ query, setQuery, onAdd }) {
  return (
    <header className="top">
      <div className="topinner">
        <div className="logo-wrap">
          <div className="logo">
            🍜 Foodie<span>Find</span>
          </div>
        </div>
        <div className="search">
          🔎{" "}
          <input
            aria-label="Search food or place"
            placeholder="Search food, dish, market, city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={query ? "" : "hidden"} aria-label="Clear search" onClick={() => setQuery("")}>
            ✕
          </button>
        </div>
        <button className="btn" onClick={onAdd}>
          ＋ Add food
        </button>
      </div>
    </header>
  );
}
