import React from 'react'
import { /*Carousel,*/ Typography, Button } from "@material-tailwind/react";
import Carousel from "react-spring-3d-carousel";
import { useState, useEffect, useRef } from "react";
import { config } from "react-spring";
import { useSpring, animated } from "react-spring";

function NewsCard({ index, value, today = false }) {

    const newsInfo = value;
    const [hovered, setHovered] = useState(false);
  
    const props3 = useSpring({
      opacity: 1,
      transform: hovered ? "scale(1.1)" : "scale(1)",
      boxShadow: hovered
        ? "0 20px 25px rgb(0 0 0 / 25%)"
        : "0 2px 10px rgb(0 0 0 / 8%)"
    });
  
    const props1 = useSpring({
      opacity: hovered ? 1 : 0,
      boxShadow: hovered
        ? "0 20px 25px rgb(0 0 0 / 25%)"
        : "0 2px 10px rgb(0 0 0 / 8%)"
    });

    const onClickedView = () => {
      window.open(newsInfo.link, '_blank');
    }
  
    return (
      <animated.div
        className="relative w-[250px] xl:w-[280px] 2xl:w-[300px] cursor-pointer select-none drop-shadow-lg border-none"
        style={props3}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={()=>{onClickedView()}}>
        <img
          src={value.teaser}
          alt="image 1"
          className="h-full w-full object-cover rounded-xl"
        />
        {/* <div className='absolute inset-0 grid h-full w-full bg-black opacity-30'></div> */}
        <div className="absolute inset-0 grid h-full w-full place-items-end">
          <div className="w-full flex flex-row text-left justify-start items-start rounded-bl-xl rounded-br-xl" style={{ background: 'linear-gradient(360deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)' }}>
            <Typography
              variant="h1"
              color="white"
              className="text-sm px-3 py-2 select-none font-swiss text-left"
            >
              {value.title}
            </Typography>
          </div>
        </div>
        {
          today == true ? (
            <div className='absolute top-2 left-2 rounded-full bg-red-900 text-white drop-shadow text-center px-2'>
              New
            </div>
          ) : null
        }
        {
          //   <div className="absolute inset-0 grid h-full w-full place-items-center">
          //   <div className="w-full flex flex-row text-center justify-center items-center">
          //     <animated.div className="flex justify-center" style={props1}>
          //       <Button size="sm" color="white" className='opacity-100' disabled={!hovered} onClick={()=>{onClickedView()}}>
          //         View
          //       </Button>
          //     </animated.div>
          //   </div>
          // </div>
        }
      </animated.div>
    )
  };
  

  export default NewsCard;