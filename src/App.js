import React, { useRef, useEffect } from "react";
import "./App.scss";
import useWindowSize from "./hooks/useWindowSize";
import images from "./images/images";

function App() {
  // Hook
  const size = useWindowSize();
  // RFF
  const app = useRef();
  const scrollContainer = useRef();
  const skewConfigs = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };
  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
  });
  useEffect(() => {
    setBodyHeight();
  }, [size.height]);

  const setBodyHeight = () => {
    document.body.style.height = `${
      scrollContainer.current.getBoundingClientRect().height
    }px`;
  };

  const skewScrolling = () => {
    skewConfigs.current = window.scrollY;
    skewConfigs.previous +=
      (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease;
    skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100;

    // variables
    const difference = skewConfigs.current - skewConfigs.rounded;
    const acceleration = difference / size.width;
    const velocity = +acceleration;
    const skew = velocity * 7.5;

    //
    scrollContainer.current.style.transform = `translateY(-${skewConfigs.rounded}px) skewY(${skew}deg)`;

    requestAnimationFrame(() => skewScrolling());
  };

  return (
    <div ref={app} className="App">
      <div ref={scrollContainer} className="scroll">
        {images.map((image, index) => (
          <>
            <div key={index} className="img-container">
              <img src={image} alt={`people ${index}`} />
            </div>
            <h2>
              React <span className="outline">Scrolling</span>
            </h2>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
