import type { NextPage } from "next";
import Layout from "../../components/layout";

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="pt-12 pb-8 px-4 space-y-4 mb-6">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div>
            <div className="flex items-start space-x-2 py-2">
              <div className="rounded-full w-8 h-8 bg-orange-300" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p>Hi how much are you selling them for?</p>
              </div>
            </div>
            <div className="my-2 w-1/2 text-sm text-gray-700 p-2 ml-10 border border-gray-300 rounded-md">
              <p>WOWWOW</p>
            </div>
            <div className="my-2 flex flex-row-reverse items-end space-x-2 space-x-reverse">
              <div className="rounded-full w-8 h-8 bg-purple-300" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p>I want ￦20,000</p>
              </div>
            </div>
            <div className="my-2 flex items-start space-x-2">
              <div className="rounded-full w-8 h-8 bg-orange-300" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p>미쳤어</p>
              </div>
            </div>
          </div>
        ))}

        <div className="fixed w-full mx-auto max-w-md bottom-2 inset-x-0">
          <div className="flex relative items-center">
            <input
              type="text"
              className="pr-12 shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex items-center bg-orange-500 rounded-full px-3 text-sm text-white hover:bg-orange-600 hover:font-bold transition-all cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
