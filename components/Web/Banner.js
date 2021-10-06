import React from "react";

const Banner = ({ src }) => {
  return (
    <section
      className="banner"
      style={{
        background: `radial-gradient(
        rgba(255, 255, 255, 0) 0%,
        rgba(4, 0, 36, .5) 90%
      ), url(${src})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
      }}
    ></section>
  );
};

export default Banner;
