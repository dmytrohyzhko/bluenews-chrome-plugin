const DJANGO_API_ENDPOINT: string = "http://54.85.82.33:8002/api";
// const DJANGO_API_ENDPOINT: string = "http://localhost:8002/api";
// http://54.85.82.33:8002/api/getNewsByDate?date=2023-10-17

const useApiEndPoints = () => {
    const getNewsByDate = async (date: string): Promise<any | null> => {
        try {
            const response = await fetch(`${DJANGO_API_ENDPOINT}/getNewsByDate?date=${date}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    };

    const getWeatherByLocation = async (lat: number, lon: number): Promise<any | null> => {
        try {
            const response = await fetch(`${DJANGO_API_ENDPOINT}/getWeatherByLocation?lati=${lat}&long=${lon}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                const { timezone, currentConditions } = data;
                if(timezone == null) return null;
                return data;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    const getRssFeedForNews = async (): Promise<any | null> => {
        try {
            const response = await fetch(`https://rss.app/feeds/v1.1/_IJwXvnBmvBcylXq7.json`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                return data.items;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    };

    const getRssFeedForSport = async (): Promise<any | null> => {
        try {
            const response = await fetch(`https://rss.app/feeds/v1.1/_w8UIC22YrdUx9qMP.json`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                return data.items;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    };

    return {
        getNewsByDate,
        getWeatherByLocation,
        getRssFeedForNews,
        getRssFeedForSport
    };
};

export default useApiEndPoints;