import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

interface parameterForm {
    id?: string,
    isLoginRequired?: boolean,
    isLogoutRequired?: boolean,
}

export default function useUser ({id = "me", isLoginRequired = false, isLogoutRequired = false}:parameterForm) {
    const { data, error } = useSWR(`/api/users/${id}`)
    const router = useRouter()
    
    useEffect(() => {
        if (isLoginRequired && id === "me" && data && data.code !== 0){    
            console.log("enter")        
            router.replace("/enter")
        }
        if (isLogoutRequired && data && data.code === 0){
            console.log("/");
            router.replace("/")
        }
        if (id !== "me" && data && data.code !== 0 || error){
            router.replace("/404")
        }
    }, [data, error])
    return {
      user: data?.data,
      isLoading: !error && !data,
      isError: error
    }
  }