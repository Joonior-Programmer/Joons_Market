import { PostResponseType } from "@libs/responseTypes";
import urls from "@libs/urls";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { KeyedMutator } from "swr";
interface parameterForm {
  id?: string;
  isLoginRequired?: boolean;
  isLogoutRequired?: boolean;
  idRequired?: boolean;
  mutate?: KeyedMutator<PostResponseType>;
}

export default function usePost({
  id = "",
  isLoginRequired = false,
  isLogoutRequired = false,
  idRequired = false,
}: parameterForm) {
  const { data, error, mutate } = useSWR<PostResponseType>(
    !idRequired || id ? urls.COMMUNITY_URL + `/${id}` : null
  );
  const router = useRouter();
  useEffect(() => {
    if (data && data?.code !== 0) {
      router.replace("/404");
    }
  }, [data]);

  return {
    post: data?.post,
    posts: data?.posts,
    isLiked: data?.isLiked,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
