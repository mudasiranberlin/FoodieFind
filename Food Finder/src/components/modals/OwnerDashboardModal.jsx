import React from "react";
import { mapsUrl } from "../../data.js";
import CloseBtn from "./CloseBtn.jsx";

function PendingRow({ p, onApprove, onReject }) {
  return (
    <div className="adminrow">
      <div>
        <b>{p.name}</b>
        <div className="sub">
          {p.place}, {p.city} · {p.lat}, {p.lng}
        </div>
        <div className="previewrow">
          {(p.images || []).map((im, i) => (
            <img key={i} src={im} alt="Submission photo" />
          ))}
        </div>
        <a className="maplink" href={mapsUrl(p)} target="_blank" rel="noopener noreferrer">
          Check map ↗
        </a>
      </div>
      <div className="actions">
        <button className="btn" onClick={() => onApprove(p.id)}>
          Approve
        </button>
        <button className="btn secondary" onClick={() => onReject(p.id)}>
          Reject
        </button>
      </div>
    </div>
  );
}

export default function OwnerDashboardModal({ pending, onClose, onApprove, onReject }) {
  return (
    <>
      <div className="modalhead">
        <h2>Owner review ({pending.length})</h2>
        <CloseBtn onClose={onClose} />
      </div>
      {pending.length ? (
        pending.map((p) => <PendingRow key={p.id} p={p} onApprove={onApprove} onReject={onReject} />)
      ) : (
        <div className="empty">No pending submissions on this device.</div>
      )}
      <p className="sub">Approved items are saved in this browser only. A production app needs server-side moderation shared across users.</p>
    </>
  );
}
