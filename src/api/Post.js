import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const Post = (postUrl, handler) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    useEffect(() => {
        return () => {
            source.cancel('Operation canceled by conponent unmount.');
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const post = useCallback(async (postData) => {

        setIsError(false);
        setIsLoading(true);

        try {
            const result = await axios(postUrl, { cancelToken: source.token, method: "POST", data: postData });
            setData(result.data);
            setIsLoading(false);
            await handler();
        } catch (error) {
            if (axios.isCancel(error)) {
            } else {
                setIsError(true);
            }
        }
        setIsLoading(false);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return [{ data, isLoading, isError }, post];
}