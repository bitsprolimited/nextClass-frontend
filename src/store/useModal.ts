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
};

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  modalProps: null,
  openModal: (type, props) => set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: null, modalProps: null }),
}));
