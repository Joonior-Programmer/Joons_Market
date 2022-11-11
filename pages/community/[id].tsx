import type { NextPage } from "next";
import Layout from "../../components/layout";

const CommunityPostDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네질문
        </span>
        <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">Joon</p>
            <p className="text-xs font-medium text-gray-500">
              View profile &rarr;
            </p>
          </div>
        </div>
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
          <div key={i} className="px-4 my-5 space-y-5">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full cursor-pointer" />
              <div>
                <span className="text-sm block font-medium text-gray-700 cursor-pointer">
                  Polar Bear
                </span>
                <span className="text-xs text-gray-500 block ">2시간 전</span>
                <p className="text-gray-700 mt-2">
                  The best mandu restaurant is the one next to my house.
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="px-4 mb-4">
          <textarea
            className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
            rows={4}
            placeholder="Answer this question!"
          />
          <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none hover:font-bold transition-all">
            Reply
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
