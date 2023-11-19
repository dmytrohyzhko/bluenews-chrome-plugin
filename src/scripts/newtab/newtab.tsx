import React, { useEffect, useRef, useState } from 'react'
import { CarouselWithContent } from './carousel'
import useApiEndPoints from '../lib/hooks/useApiEndPoints'
import ClockComponent from './clock'
import VerticalCarousel from './vertical-carousel/verticalCarousel'
import { ReactSVG } from 'react-svg'
import NewsCard from './components/NewsCard'
import NewsMainCard from './components/NewsMainCard'
import { useSpring, animated } from "react-spring";

import './scrollbar.css'
import { debug } from 'console'

const imageCount = 11;

function SearchIcon({ width, height }) {
    return (
        <div>
            <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2776_12448" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                    <rect width="20" height="20" fill="#FFFFFF" />
                </mask>
                <g mask="url(#mask0_2776_12448)">
                    <path d="M16.3333 17.5L11.0833 12.25C10.6667 12.5833 10.1875 12.8472 9.64583 13.0417C9.10417 13.2361 8.52778 13.3333 7.91667 13.3333C6.40278 13.3333 5.12153 12.809 4.07292 11.7604C3.02431 10.7118 2.5 9.43056 2.5 7.91667C2.5 6.40278 3.02431 5.12153 4.07292 4.07292C5.12153 3.02431 6.40278 2.5 7.91667 2.5C9.43056 2.5 10.7118 3.02431 11.7604 4.07292C12.809 5.12153 13.3333 6.40278 13.3333 7.91667C13.3333 8.52778 13.2361 9.10417 13.0417 9.64583C12.8472 10.1875 12.5833 10.6667 12.25 11.0833L17.5 16.3333L16.3333 17.5ZM7.91667 11.6667C8.95833 11.6667 9.84375 11.3021 10.5729 10.5729C11.3021 9.84375 11.6667 8.95833 11.6667 7.91667C11.6667 6.875 11.3021 5.98958 10.5729 5.26042C9.84375 4.53125 8.95833 4.16667 7.91667 4.16667C6.875 4.16667 5.98958 4.53125 5.26042 5.26042C4.53125 5.98958 4.16667 6.875 4.16667 7.91667C4.16667 8.95833 4.53125 9.84375 5.26042 10.5729C5.98958 11.3021 6.875 11.6667 7.91667 11.6667Z" fill="#FFFFFF" />
                </g>
            </svg>
        </div>
    )
}

function GoogleIcon({ width, height }) {
    return (
        <div>
            <svg fill="#fff" height={height} width={width} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 210 210">
                <path d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
	c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
	S0,162.897,0,105z"/>
            </svg>
        </div>
    )
}

