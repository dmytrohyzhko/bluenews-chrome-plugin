import React from 'react'
import { /*Carousel,*/ Typography, Button } from "@material-tailwind/react";
import Carousel from "react-spring-3d-carousel";
import NewsCard from "./components/NewsCard";
import { useState, useEffect, useRef } from "react";
import { config } from "react-spring";
import { useSpring, animated } from "react-spring";

let currentSlideIndex: number = null;

export function CarouselWithContent(props) {
  const { news } = props;

  const [offsetRadius, setOffsetRadius] = useState<number>(5);
  const [showArrows, setShowArrows] = useState<Boolean>(false);
  const [goToSlide, setGoToSlide] = useState<number>(-1);
  const [period, setPeriod] = useState<number>(20000);
  let cards = news.map((value, index) => {
    return {
      key: index,
      content: (
        <NewsCard index={index} value={value} setGoToSlide={setGoToSlide} />
      )
    }
  })

  useEffect(() => {
    currentSlideIndex = goToSlide;
    //Implementing the setInterval method 
    const interval = setInterval(() => {
      setGoToSlide((goToSlide + 1) % cards.length)
    }, period);

    // this.shouldComponentUpdate();
    //Clearing the interval 
    return () => clearInterval(interval);
  }, [goToSlide]);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  return (
    <div style={{ width: props.width, height: props.height }}>
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={null}
        animationConfig={config.gentle}
      />
    </div>
  );
}