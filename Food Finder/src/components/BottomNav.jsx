import React from "react";

export default function BottomNav({ onExplore, onNearby, onCategory, onAdd }) {
  return (
    <nav className="bottom">
      <button onClick={onExplore}>
        <b>⌂</b>Home
      </button>
      <button onClick={onNearby}>
        <b>◎</b>Nearby
      </button>
      <button onClick={onCategory}>
        <b>▤</b>Category
      </button>
      <button onClick={onAdd}>
        <b>＋</b>Add food
      </button>
    </nav>
  );
}
