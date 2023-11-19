import React, { useEffect, useState } from 'react'
import CarouselContent from './verticalCarouselContent'

import { config } from "react-spring";
import { useSpring, animated } from "react-spring";
import { /*Carousel,*/ Typography, Button } from "@material-tailwind/react";
import NewsCard from "./../components/NewsCard";

let currentSlideIndex: number = null;

const VerticalCarousel = ({news}) => {

    const [goToSlide, setGotoSlide] = useState(-1);
    const [period, setPeriod] = useState<number>(2000);

    let slides = news.map((item, index) => {
        return {
            key: index,
            content: <NewsCard index={index} value={item} setGoToSlide={(index) => { setGotoSlide(index) }} />
        }
    })

    // useEffect(() => {
    //     currentSlideIndex = goToSlide;
    //     //Implementing the setInterval method 
    //     const interval = setInterval(() => {
    //         setGotoSlide((currentSlideIndex + 1) % slides.length)
    //     }, period);
    
    //     // this.shouldComponentUpdate();
    //     //Clearing the interval 
    //     return () => clearInterval(interval);
    //   }, [goToSlide]);

    return (
        <>
            <div
                className='h-[250px] xl:h-[300px] 2xl:h-[400px]'
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "400px",
                    margin: "0 auto",
                }}
            >
                <CarouselContent
                    goToSlide={goToSlide}
                    slides={slides}
                    offsetRadius={2}
                    showNavigation={false}
                    animationConfig={config.gentle as any} />
            </div>
        </>
    )
}

export default VerticalCarousel