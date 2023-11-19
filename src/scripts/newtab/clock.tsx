import React, { useEffect, useState } from 'react'
import { CarouselWithContent } from './carousel'
import useApiEndPoints from '../lib/hooks/useApiEndPoints'

const ClockComponent = () => {

    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    function formatDateToDesiredFormat(): any {
        // Get the user's preferred language
        let userLanguage = navigator.language;
        
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const dayOfWeek = new Intl.DateTimeFormat(userLanguage, { weekday: 'long' }).format(new Date());
        const month = new Intl.DateTimeFormat(userLanguage, { month: 'long' }).format(new Date());
        const day = currentDate.getDate();

        const formattedDate = `${dayOfWeek}, ${day}. ${month} ${year} `;
        const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

        return { date: formattedDate, time: formattedTime };
    }

    useEffect(() => {
        const ret = formatDateToDesiredFormat();
        setCurrentTime(ret.time)
        setCurrentDate(ret.date)

        const interval = setInterval(() => {
            const ret = formatDateToDesiredFormat();
            setCurrentTime(ret.time)
            setCurrentDate(ret.date)

        }, 1000);
        return () => clearInterval(interval);



    }, []);

    return (
        <>  
            <div className='z-10 w-full flex flex-col justify-center items-center'>
                <div className='text-[700%] xl:text-[800%] 2xl:text-[1050%] text-white drop-shadow-lg select-none leading-none font-swiss'>
                    {currentTime}
                </div>
                <div className='text-3xl text-white drop-shadow-md select-none mt-6 font-swiss'>
                    {currentDate}
                </div>
                {/* <div className='z-10 font-Outfit text-5xl text-white drop-shadow-sm select-none mt-6'>
                        Good morning, Roshan.
                    </div> */}
            </div>
        </>
    )
}

export default ClockComponent
