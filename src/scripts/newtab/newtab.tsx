import React, { useEffect, useState } from 'react'
import { CarouselWithContent } from './carousel'
import useApiEndPoints from '../lib/hooks/useApiEndPoints';


const NewTab = () => {

    const { getNewsByDate } = useApiEndPoints();
    const [ todayNews, setTodayNews ] = useState(null);

    useEffect(() => {
        const init = async() => {
            setTodayNews(await getNewsByDate('2023-10-17'));
        }

        init();
    }, []);

    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-col gap-2">
                <CarouselWithContent news={todayNews} />
            </div>
        </div>
    )
}

export default NewTab
