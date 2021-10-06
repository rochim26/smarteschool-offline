import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const MyCountUp = ({ nilai }) => {
  return (
    <h2 className="my-2 font-weight-bold text-primary">
      {
        nilai && (
          <CountUp start={0} end={nilai} redraw={true}>
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
        )
      }
    </h2>
  );
};

export default MyCountUp;
