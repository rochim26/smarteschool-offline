import create from "zustand";

const useUser = create((set) => ({
  user: {},
  setUser: (data) => set({ user: data }),
}));

export default useUser;
