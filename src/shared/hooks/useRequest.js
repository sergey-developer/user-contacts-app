import {useState, useCallback} from 'react'

const useRequest = (fn, defaultState) => {
  const [response, setResponse] = useState(defaultState)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fn()
      setResponse(response)
    } catch (exception) {
      setError(exception)
    } finally {
      setLoading(false)
    }
  }, [fn])

  return {request, response, isLoading, error, setResponse, setLoading}
}

// useEffect(() => {
//     let mounted = true;
//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const response = await request()
//             if (mounted) setResponse(response);
//         } catch (error) {
//             setError(error);
//         } finally {
//             setLoading(false)
//         }
//     };
//
//     fetchData();
//     return () => {
//         mounted = false;
//     }
// }, [request]);

export default useRequest