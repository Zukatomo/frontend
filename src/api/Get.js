import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

export const Get = (getUrl) => {
    const [data, setData] = useState([]);
    const url = useRef(getUrl);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const refresh = useCallback(async () => {

        setIsError(false);
        //setIsLoading(true);

        try {
            const result = await axios(url.current, { cancelToken: source.token });
            setData(result.data);
            setIsLoading(false);
        } catch (error) {
            if (axios.isCancel(error)) {
            } else {
                setIsError(true);
            }
        }
        setIsLoading(false);
    },[source.token])
    useEffect(() => {
        refresh();
        return () => {
            source.cancel('Operation canceled by conponent unmount.');
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setIsError(false);
    //         setIsLoading(true);

    //         try {
    //             const result = await axios(url, { cancelToken: source.token });
    //             setData(result.data);
    //             setIsLoading(false);
    //         } catch (error) {
    //             if (axios.isCancel(error)) {
    //             } else {
    //                 setIsError(true);
    //             }
    //         }
    //         setIsLoading(false);
    //     };


    //     fetchData();


    //     return () => {
    //         source.cancel('Operation canceled by conponent unmount.');
    //     }
    // }, [url]);

    return [{ data, isLoading, isError }, refresh];
}