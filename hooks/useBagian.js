import create from "zustand";

const useBagian = create((set) => ({
  bagian: "",
  setBagian: (data) => set({ bagian: data }),
}));

export default useBagian;
