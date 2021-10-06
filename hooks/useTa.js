import create from "zustand";

const useTa = create((set) => ({
  ta: {},
  setTa: (data) => set({ ta: data }),
}));

export default useTa;
