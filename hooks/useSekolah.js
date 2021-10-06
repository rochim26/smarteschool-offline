import create from "zustand";

const useSekolah = create((set) => ({
  sekolah: {},
  setSekolah: (data) => set({ sekolah: data }),
}));

export default useSekolah;
