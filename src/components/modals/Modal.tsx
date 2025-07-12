"use client"
import { useModalStore } from "@/store/useModal";
import React from "react";

const Modal = () => {
  const { openModals, closeModal } = useModalStore();

  return (
    <>
      {openModals.map((modalInstance) => (
        <React.Fragment key={modalInstance.id}>
          {/* Render the specific modal component */}
          <modalInstance.component
            isOpen={true}
            onClose={() => closeModal(modalInstance.id)}
            {...modalInstance.props}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default Modal;
