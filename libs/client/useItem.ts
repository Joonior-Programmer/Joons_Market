import { ItemResponseType } from "@libs/responseTypes"
import urls from "@libs/urls"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR, { KeyedMutator } from "swr"
interface parameterForm {
    id?: string,
    isLoginRequired?: boolean,
    isLogoutRequired?: boolean,
    idRequired?: boolean,
    mutate?: KeyedMutator<ItemResponseType>
}

export default function useItem ({id = "", isLoginRequired = false, isLogoutRequired = false, idRequired = false}:parameterForm) {
    const { data, error, mutate } = useSWR<ItemResponseType>(!idRequired || id ? urls.ITEMS_URL + `/${id}` : null)
    const router = useRouter()
    useEffect(() => {
        if (idRequired && data && data?.code !== 0){
            router.replace("/404")
        }
    }, [data])

    return {
      item: data?.item,
      items: data?.items,
      isLoading: !error && !data,
      isError: error,
      relatedItems: data?.relatedItems,
      mutate
    }
  }