import type { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floatingButton";
import usePost from "@libs/client/usePost";
import Post from "@components/post";
import Loading from "@components/loading";

const Community: NextPage = () => {
  const { posts, isLoading, isError } = usePost({});
  return (
    <Layout title="Community" hasTabBar>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative pt-12 pb-14 px-4">
          {posts?.map((post, i) => (
            <Post post={post} key={post.id} />
          ))}

          <FloatingButton href="community/write">
            <svg
              className="h-6 w-6 hover:h-8 hover:w-8 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </FloatingButton>
        </div>
      )}
    </Layout>
  );
};

export default Community;
