/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useModalStore } from "@/store/useModal";
import AddLearnerModal from "./AddLearnerModal";
import SuccessDialog from "./SuccessModal";
import EditLearnerModal from "./EditLearnerModal";

const MODAL_REGISTRY = {
  success: SuccessDialog,
  addLearner: AddLearnerModal,
  editLearner: EditLearnerModal,
  // future: OtherModals...
} as const;

export default function Modal() {
  const { modalType, modalProps, closeModal } = useModalStore();

  if (!modalType || !modalProps) return null;

  const ModalComponent = MODAL_REGISTRY[modalType];

  const props = {
    ...modalProps,
    isOpen: true,
    onClose: closeModal,
  } as any;

  return <ModalComponent {...props} />;
}
