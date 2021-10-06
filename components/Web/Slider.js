import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = ({ children }) => {
  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={true} // should stop playing on user interaction
      interval={4000}
    >
      {children}
    </AutoplaySlider>
  );
};

export default Slider;
