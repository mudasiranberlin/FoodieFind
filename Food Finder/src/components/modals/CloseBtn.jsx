import React from "react";

export default function CloseBtn({ onClose }) {
  return (
    <button className="x" onClick={onClose} aria-label="Close">
      ×
    </button>
  );
}
