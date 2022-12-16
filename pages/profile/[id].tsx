import type { NextPage } from "next";
import Layout from "@components/layout";
import Icon from "@components/icon";
import Comment from "@components/comment";
import Profile from "@components/profile";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { ReviewResponseType } from "@libs/responseTypes";
import useSWR from "swr";
import urls from "@libs/urls";
import { createClassName } from "@libs/utils";
import Loading from "@components/loading";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const { user, isLoading, isError } = useUser({
    id: id as string,
  });
  let {
    user: me,
    isLoading: meLoading,
    isError: meError,
  } = useUser({ isLoginRequired: id && id === "me" ? true : false });
  const { data, error, mutate } = useSWR<ReviewResponseType>(
    id ? urls.USERS_URL + `/${id}/review` : null
  );
  useEffect(() => {
    if (id === "me") mutate();
  }, [id]);
  return (
    <Layout title="Profile" canGoBack hasTabBar>
      {meLoading || isLoading || !data ? (
        <Loading />
      ) : (
        <div className="py-14 px-4">
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <Profile picSize={12} avatar={user?.avatar}>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900 text-lg">
                  {user?.nickname}
                </span>
                {user?.id == me?.id ? (
                  <Link href="/profile/edit">
                    <span className="cursor-pointer text-sm text-gray-700">
                      Edit profile &rarr;
                    </span>
                  </Link>
                ) : null}
              </div>
            </Profile>
          </div>

          {/* Icons */}

          <div className="mt-10 flex justify-around">
            <Icon
              href={`/profile/record?kind=Sell&id=${user?.id}`}
              kind="orangeIcon"
              text="Sell"
            >
              <svg
                className="w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </Icon>
            <Icon
              href={`/profile/record?kind=Bought&id=${user?.id}`}
              kind="orangeIcon"
              text="Bought"
            >
              <svg
                className="w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </Icon>
            <Icon
              href={`/profile/record?kind=Favourite&id=${user?.id}`}
              kind="orangeIcon"
              text="Favourite"
            >
              <svg
                className="w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </Icon>
          </div>

          {/* Review */}
          <div>
            <div className="divide-y-[1px] border-t-[1px] mt-4">
              {data?.reviews.map((review) => (
                <div className="p-4" key={review.id}>
                  <Comment
                    picSize={12}
                    nickname={review.reviewBy.nickname}
                    comment={review.review}
                    avatar={review.reviewBy?.avatar}
                    createdAt={review.createdAt}
                    nameSize="base"
                  >
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <svg
                          key={value}
                          className={createClassName(
                            "h-5 w-5 -ml-1",
                            review.star >= value
                              ? "text-yellow-400"
                              : "text-gray-400"
                          )}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </Comment>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfilePage;
