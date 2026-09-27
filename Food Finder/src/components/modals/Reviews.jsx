import React, { useState } from "react";
import { load } from "../../data.js";

export function ReviewsSummary({ avg, count }) {
  return (
    <p className="sub">
      ⭐ {avg}
      {count ? ` · ${count} review${count === 1 ? "" : "s"}` : ""}
    </p>
  );
}

export function ReviewList({ list }) {
  if (!list.length) return <p className="sub">Be the first to leave a review.</p>;
  return (
    <div>
      {list
        .slice()
        .reverse()
        .map((r, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
            <b>{r.name}</b> <span style={{ color: "var(--secondary-ink)" }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
            <p className="sub" style={{ margin: "5px 0" }}>
              {r.comment}
            </p>
            <small className="sub">{r.date}</small>
          </div>
        ))}
    </div>
  );
}

export function ReviewForm({ foodId, onPosted }) {
  const [form, setForm] = useState({ name: "", rating: "", comment: "" });

  function submitReview(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.rating || !form.comment.trim()) return;
    const r = load("ff-reviews", {});
    r[foodId] = r[foodId] || [];
    r[foodId].push({ name: form.name.trim(), rating: Number(form.rating), comment: form.comment.trim(), date: new Date().toLocaleDateString() });
    try {
      localStorage.setItem("ff-reviews", JSON.stringify(r));
    } catch {
      alert("Could not save review in browser storage.");
      return;
    }
    onPosted(r);
    setForm({ name: "", rating: "", comment: "" });
  }

  return (
    <form onSubmit={submitReview}>
      <div className="field">
        <label>Your name</label>
        <input maxLength={60} required placeholder="Enter your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="field">
        <label>Rating</label>
        <select required value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
          <option value="">Choose stars</option>
          <option value="5">★★★★★ — Excellent</option>
          <option value="4">★★★★☆ — Good</option>
          <option value="3">★★★☆☆ — Average</option>
          <option value="2">★★☆☆☆ — Poor</option>
          <option value="1">★☆☆☆☆ — Very poor</option>
        </select>
      </div>
      <div className="field">
        <label>Comment</label>
        <textarea maxLength={600} required placeholder="Share your food experience…" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
      </div>
      <button className="btn" style={{ width: "100%" }}>
        Post review
      </button>
      <p className="sub">Reviews are saved in this browser on this prototype.</p>
    </form>
  );
}
