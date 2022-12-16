import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import Textarea from "@components/textarea";
import Profile from "@components/profile";
import Comment from "@components/comment";
import Link from "next/link";
import useUser from "@libs/client/useUser";
import usePost from "@libs/client/usePost";
import { useRouter } from "next/router";
import axios from "axios";
import urls from "@libs/urls";
import { createClassName, createTimeFormat } from "@libs/utils";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { CommentWithUser } from "@libs/modifiedTypes";
import { useEffect } from "react";
import Loading from "@components/loading";

interface CommentForm {
  comment: string;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const { user, isLoading, isError } = useUser({});
  const {
    post,
    isLiked,
    mutate,
    isLoading: postLoading,
  } = usePost({
    id: id?.toString(),
    idRequired: true,
  });
  const { register, handleSubmit, reset, getValues } = useForm<CommentForm>();
  const [
    createComment,
    { data: commentData, loading: commentLoading, error: commentError },
  ] = useMutation(
    urls.COMMUNITY_URL + `/${router?.query?.id}/comment/create`,
    "POST"
  );
  const onFavouriteClick = () => {
    if (!user) return router.push("/enter");
    if (!post) return;
    const newFavourite = JSON.parse(JSON.stringify(post?.favourites)); // Deepcopy of favourite
    post && post?.favourites?.length > 0
      ? newFavourite.pop()
      : newFavourite.push({});
    mutate(
      {
        code: 0,
        post: {
          ...post,
          _count: {
            favourites:
              post && post?.favourites?.length > 0
                ? post?._count?.favourites! - 1
                : post?._count?.favourites! + 1,
            comments: post?._count.comments,
          },
          favourites: newFavourite,
        },
      },
      false
    );

    axios.post(urls.COMMUNITY_URL + `/${id}/favourite`);
  };
  const onCreateComment = (commentForm: CommentForm) => {
    if (!post || !getValues("comment").trim()) return;
    createComment(commentForm);
  };

  const loginValidator = () => {
    if (!user) router.push("/enter");
  };

  useEffect(() => {
    reset();
    mutate();
  }, [commentData, mutate]);
  return (
    <Layout canGoBack>
      {isLoading || postLoading ? (
        <Loading />
      ) : (
        <div className="pt-10">
          <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Question
          </span>

          {/* Profile */}

          <div className="px-4 border-b-[1px]">
            <Profile
              nickname={post?.user?.nickname}
              fontType="medium"
              textSize="sm"
              picSize={12}
              picLocation="center"
              avatar={post?.user?.avatar}
            >
              <Link href={`/profile/${post?.userId}`}>
                <p className="text-xs font-medium text-gray-500 cursor-pointer">
                  View profile &rarr;
                </p>
              </Link>
            </Profile>
          </div>

          {/* Main */}

          <div>
            <div className="mt-2 px-4 text-gray-700">
              <span className="text-orange-500 text-2xl font-medium">Q.</span>{" "}
              <span className="text-2xl font-normal">{post?.title}</span>
              <p className="mt-2 text-lg">{post?.description}</p>
            </div>
            <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
              <span
                className="flex group space-x-2 items-center text-sm hover:font-bold cursor-pointer"
                onClick={onFavouriteClick}
              >
                <svg
                  className={createClassName(
                    `w-4 h-4 group-hover:h-5 group-hover:w-5 transition-all`,
                    post && post?.favourites?.length > 0
                      ? "text-orange-500"
                      : "",
                    !user ? "disabled:" : ""
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span
                  className={createClassName(
                    post && post?.favourites?.length > 0
                      ? "text-orange-500"
                      : ""
                  )}
                >
                  {post?._count?.favourites! > 2
                    ? `${post?._count?.favourites} Likes`
                    : `${post?._count?.favourites} Like`}
                </span>
              </span>
              <span className="flex group space-x-2 items-center text-sm hover:font-bold cursor-default">
                <svg
                  className="w-4 h-4 group-hover:h-5 group-hover:w-5 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span>
                  {post?._count?.comments! > 2
                    ? `${post?._count?.comments} Comments`
                    : `${post?._count?.comments} Comment`}
                </span>
              </span>
            </div>
          </div>

          {/* Comments */}

          {post?.comments.map((comment, i) => (
            <div key={i} className="px-4 py-3 space-y-5 border-b">
              <Comment
                nickname={comment.user.nickname}
                picSize={8}
                comment={comment.comment}
                avatar={comment.user.avatar}
                createdAt={comment.createdAt}
              >
                {/* <span className="text-xs text-gray-500 block ">2간 전</span> */}
              </Comment>
            </div>
          ))}

          {/* Reply */}

          <form
            className="px-4 my-3"
            onClick={loginValidator}
            onKeyDown={loginValidator}
            onSubmit={handleSubmit(onCreateComment)}
          >
            <Textarea
              inputFor="comment"
              placeholder="Answer this question!"
              register={register("comment")}
            ></Textarea>
            <Button
              text={commentLoading ? "Loading" : "Reply"}
              isDisabled={commentLoading}
            />
          </form>
        </div>
      )}
    </Layout>
  );
};

export default CommunityPostDetail;
