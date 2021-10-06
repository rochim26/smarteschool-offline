import create from "zustand";

const useAbsenSiswa = create((set) => ({
  absenSiswa: {},
  setAbsenSiswa: (data) => set({ absenSiswa: data }),
}));

export default useAbsenSiswa;
