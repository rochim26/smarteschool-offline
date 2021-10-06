import create from "zustand";

const usePPDB = create((set) => ({
  terdaftar: {},
  setTerdaftar: (data) => set({ terdaftar: data }),
}));

export default usePPDB;
