import React from 'react'
import { Carousel, Typography, Button } from "@material-tailwind/react";

export function CarouselWithContent(props) {
  const { news } = props;

  return (
    <Carousel className='w-[768px] h-full rounded-xl' autoplay={true} loop={true} navigation={({setActiveIndex, activeIndex, length}) => {<div className='invisible'></div>}}>
      {
        news ?
        news.map((value, index) => {
          return (
            <div className="relative w-full">
              <img
                src={value.teaser}
                alt="image 1"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 grid h-full w-full place-items-center bg-black">
                <div className="w-full h-20 flex flex-col text-center md:w-2/4">
                  <Typography
                    variant="h2"
                    color="white"
                    className="text-2xl"
                  >
                    {value.title}
                  </Typography>
                  <div className="flex justify-center gap-2 mt-2">
                    <Button size="lg" color="white">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        }) : null
      }
    </Carousel>
  );
}