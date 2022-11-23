import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

export default function useUser (id:string = "me", isRequired:boolean = false) {
    const { data, error } = useSWR(`/api/users/${id}`)
    const router = useRouter()
    
    useEffect(() => {
        if (isRequired && data && data.code !== 0){
            router.replace("/enter")
        }
    }, [data])
    
    return {
      user: data?.data,
      isLoading: !error && !data,
      isError: error
    }
  }