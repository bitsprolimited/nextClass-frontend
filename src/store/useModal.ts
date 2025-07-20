// store/useModal.ts
import { ModalComponents } from "@/types";
import { create } from "zustand";

export type ModalType = keyof ModalComponents;

type ModalState = {
  modalType: ModalType | null;
  modalProps: ModalComponents[ModalType]["props"] | null;
  openModal: <T extends ModalType>(
    type: T,
    props: ModalComponents[T]["props"]
  ) => void;
  closeModal: () => void;
  openSuccessModal: (props: ModalComponents["success"]["props"]) => void;
  openAddLearnerModal: (props: ModalComponents["addLearner"]["props"]) => void;
  openEditLearnerModal: (
    props: ModalComponents["editLearner"]["props"]
  ) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  modalProps: null,
  openModal: (type, props) => set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: null, modalProps: null }),
  openSuccessModal: (props) => set({ modalType: "success", modalProps: props }),
  openAddLearnerModal: (props) =>
    set({ modalType: "addLearner", modalProps: props }),
  openEditLearnerModal: (props) =>
    set({ modalType: "editLearner", modalProps: props }),
}));
