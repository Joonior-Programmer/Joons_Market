import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

interface parameterForm {
    id?: string,
    isLoginRequired?: boolean,
    isLogoutRequired?: boolean
}

export default function useUser ({id = "me", isLoginRequired = false, isLogoutRequired = false}:parameterForm) {
    const { data, error } = useSWR(`/api/users/${id}`)
    const router = useRouter()
    useEffect(() => {
        if (isLoginRequired && data?.code !== 0){
            router.replace("/enter")
        }
        if (isLogoutRequired && data?.code === 0){
            router.replace("/")
        }
    }, [data])

    return {
      user: data?.data,
      isLoading: !error && !data,
      isError: error
    }
  }