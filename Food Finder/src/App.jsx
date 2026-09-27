import React from "react";
import useFoodieStore from "./hooks/useFoodieStore.js";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import CityToolbar from "./components/CityToolbar.jsx";
import CategoryChips from "./components/CategoryChips.jsx";
import FoodGrid from "./components/FoodGrid.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Logo5Tap from "./components/Logo5Tap.jsx";
import ModalSwitch from "./components/modals/ModalSwitch.jsx";

export default function App() {
  const store = useFoodieStore();
  const { query, setQuery, cat, setCat, city, setCity, list, resultsTitle, locMsg, getLocation, resetFilters, setModal } = store;

  return (
    <div className="app" id="app">
      <Header query={query} setQuery={setQuery} onAdd={() => setModal({ type: "add" })} />

      <main className="content">
        <Hero onUseLocation={getLocation} />

        <div className="status" role="status">
          {locMsg}
        </div>

        <CityToolbar city={city} setCity={setCity} />
        <CategoryChips cat={cat} setCat={setCat} />

        <h2 className="sectiontitle">{resultsTitle}</h2>
        <FoodGrid list={list} onView={(id) => setModal({ type: "view", id })} onReset={resetFilters} />

        <div className="toolbar">
          <div>
            <h2 className="sectiontitle">Help map Cambodia&apos;s food</h2>
            <p className="sub">Add a real food stall, restaurant, or hidden gem. Owner approval is required before it appears publicly.</p>
          </div>
          <button className="btn" onClick={() => setModal({ type: "add" })}>
            ＋ Add a food spot
          </button>
        </div>
      </main>

      <BottomNav
        onExplore={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onNearby={getLocation}
        onCategory={() => setModal({ type: "category" })}
        onAdd={() => setModal({ type: "add" })}
      />

      <Logo5Tap onUnlock={() => setModal({ type: "ownerLogin" })} />

      <ModalSwitch store={store} />
    </div>
  );
}
