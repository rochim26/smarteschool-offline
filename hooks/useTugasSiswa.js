import create from "zustand";

const useTugasSiswa = create((set) => ({
  tugasSiswa: {},
  setTugasSiswa: (data) => set({ tugasSiswa: data }),
}));

export default useTugasSiswa;
