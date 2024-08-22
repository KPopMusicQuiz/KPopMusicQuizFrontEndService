import { create } from "zustand";

interface SidebarStore {
  open: boolean;
  setOpen: (state: boolean) => void;
  animate: boolean;
};

export const useSidebar = create<SidebarStore>((set) => ({
  open: false,
  setOpen: (state) => set(() => ({ open: state })),
  animate: true,
}));
