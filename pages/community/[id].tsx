import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import Textarea from "@components/textarea";
import Profile from "@components/profile";
import Comment from "@components/comment";
import Link from "next/link";

const CommunityPostDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="pt-10">
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네질문
        </span>

        {/* Profile */}

        <div className="px-4 border-b-[1px]">
          <Profile
            nickname="Joon"
            fontType="medium"
            textSize="sm"
            picSize={12}
            picLocation="center"
          >
            <Link href="/profile/1">
              <p className="text-xs font-medium text-gray-500 cursor-pointer">
                View profile &rarr;
              </p>
            </Link>
          </Profile>
        </div>

        {/* Main */}

        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">Q.</span> What is the
            best mandu restaurant?
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <span className="flex group space-x-2 items-center text-sm hover:font-bold cursor-pointer">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 1</span>
            </span>
            <span className="flex group space-x-2 items-center text-sm hover:font-bold cursor-pointer">
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
              <span>답변 1</span>
            </span>
          </div>
        </div>

        {/* Comments */}

        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className="px-4 py-5 space-y-5 border-b">
            <Comment
              nickname="Polar Bear"
              picSize={8}
              comment="The best mandu restaurant is the one next to my house. Chicken Fries Holiday Supermarket Kims Convenience store gogo"
            >
              <span className="text-xs text-gray-500 block ">2시간 전</span>
            </Comment>
          </div>
        ))}

        {/* Reply */}

        <div className="px-4 my-3">
          <Textarea placeholder="Answer this question!"></Textarea>
          <Button text="Reply" />
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
