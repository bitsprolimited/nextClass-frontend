/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import React from "react";

interface OpenModalInstance {
  id: string;
  component: React.ComponentType<any>;
  props: any;
}

interface ModalState {
  openModals: OpenModalInstance[];
  openModal: (component: React.ComponentType<any>, props?: any) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

// Create the Zustand store
export const useModalStore = create<ModalState>((set) => ({
  openModals: [],
  openModal: (component, props = {}) => {
    const id = crypto.randomUUID();
    set((state) => ({
      openModals: [...state.openModals, { id, component, props }],
    }));
    return id;
  },
  closeModal: (id) => {
    set((state) => ({
      openModals: state.openModals.filter((modal) => modal.id !== id),
    }));
  },
  closeAllModals: () => {
    set({ openModals: [] });
  },
}));
