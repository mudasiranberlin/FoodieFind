import React, { useEffect, useRef, useState } from "react";
import { areas, categories } from "../../data.js";
import CloseBtn from "./CloseBtn.jsx";

export default function AddFoodModal({ city, onClose, onSubmit, onUseLocation, loc }) {
  const initialCity = city === "All Cambodia" ? "Phnom Penh" : city;
  const [photos, setPhotos] = useState([]);
  const [photoMsg, setPhotoMsg] = useState("Please select 2 or 3 images.");
  const formRef = useRef(null);

  useEffect(() => {
    if (loc && formRef.current) {
      formRef.current.lat.value = loc.lat.toFixed(6);
      formRef.current.lng.value = loc.lng.toFixed(6);
    }
  }, [loc]);

  async function handleFiles(e) {
    const target = e.target;
    const files = [...target.files];
    if (files.length < 2 || files.length > 3) {
      setPhotoMsg("Select exactly 2 or 3 images.");
      setPhotos([]);
      target.setCustomValidity("Please select 2 or 3 photos.");
      return;
    }
    target.setCustomValidity("");
    const results = [];
    for (const file of files) {
      if (file.size > 3 * 1024 * 1024) {
        alert(`${file.name} is over 3 MB. Choose smaller images.`);
        setPhotos([]);
        setPhotoMsg("One or more images exceeded 3 MB. Please select smaller images.");
        target.setCustomValidity("Each image must be 3 MB or smaller.");
        return;
      }
      const dataUrl = await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = reject;
        r.readAsDataURL(file);
      });
      results.push(dataUrl);
    }
    setPhotos(results);
    setPhotoMsg(`${results.length} photos selected.`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const lat = Number(d.lat);
    const lng = Number(d.lng);
    if (!Number.isFinite(lat) || lat < -90 || lat > 90 || !Number.isFinite(lng) || lng < -180 || lng > 180) {
      alert("Enter valid latitude (-90 to 90) and longitude (-180 to 180).");
      return;
    }
    if (photos.length < 2 || photos.length > 3) {
      alert("Please upload 2 or 3 photos.");
      return;
    }
    const item = { ...d, id: "u" + Date.now(), lat, lng, images: photos, image: photos[0], approved: false, demo: false };
    onSubmit(item);
    onClose();
    alert("Submitted for owner review on this device.");
  }

  return (
    <>
      <div className="modalhead">
        <h2>Add a food spot</h2>
        <CloseBtn onClose={onClose} />
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="field">
          <label>Food / dish name *</label>
          <input name="name" required maxLength={100} placeholder="e.g. Auntie's Fish Amok" />
        </div>
        <div className="formgrid">
          <div className="field">
            <label>Restaurant / market / area *</label>
            <input name="place" required maxLength={140} placeholder="e.g. Russian Market" />
          </div>
          <div className="field">
            <label>City / province *</label>
            <select name="city" defaultValue={initialCity}>
              {areas.map((a) => (
                <option key={a[0]}>{a[0]}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Phone number *</label>
            <input name="phone" type="tel" required maxLength={30} placeholder="e.g. +855 12 345 678" />
          </div>
          <div className="field">
            <label>Telegram username or phone *</label>
            <input name="telegram" required maxLength={64} placeholder="@username or Telegram number" />
          </div>
          <div className="field">
            <label>Category</label>
            <select name="category" defaultValue={categories[1]}>
              {categories.slice(1).map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>GPS helper</label>
            <button type="button" className="btn secondary" onClick={onUseLocation}>
              ◎ Use my current location
            </button>
          </div>
          <div className="field">
            <label>Latitude *</label>
            <input name="lat" type="number" step="any" required placeholder="11.5564" />
          </div>
          <div className="field">
            <label>Longitude *</label>
            <input name="lng" type="number" step="any" required placeholder="104.9282" />
          </div>
        </div>
        <div className="field">
          <label>Upload 2 or 3 food photos (maximum 3)</label>
          <input type="file" accept="image/*" multiple required onChange={handleFiles} />
          <div className="previewrow">
            {photos.map((p, i) => (
              <img key={i} src={p} alt="Photo preview" />
            ))}
          </div>
          <div className="sub">{photoMsg}</div>
        </div>
        <div className="field">
          <label>Details, price, opening hours, tips</label>
          <textarea name="description" maxLength={1000} placeholder="What should visitors know?" />
        </div>
        <button className="btn" style={{ width: "100%" }}>
          Send for owner approval
        </button>
        <p className="sub">Your contact details are included with the private submission for owner review. Submissions stay on this device in this prototype.</p>
      </form>
    </>
  );
}
