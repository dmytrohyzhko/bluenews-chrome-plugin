import React, { useEffect, useState } from 'react'
import { CarouselWithContent } from './carousel'
import useApiEndPoints from '../lib/hooks/useApiEndPoints'

const NewTab = () => {
    const { getNewsByDate } = useApiEndPoints()
    const [todayNews, setTodayNews] = useState(null)

    useEffect(() => {
        const init = async () => {
            setTodayNews(await getNewsByDate('2023-10-17'))
        }

        init()
    }, [])

    return (
        <>
            <div className='absolute w-full h-full'>
                <div className='absolute bg-transparent bg-no-repeat bg-cover inset-0 bg-center'
                style={{backgroundImage: 'url("assets/backgrounds/1.jpg")'}}></div>
                <div className='absolute bg-transparent bg-no-repeat bg-cover inset-0 bg-center'
                style={{backgroundImage: 'url("assets/app/overlay.png")'}}></div>
            </div>
            {/* <div className="w-full flex justify-center items-center">
                <div className="flex flex-col gap-2">
                    <CarouselWithContent news={todayNews} />
                </div>
            </div> */}
        </>
    )
}

export default NewTab
