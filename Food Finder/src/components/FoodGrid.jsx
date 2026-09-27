import React from "react";
import { mapsUrl } from "../data.js";

function FoodCard({ f, onView }) {
  return (
    <article className="food">
      <div className="photo" onClick={() => onView(f.id)}>
        <img loading="lazy" src={(f.images && f.images[0]) || f.image || ""} alt={f.name} />
        <span className="tag">{f.demo ? "Demo · " + f.category : f.category}</span>
      </div>
      <div className="cardbody">
        <h3>{f.name}</h3>
        <div className="sub">
          📍 {f.place}, {f.city}
        </div>
        <div className="cardfoot">
          <span className="distance">
            {f.dist != null
              ? f.dist.toFixed(1) + " km away"
              : Number.isFinite(+f.lat)
              ? (+f.lat).toFixed(4) + ", " + (+f.lng).toFixed(4)
              : "Location unavailable"}
          </span>
          <a className="maplink" href={mapsUrl(f)} target="_blank" rel="noopener noreferrer">
            Directions ↗
          </a>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="empty" style={{ gridColumn: "1/-1" }}>
      <div style={{ fontSize: 40 }}>🔎</div>
      <h3>No matching food found</h3>
      <p>Try another dish, category, or city.</p>
      <button className="btn secondary" onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
}

export default function FoodGrid({ list, onView, onReset }) {
  return (
    <div className="grid">
      {list.length ? list.slice(0, 100).map((f) => <FoodCard key={f.id} f={f} onView={onView} />) : <EmptyState onReset={onReset} />}
    </div>
  );
}
