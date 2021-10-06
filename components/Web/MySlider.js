import React from "react";
import { useKeenSlider } from "keen-slider/react";

export default ({ src }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <>
      <div className="navigation-wrapper text-center">
        <div ref={sliderRef} className="keen-slider">
          {src.map((src) => {
            return (
              <div className="keen-slider__slide">
                <img src={src} alt="" />
              </div>
            );
          })}
        </div>
        {slider && (
          <>
            <ArrowLeft
              onClick={(e) => e.stopPropagation() || slider.prev()}
              disabled={currentSlide === 0}
            />

            <ArrowRight
              onClick={(e) => e.stopPropagation() || slider.next()}
              disabled={currentSlide === slider.details().size - 1}
            />
          </>
        )}
      </div>
      {slider && (
        <div className="dots">
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

function ArrowLeft(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={"arrow arrow--left" + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      width="93"
      height="93"
      viewBox="0 0 93 93"
    >
      <defs>
        <filter
          id="Ellipse_10"
          x="0"
          y="0"
          width="93"
          height="93"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood flood-color="#2680eb" flood-opacity="0.502" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g id="arrow-left" transform="translate(4 86) rotate(-90)">
        <g transform="matrix(0, 1, -1, 0, 86, -4)" filter="url(#Ellipse_10)">
          <circle
            id="Ellipse_10-2"
            data-name="Ellipse 10"
            cx="37.5"
            cy="37.5"
            r="37.5"
            transform="translate(9 81) rotate(-90)"
            fill="#2680eb"
          />
        </g>
        <g
          id="Ellipse_11"
          data-name="Ellipse 11"
          fill="none"
          stroke="#fff"
          stroke-width="1"
        >
          <circle cx="42.5" cy="42.5" r="42.5" stroke="none" />
          <circle cx="42.5" cy="42.5" r="42" fill="none" />
        </g>
        <path
          id="Path_73"
          data-name="Path 73"
          d="M15,15H0V0"
          transform="translate(52.713 47.893) rotate(135)"
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="5"
        />
      </g>
    </svg>
  );
}

function ArrowRight(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={"arrow arrow--right" + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      width="93"
      height="93"
      viewBox="0 0 93 93"
    >
      <defs>
        <filter
          id="Ellipse_10"
          x="0"
          y="0"
          width="93"
          height="93"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood flood-color="#2680eb" flood-opacity="0.502" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g id="arrow-right" transform="translate(-1690 1111) rotate(-90)">
        <g
          transform="matrix(0, 1, -1, 0, 1111, 1690)"
          filter="url(#Ellipse_10)"
        >
          <circle
            id="Ellipse_10-2"
            data-name="Ellipse 10"
            cx="37.5"
            cy="37.5"
            r="37.5"
            transform="translate(9 81) rotate(-90)"
            fill="#2680eb"
          />
        </g>
        <g
          id="Ellipse_11"
          data-name="Ellipse 11"
          transform="translate(1025 1694)"
          fill="none"
          stroke="#fff"
          stroke-width="1"
        >
          <circle cx="42.5" cy="42.5" r="42.5" stroke="none" />
          <circle cx="42.5" cy="42.5" r="42" fill="none" />
        </g>
        <path
          id="Path_73"
          data-name="Path 73"
          d="M15,0H0V15"
          transform="translate(1067.106 1741.713) rotate(-135)"
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="5"
        />
      </g>
    </svg>
  );
}
