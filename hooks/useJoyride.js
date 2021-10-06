import create from "zustand";
import Cookies from "js-cookie";

const joyrideData = JSON.parse(Cookies.get("joyrideConfig") || "{}");

const setData = (data) => {
  // remove cookies after 6 months
  Cookies.set("joyrideConfig", JSON.stringify(data), { expires: 182 });

  return data;
};

const useJoyride = create((set) => ({
  joyrideConfig: joyrideData,
  setJoyrideConfig: (data) => set({ joyrideConfig: setData(data) }),
}));

export default useJoyride;
