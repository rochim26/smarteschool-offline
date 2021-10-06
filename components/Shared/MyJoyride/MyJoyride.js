import { useRouter } from "next/router";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactJoyride from "react-joyride";
import useJoyride from "../../../hooks/useJoyride";

const MyJoyride = ({ steps = [] }) => {
  const router = useRouter();

  const { joyrideConfig, setJoyrideConfig } = useJoyride();

  const handleJoyrideCallback = (data) => {
    const { action } = data;
    if (action === "reset" || action === "close") {
      setJoyrideConfig({ ...joyrideConfig, [router.pathname]: true });
    }
  };

  const defaultOptions = {
    arrowColor: "#fff",
    backgroundColor: "#fff",
    beaconSize: 36,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    primaryColor: "#2680eb",
    spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    textColor: "#333",
    width: undefined,
    zIndex: 100,
  };

  return (
    <ReactJoyride
      run={!joyrideConfig?.[router.pathname]}
      continuous={true}
      showProgress={false}
      showSkipButton={true}
      disableScrolling={true}
      styles={{
        options: defaultOptions,
        buttonNext: {
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0",
          outline: "none",
          border: "none",
        },
        buttonBack: {
          outline: "none",
          border: "none",
        },
        buttonSkip: {
          outline: "none",
          border: "none",
        },
        buttonClose: {
          outline: "none",
          border: "none",
        },
      }}
      locale={{
        back: <FaChevronLeft />,
        last: <FaCheck />,
        next: <FaChevronRight />,
        skip: "Lewati",
      }}
      steps={steps}
      callback={handleJoyrideCallback}
    />
  );
};

export default MyJoyride;