const NewTab = () => {
    const { getNewsByDate, getRssFeedForNews, getRssFeedForSport } = useApiEndPoints()
    const { getWeatherByLocation } = useApiEndPoints()


    const [screenLoaded, setScreenLoaded] = useState(false)
    const [todayNews, setTodayNews] = useState(null)
    const [oldNews, setOldNews] = useState(null)
    const [newsList, setNewsList] = useState(null)
    const [entertainmentList, setEntertainmentList] = useState(null)
    const [sportList, setSportList] = useState(null)
    const [searchPrompt, setSearchPrompt] = useState('')
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [bgIndex, setBackgroundIndex] = useState(0);
    const [floatingBtnVisible, setFloatingBtnVisible] = useState(false);

    const mainContent = useRef(null);

    // Weather Variables
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation([position.coords.latitude, position.coords.longitude]);
            });
        }
    }

    async function getWeather() {
        if (!location) return;

        // chrome.storage.local.get(['weather'], async (result) => {
        //     if(result == null) {
        //         await getWeatherByLocation(location[0], location[1])
        //     } else {
        //         setWeather(result);
        //     }
        // })

        const storageValue = localStorage.getItem('weather');
        let _weather = null;
        if (storageValue === null || storageValue === 'null') {
            const response = await getWeatherByLocation(location[0], location[1])
            if (response?.status == false) { }
            else {
                _weather = response;
                _weather.timestamp = Date.now()
                localStorage.setItem('weather', JSON.stringify(_weather));
            }
        } else {
            _weather = JSON.parse(storageValue);
            if (Date.now() - _weather.timestamp >= 1000 * 60 * 60 * 8) {
                const response = await getWeatherByLocation(location[0], location[1])
                if (response?.status == false) { }
                else {
                    _weather = response;
                    _weather.timestamp = Date.now()
                    localStorage.setItem('weather', JSON.stringify(_weather));
                }
            }
        }
        setWeather(_weather);
    }

    useEffect(() => {
        const init = async () => {
            let news = await getRssFeedForNews();
            news = news.map((item : any, index : number) => {
                return {
                    title: item.title,
                    teaser: item.image,
                    link: item.url,
                }
            })

            let sportNews = await getRssFeedForSport();
            sportNews = sportNews.map((item : any, index : number) => {
                return {
                    title: item.title,
                    teaser: item.image,
                    link: item.url,
                }
            })

            news = [ ...news, ...sportNews ]
            setTodayNews(news);
            // setTodayNews(await getNewsByDate(`2023-10-21`))

            if (news.length == 0) {
                const currentDate = new Date();
                const previousDate = currentDate;
                previousDate.setDate(currentDate.getDate() - 1);

                setOldNews(await getNewsByDate(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`));
            }
            setScreenLoaded(true)
        }

        init()
        // getLocation();
    }, [])

    useEffect(() => {
        if (todayNews) {
            setEntertainmentList(todayNews.filter((item: any) => { return item.type === 'Entertainment' }));
            setSportList(todayNews.filter((item: any) => { return item.type === 'Sport' }));
            setNewsList(todayNews.filter((item: any) => { return item.type === 'blue News' }));
        }
    }, [todayNews])

    // Weather Hook
    useEffect(() => {
        const storageValue = localStorage.getItem('background');
        if (storageValue == null || storageValue == 'null') {
            localStorage.setItem('background', JSON.stringify({
                index: bgIndex,
                timestamp: Date.now()
            }));
        } else {
            const { index, timestamp } = JSON.parse(storageValue);
            if (Date.now() - timestamp >= 1000 * 60 * 60 * 8) {
                const curBgIndex = (index + 1) % imageCount;
                setBackgroundIndex(curBgIndex)
                localStorage.setItem('background', JSON.stringify({
                    index: curBgIndex,
                    timestamp: Date.now()
                }));
            }
        }
    }, [])

    useEffect(() => {
        getWeather();
    }, [location])

    const onScrollChanged = async () => {  // Get the scroll value
        // Display the scroll value
        const scrollTop = mainContent.current.scrollTop
        const scrollHeight = mainContent.current.scrollHeight - mainContent.current.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        if( scrollTop > screen.availHeight ) {
            setFloatingBtnVisible(true);
        } else {
            setFloatingBtnVisible(false);
        }

        if (scrollPercentage > 50) {

            if (!oldNews && todayNews && todayNews?.length > 0) {
                const currentDate = new Date();
                const previousDate = currentDate;
                previousDate.setDate(currentDate.getDate() - 1);

                setOldNews(await getNewsByDate(`${previousDate.getFullYear()}-${previousDate.getMonth() + 1}-${previousDate.getDate()}`));
            } else if (oldNews && oldNews?.length > 0) {
                const currentDate = new Date(oldNews[oldNews.length - 1].published_at);
                const previousDate = currentDate;
                previousDate.setDate(currentDate.getDate() - 1);

                if (previousDate.getFullYear() == 2023 && previousDate.getMonth() + 1 == 10 && previousDate.getDate() == 15) return;

                const newOldNews = await getNewsByDate(`${previousDate.getFullYear()}-${previousDate.getMonth() + 1}-${previousDate.getDate()}`)
                setOldNews([...oldNews, ...newOldNews]);
            }
        }
    }

    return (
        <>
            <div className='absolute w-full h-full'>
                <div className='absolute bg-transparent bg-no-repeat bg-cover inset-0 bg-center transition-all duration-300 ease-out'
                    style={{ backgroundImage: `url("/assets/backgrounds/${bgIndex}.jpg")` }}></div>
                <div className='absolute bg-transparent bg-no-repeat bg-cover inset-0 bg-center transition-transform duration-300 ease-out'
                    style={{ backgroundImage: 'url("/assets/app/overlay.png")' }}></div>
                <div className={`z-50 absolute bg-black bg-no-repeat bg-cover inset-0 bg-center transition-all duration-500 ease-out`}
                    style={{ opacity: (screenLoaded ? 0 : 1), visibility: screenLoaded ? "hidden" : "visible", }}></div>
            </div>

            {
                (
                    <div className="z-10 w-full h-screen inset-0 flex flex-col">
                        <div className='z-10 w-full flex flex-row justify-between p-5'>
                            <a href='https://bluenews.ch/' target='_blank'>
                                <img src='/assets/app/SC_blue_News_RGB_neg.png' className='w-48 drop-shadow-lg cursor-pointer' />
                            </a>
                            {/* {
                                (weather) ? (
                                    <div className='flex flex-row items-center drop-shadow-md select-none cursor-pointer mr-3'>
                                        <ReactSVG className='mr-2 w-8' src={`/assets/app/weather_icon/${weather.currentConditions.icon}.svg`} />
                                        <p className='text-2xl font-bold text-white'>{((weather.currentConditions.temp - 32) * 5 / 9).toFixed(1)} C</p>
                                    </div>
                                ) : null
                            } */}
                        </div>
                        {/* <div>
                            <div className='w-full flex flex-row justify-center items-center'>
                                <div className='w-[500px] 2xl:w-[750px] h-[250px] z-10'>
                                    {
                                        // newsList ? (
                                        //     <CarouselWithContent
                                        //         width="100%"
                                        //         height="100%"
                                        //         margin="0 auto"
                                        //         offset={2}
                                        //         showArrows={false}
                                        //         news={newsList} />
                                        // ) : null
                                    }
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-3 justify-center items-center'>
                                {
                                    (entertainmentList || newsList) ? (
                                        <VerticalCarousel news={[...newsList, ...entertainmentList]} />
                                    ) : (
                                        <div></div>
                                    )
                                }
                                <div className='flex flex-col items-center'>
                                    <ClockComponent />
                                    <div className='w-full xl:w-[600px] 2xl:w-[744px] z-30 relative flex flex-row p-[15px_18px_15px_24px] rounded-full items-center bg-transparent mt-[40px] mb-[24px]'>
                                        <div className='z-30'>
                                            <SearchIcon width={30} height={30} />
                                        </div>
                                        <input
                                            value={searchPrompt}
                                            onChange={(e) => { setSearchPrompt(e.target.value); }}
                                            className='z-30 rounded-xl outline-none bg-transparent text-white pl-[16px] text-2xl w-full'
                                            placeholder='Search'
                                            onKeyDown={(e) => {
                                                if (e.keyCode === 13 && searchPrompt.length > 0) {
                                                    window.open(`https://www.google.com/search?q=${searchPrompt}`, '_blank');
                                                    setSearchPrompt('');
                                                }
                                            }}
                                        />
                                        <div className='z-30'>
                                            <GoogleIcon width={20} height={20} />
                                        </div>
                                        <div className='absolute inset-0 z-20 rounded-full drop-shadow-lg' style={{ background: 'hsla(0 0% 100% / 0.2)', backdropFilter: 'blur(50px)' }}></div>
                                    </div>
                                </div>
                                {
                                    sportList ? (
                                        <VerticalCarousel news={sportList} />
                                    ) : (
                                        <div></div>
                                    )
                                }
                        </div>
                        </div> */}
                        <div className='absolute w-full p-1 h-[95%] overflow-hidden pt-24'>
                            <div className='w-full h-full justify-center items-center p-10 overflow-y-scroll' style={{ scrollBehavior: 'smooth' }} onScroll={onScrollChanged} ref={mainContent}>
                                <div className='flex flex-col items-center'>
                                    <ClockComponent />
                                    <div className='w-full xl:w-[600px] 2xl:w-[744px] z-30 relative flex flex-row p-[15px_18px_15px_24px] rounded-full items-center bg-transparent mt-[40px] mb-[40px]'>
                                        <div className='z-30'>
                                            <SearchIcon width={30} height={30} />
                                        </div>
                                        <input
                                            value={searchPrompt}
                                            onChange={(e) => { setSearchPrompt(e.target.value); }}
                                            className='z-30 rounded-xl outline-none bg-transparent text-white pl-[16px] text-2xl w-full placeholder:text-white'
                                            placeholder='Search'
                                            onKeyDown={(e) => {
                                                if (e.keyCode === 13 && searchPrompt.length > 0) {
                                                    window.open(`https://www.google.com/search?q=${searchPrompt}`, '_blank');
                                                    setSearchPrompt('');
                                                }
                                            }}
                                        />
                                        <div className='z-30'>
                                            <GoogleIcon width={20} height={20} />
                                        </div>
                                        <div className='absolute inset-0 z-20 rounded-full drop-shadow-lg' style={{ background: 'hsla(0 0% 100% / 0.2)', backdropFilter: 'blur(50px)' }}></div>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-center items-center'>
                                <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 2md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-center items-center place-items-center'>
                                    <>
                                        {
                                            todayNews?.map((news, index) => {
                                                return <NewsMainCard index={index} value={news} today={true} />
                                            })
                                        }
                                    </>

                                    <>
                                        {
                                            oldNews?.map((news, index) => {
                                                return <NewsMainCard index={index} value={news} />
                                            })
                                        }
                                    </>
                                </div>
                                </div>
                            </div>
                            {
                                floatingBtnVisible ? (
                                    <button
                                        onClick={() => { mainContent.current.scrollTop = 0; }}
                                        className='absolute right-10 bottom-5 w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-500 drop-shadow-lg transition-colors duration-200 p-3'>
                                        <svg fill="#ffffff" version="1.1" viewBox="0 0 330 330">
                                            <path id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
        l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
        C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
                                        </svg>
                                    </button>
                                ) : null
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default NewTab
