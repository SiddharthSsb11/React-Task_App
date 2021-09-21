import {
    useState
} from 'react';

const useHttp = (requestConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async () => {//renaming it to go with both get and post reqs
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers: {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null 
              });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data)
            console.log(data);
            //console.log(loadedTasks);
            
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return {
        isLoading,
        error: error, //error, shrt-hand
        sendRequest
    };
}

export default useHttp