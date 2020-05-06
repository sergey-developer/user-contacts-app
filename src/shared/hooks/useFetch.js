import {useState, useEffect} from 'react'

// const useFetch = (url, options) => {
//     const [response, setResponse] = useState(null);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             try {
//                 const res = await fetch(url, options);
//                 const json = await res.json();
//                 setResponse(json);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setIsLoading(false)
//             }
//         };
//
//         fetchData();
//     }, [url, options]);
//
//     return [response, error, isLoading];
// };

const useFetch = (request, defaultState) => {
    const [response, setResponse] = useState(defaultState);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await request()
                setResponse(response);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, [request]);

    return {response, error, isLoading, setIsLoading};
};

export default useFetch