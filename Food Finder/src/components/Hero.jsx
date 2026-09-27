import React from "react";

export default function Hero({ onUseLocation }) {
  return (
    <section className="hero">
      <div>
        <h1>
          Find your next
          <br />
          favorite bite.
        </h1>
        <p>Discover local food spots across Cambodia, shared by the community.</p>
        <button className="btn" onClick={onUseLocation}>
          ◎ Use my location
        </button>
      </div>
      <div className="heroemoji">🥢🍲</div>
    </section>
  );
}
