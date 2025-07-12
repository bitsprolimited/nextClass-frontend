import { ModalConfig, useModalStore } from "@/store/useModal";

export const useModal = () => {
  const { openModal, closeModal, closeAllModals, updateModal } =
    useModalStore();

  const open = (config: Omit<ModalConfig, "id"> & { id?: string }) => {
    return openModal(config);
  };

  const close = (id: string) => {
    closeModal(id);
  };

  const closeAll = () => {
    closeAllModals();
  };

  const update = (id: string, updates: Partial<ModalConfig>) => {
    updateModal(id, updates);
  };

  return {
    open,
    close,
    closeAll,
    update,
  };
};
