import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";

import AnswerKey from "@/components/AnswerKey";

const ResultCard = () => {
  const { sessionResult } = useApplicationContext();

  const [gridTextSize, setGridTextSize] = useState(36);
  const [currentGridWidth, setCurrentGridWidth] = useState(0);
  const [displayData, setDisplayData] = useState(sessionResult);

  //TODO: Is this reseultDisplayRef necessary?
  const resultDisplayRef = useRef();
  const gridRef = useRef();
  const cardRef = useRef();
  const gridRefWidth = useRef();
  const cardRefWidth = useRef();

  const decreaseTextSize = () => {
    if (gridTextSize <= 4) {
      return;
    }
    setGridTextSize((prev) => prev - 1);
  };

  const increaseTextSize = () => {
    if (gridTextSize >= 36) {
      return;
    }
    setGridTextSize((prev) => prev + 2);
  };

  //ADD OBSERVER TO CARD REF
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      cardRefWidth.current = entries[0].contentRect.width;

      const { width: gridWidth } = gridRef.current.getBoundingClientRect();

      if (cardRefWidth.current < gridWidth) {
        decreaseTextSize();
      }
      setCurrentGridWidth(gridWidth);
    });

    resizeObserver.observe(cardRef.current);

    return () => {
      // TODO: disconnect resize observer
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (cardRefWidth.current < gridRefWidth.current) {
      decreaseTextSize();
    }
  }, [currentGridWidth]);

  useLayoutEffect(() => {
    const { width: gridWidth } = gridRef.current.getBoundingClientRect();
    gridRefWidth.current = gridWidth;

    const { width: cardWidth } = cardRef.current.getBoundingClientRect();
    cardRefWidth.current = cardWidth;

    setCurrentGridWidth(gridWidth);
  }, [gridTextSize]);

  // DISPLAY UTILITIES FUNCTTION //
  //TODO: move out of this component ...custom hook?
  //  console.log('about to use display data', displayData)
  const length = displayData[0].length;
  let displayGridItems = (displayData) => {
    let elements = [];

    //append cue result card ref
    for (let i = 0; i < length; i++) {
      const word = displayData[0 + 1][i];
      elements.push(
        React.createElement(
          "div",
          {
            className: `card__results-card__grid-item`,
            key: i,
          },
          word
        )
      );
    }

    //append res to result card ref
    for (let i = 0; i < length; i++) {
      let word = "";
      let matchStatus = "";

      if (displayData[i + 2].match === "false") {
        matchStatus = "card__results-card__response-word--color-error";
      } else if (displayData[i + 2].match === "true") {
        matchStatus = "card__results-card__response-word--color-correct";
      } else if (displayData[i + 2].match === "false-true") {
        matchStatus = "card__results-card__response-word--color-wrong-position";
      }

      word = displayData[i + 2].responseDisplayWord;

      elements.push(
        React.createElement(
          "div",
          {
            className: `card__results-card__grid-item ${matchStatus}`,
            key: i + length,
          },
          word
        )
      );
    }

    return elements;
  };

  return (
    <div className="md-982:flex gap-4 ">
      <div>
        <div
          ref={cardRef}
          className=" card card__stage card__display--flex-column card__results-card  relative px-2 w-full"
        >
          <div
            ref={gridRef}
            style={{
              fontSize: `${gridTextSize}px`,
              display: "grid",
              gridTemplateColumns: `repeat(${length}, auto)`,
            }}
          >
            {displayGridItems(displayData).map((item) => item)}
          </div>

          <div className="absolute bottom-3 flex  items-center justify-center xl:bottom-5">
            <button onClick={decreaseTextSize} className="  bg-red-400 ">
              -
            </button>
            <span className="ml-4 mr-4 inline-block text-sm font-semibold">
              Text Size
            </span>
            <button onClick={increaseTextSize} className=" bg-green-400">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="w-[550px] flex justify-evenly gap-4 ">
        <div className="min-w-[180px]">

        <AnswerKey />
        </div>
        <div className="h-96 ">
          <img className="w-full h-full aspect-auto" src={"/images/tish-temporary.png"} alt="Tishliddlebudu" />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
