import type { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floatingButton";
import Link from "next/link";

const Community: NextPage = () => {
  return (
    <Layout title="Community" hasTabBar>
      <div className="pt-12 pb-14 px-4">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <Link href="community/1">
            <div key={i} className="flex flex-col items-start py-2">
              <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                동네질문
              </span>
              <span className="mt-2 text-gray-700 cursor-pointer">
                <span className="text-orange-500 font-medium cursor-pointer">
                  Q.
                </span>{" "}
                What is the best sushi restaurant?
              </span>
              <div className="mt-2 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
                <span>Joon</span>
                <span>18시간 전</span>
              </div>
              <div className="flex space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b w-full">
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
          </Link>
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
    </Layout>
  );
};

export default Community;
