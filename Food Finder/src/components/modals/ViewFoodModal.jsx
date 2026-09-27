import React, { useState } from "react";
import { load, mapsUrl } from "../../data.js";
import CloseBtn from "./CloseBtn.jsx";
import { ReviewsSummary, ReviewList, ReviewForm } from "./Reviews.jsx";

function shareFood(food) {
  const url = mapsUrl(food);
  if (navigator.share) {
    navigator.share({ title: food.name, text: `${food.name} — ${food.place}, ${food.city}`, url }).catch(() => {});
  } else {
    const ta = document.createElement("textarea");
    ta.value = `${food.name} — ${food.place}, ${food.city}\n${url}`;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    alert("Food spot details copied.");
  }
}

export default function ViewFoodModal({ food, onClose }) {
  const [reviews, setReviews] = useState(() => load("ff-reviews", {}));

  if (!food) return null;

  const list = reviews[food.id] || [];
  const avg = list.length ? (list.reduce((s, r) => s + Number(r.rating), 0) / list.length).toFixed(1) : "No ratings yet";
  const images = [(food.images && food.images.length ? food.images : [food.image])].flat().filter(Boolean);

  return (
    <>
      <div className="modalhead">
        <h2>{food.name}</h2>
        <CloseBtn onClose={onClose} />
      </div>
      <div className="previewrow" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", overflow: "visible" }}>
        {images.map((im, i) => (
          <img key={i} src={im} style={{ width: "100%", height: 190 }} alt={`${food.name} photo`} />
        ))}
      </div>
      <p>
        <b>
          {food.place}, {food.city}
        </b>
      </p>
      <p className="sub">{food.description}</p>
      <p className="sub">
        Category: <b>{food.category}</b>
      </p>
      <p className="sub">
        {Number.isFinite(+food.lat) && Number.isFinite(+food.lng)
          ? `Coordinates: ${(+food.lat).toFixed(6)}, ${(+food.lng).toFixed(6)}`
          : "Location coordinates unavailable."}
      </p>
      <a className="btn" style={{ display: "block", textAlign: "center", textDecoration: "none", margin: "10px 0" }} href={mapsUrl(food)} target="_blank" rel="noopener noreferrer">
        Open directions in Google Maps ↗
      </a>
      <button className="btn secondary" style={{ width: "100%" }} onClick={() => shareFood(food)}>
        Share food spot
      </button>

      <hr style={{ border: 0, borderTop: "1px solid var(--border)", margin: "22px 0" }} />
      <h3>Reviews &amp; ratings</h3>
      <ReviewsSummary avg={avg} count={list.length} />
      <ReviewList list={list} />

      <h3 style={{ marginTop: 20 }}>Write a review</h3>
      <ReviewForm foodId={food.id} onPosted={setReviews} />
    </>
  );
}
