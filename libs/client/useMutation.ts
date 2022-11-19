import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";


export default function useMutation(url:string, method:string): [(data?:any) => void, {
    loading:boolean,
    data: undefined|any,
    error: undefined|any,
}]{
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<undefined|AxiosResponse>(undefined);
    const [error, setError] = useState<undefined|AxiosError>(undefined);
    async function mutation(data?:any){
        console.log(url, data)
        try {
            setLoading(true);
            const response = await axios.post(url, {...data});
            setData(response);
            setLoading(false);
         } catch (e:any) {
            setError(e)
            console.log(error)
         }
    }
    return [mutation , {loading, data, error}]
}