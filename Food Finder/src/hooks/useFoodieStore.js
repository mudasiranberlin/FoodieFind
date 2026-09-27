import { useEffect, useMemo, useState } from "react";
import { buildDemo, dist, load } from "../data.js";

function persist(foods, pending) {
  try {
    localStorage.setItem("ff-foods", JSON.stringify(foods));
    localStorage.setItem("ff-pending", JSON.stringify(pending));
  } catch {
    alert("Browser storage is full. Please use fewer/smaller photos or connect a server for permanent storage.");
  }
}

const demo = buildDemo();

/**
 * Central store for FoodieFind: listings, pending submissions, filters,
 * geolocation and the active modal. Keeping this in one hook keeps
 * App.jsx focused on layout/composition only.
 */
export default function useFoodieStore() {
  const [foods, setFoods] = useState(() => load("ff-foods", demo));
  const [pending, setPending] = useState(() => load("ff-pending", []));
  const [loc, setLoc] = useState(null);
  const [locMsg, setLocMsg] = useState("Location not shared yet. Enable location to sort by distance.");
  const [cat, setCat] = useState("All");
  const [city, setCity] = useState("All Cambodia");
  const [query, setQuery] = useState("");
  const [admin, setAdmin] = useState(false);
  const [modal, setModal] = useState(null); // {type:'add'|'ownerLogin'|'ownerDashboard'|'view'|'category', id?}

  useEffect(() => {
    persist(foods, pending);
  }, [foods, pending]);

  function getLocation() {
    if (!navigator.geolocation) {
      setLocMsg("This browser does not support GPS location. You can still choose a province or enter coordinates.");
      return;
    }
    if (!window.isSecureContext) {
      setLocMsg("Location requires HTTPS or localhost. Open this app on a secure HTTPS site, then allow location access.");
      return;
    }
    setLocMsg("Requesting location permission… Please allow it in your browser.");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setLoc({ lat: p.coords.latitude, lng: p.coords.longitude });
        setLocMsg(`Your location is active (±${Math.round(p.coords.accuracy)} m). Listings with coordinates are sorted by straight-line distance; map directions open Google Maps.`);
      },
      (e) => {
        setLocMsg(
          e.code === 1
            ? "Location permission denied. Click the lock/site icon beside the address bar, allow Location, and try again."
            : e.code === 2
            ? "Your position could not be determined. Check device location services or choose a province / enter coordinates."
            : "GPS request timed out. Try again outdoors or check device location services."
        );
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 30000 }
    );
  }

  const list = useMemo(() => {
    let l = foods
      .filter(
        (f) =>
          f.approved &&
          (cat === "All" || f.category === cat) &&
          (city === "All Cambodia" || f.city === city) &&
          (!query ||
            [f.name, f.place, f.city, f.category, f.description].join(" ").toLowerCase().includes(query.toLowerCase()))
      )
      .map((f) => ({ ...f, dist: dist(f, loc) }));
    if (loc) l.sort((a, b) => (a.dist ?? Infinity) - (b.dist ?? Infinity));
    return l;
  }, [foods, cat, city, query, loc]);

  const resultsTitle = (query ? `Results for “${query}”` : loc ? "Food near you" : "Popular food discoveries") + ` (${list.length})`;

  function resetFilters() {
    setQuery("");
    setCat("All");
    setCity("All Cambodia");
  }

  function closeModal() {
    setModal(null);
  }

  function approveSubmission(id) {
    const item = pending.find((x) => x.id === id);
    if (item) setFoods((f) => [{ ...item, approved: true }, ...f]);
    setPending((p) => p.filter((x) => x.id !== id));
  }
  function rejectSubmission(id) {
    setPending((p) => p.filter((x) => x.id !== id));
  }
  function addSubmission(item) {
    setPending((p) => [item, ...p]);
  }

  function tryOwnerLogin(code) {
    if (code === "owner123") {
      setAdmin(true);
      setModal({ type: "ownerDashboard" });
      return true;
    }
    return false;
  }

  return {
    // data
    foods,
    pending,
    list,
    resultsTitle,
    // filters
    cat,
    setCat,
    city,
    setCity,
    query,
    setQuery,
    resetFilters,
    // location
    loc,
    locMsg,
    getLocation,
    // admin
    admin,
    tryOwnerLogin,
    approveSubmission,
    rejectSubmission,
    addSubmission,
    // modal
    modal,
    setModal,
    closeModal,
  };
}
