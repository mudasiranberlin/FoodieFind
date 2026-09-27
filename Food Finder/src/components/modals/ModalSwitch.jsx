import React from "react";
import ModalRoot from "./ModalRoot.jsx";
import AddFoodModal from "./AddFoodModal.jsx";
import OwnerLoginModal from "./OwnerLoginModal.jsx";
import OwnerDashboardModal from "./OwnerDashboardModal.jsx";
import ViewFoodModal from "./ViewFoodModal.jsx";
import CategoryPickerModal from "./CategoryPickerModal.jsx";

export default function ModalSwitch({ store }) {
  const { modal, closeModal, city, loc, getLocation, addSubmission, tryOwnerLogin, pending, approveSubmission, rejectSubmission, foods, cat, setCat } = store;

  if (!modal) return null;

  return (
    <ModalRoot onBackdrop={closeModal}>
      {modal.type === "add" && (
        <AddFoodModal city={city} onClose={closeModal} onSubmit={addSubmission} onUseLocation={getLocation} loc={loc} />
      )}
      {modal.type === "ownerLogin" && <OwnerLoginModal onClose={closeModal} onLogin={tryOwnerLogin} />}
      {modal.type === "ownerDashboard" && (
        <OwnerDashboardModal pending={pending} onClose={closeModal} onApprove={approveSubmission} onReject={rejectSubmission} />
      )}
      {modal.type === "view" && <ViewFoodModal food={foods.find((f) => f.id === modal.id)} onClose={closeModal} />}
      {modal.type === "category" && (
        <CategoryPickerModal
          cat={cat}
          onPick={(c) => {
            setCat(c);
            closeModal();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </ModalRoot>
  );
}
