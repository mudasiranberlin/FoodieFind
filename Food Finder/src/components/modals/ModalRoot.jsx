import React from "react";

export default function ModalRoot({ onBackdrop, children }) {
  return (
    <div className="modalback" onClick={(e) => e.target === e.currentTarget && onBackdrop()}>
      <div className="modal" role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  );
}
