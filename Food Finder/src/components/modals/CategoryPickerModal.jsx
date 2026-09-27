import React from "react";
import { categories } from "../../data.js";

export default function CategoryPickerModal({ cat, onPick }) {
  return (
    <>
      <div className="modalhead">
        <h2>Browse categories</h2>
      </div>
      <div className="chips" style={{ flexWrap: "wrap" }}>
        {categories.map((c) => (
          <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => onPick(c)}>
            {c}
          </button>
        ))}
      </div>
      <p className="sub">Choose a category to filter food spots.</p>
    </>
  );
}
