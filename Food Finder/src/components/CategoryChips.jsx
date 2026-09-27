import React from "react";
import { categories } from "../data.js";

export default function CategoryChips({ cat, setCat }) {
  return (
    <div className="chips">
      {categories.map((c) => (
        <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
