const DJANGO_API_ENDPOINT: string = "http://54.85.82.33:8002/api";
// const DJANGO_API_ENDPOINT: string = "http://localhost:8001/api";
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

    return {
        getNewsByDate,
    };
};

export default useApiEndPoints;