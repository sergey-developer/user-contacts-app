// import React, {useEffect, useState} from 'react'

// const useFetch = (fn, defaultState) => {
//   const [data, setData] = useState(defaultState);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   async function fetchUrl() {
//     try {
//       const response = await fn();
//       setData(response);
//     } catch (e) {
//       setError(e)
//     } finally {
//       setLoading(false);
//     }
//   }
//
//   useEffect(() => {
//     fetchUrl();
//   }, []);
//   return {data, loading, error, setData, setLoading};
// }
//
// export default useFetch