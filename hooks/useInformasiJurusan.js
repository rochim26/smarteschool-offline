import create from "zustand";

const useInformasiJurusan = create((set) => ({
  informasiJurusan: {},
  setInformasiJurusan: (data) => set({ informasiJurusan: data }),
}));

export default useInformasiJurusan;
