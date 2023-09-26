import { create } from "zustand";

interface usePromodalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Before you call the fuction, apply interface
// This determine any comopnent that will call am
export const useProModal = create<usePromodalStore>((set) => ({
  // It determines if will open
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
