import React from "react";
import styled from "@emotion/styled";
import { Spring, animated } from "react-spring/renderprops";
import { withGesture } from "react-with-gesture";

const SlideContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
`;

const SlideCard = styled.div`
  position: relative;
  background: none;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
`;
// Prop types for your Slide component
interface SlideProps {
    content: any;
    offsetRadius: number;
    index: number;
    animationConfig: any; // You can specify the correct type for animationConfig
    moveSlide: (delta: number) => void;
    delta?: number[];
    down?: boolean;
    up?: boolean;
  }
  
  function Slide({
    content,
    offsetRadius,
    index,
    animationConfig,
    moveSlide,
    delta,
    down,
  }: SlideProps ) {
    const offsetFromMiddle = index - offsetRadius;
    const totalPresentables = 2 * offsetRadius + 1;
    const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 3));
  
    const offsetCardClick = (i: number) => {
      console.log(i);
    };
  
    const translateYoffset =
      50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
    let translateY = -50;
  
    if (offsetRadius !== 0) {
      if (index === 0) {
        translateY = 0;
      } else if (index === totalPresentables - 1) {
        translateY = -100;
      }
    }
  
    if (offsetFromMiddle === 0 && down) {
      translateY += delta[1] / (offsetRadius + 1);
      if (translateY > -40) {
        moveSlide(-1);
      }
      if (translateY < -100) {
        moveSlide(1);
      }
    }
    if (offsetFromMiddle > 0) {
      translateY += translateYoffset;
    } else if (offsetFromMiddle < 0) {
      translateY -= translateYoffset;
    }
  
    return (
      <Spring
        to={{
          transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
          // transform: `translateX(0%) translateY(${translateY}%)`,
          top: `${
            offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 60) / offsetRadius
            // offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 60) / offsetRadius
          }%`,
          opacity: distanceFactor * distanceFactor,
        }}
        config={animationConfig}
      >
        {(style) => (
          <SlideContainer
            style={{
              ...style,
              zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2),
            }}
          >
            <SlideCard onClick={() => moveSlide(offsetFromMiddle)}>
              {content}
            </SlideCard>
          </SlideContainer>
        )}
      </Spring>
    );
  }
  
  export default (Slide);