import React from "react";
import { areas } from "../data.js";

export default function CityToolbar({ city, setCity }) {
  return (
    <div className="toolbar">
      <div>
        <strong>Explore Cambodia</strong>
        <div className="sub">Community-submitted spots appear after owner approval. Demo listings are clearly labeled.</div>
      </div>
      <select
        aria-label="Filter by city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: 12, border: "1px solid var(--field-border)", borderRadius: 12, maxWidth: "100%", background: "var(--field-bg)", color: "var(--text)" }}
      >
        <option>All Cambodia</option>
        {areas.map((a) => (
          <option key={a[0]}>{a[0]}</option>
        ))}
      </select>
    </div>
  );
}
