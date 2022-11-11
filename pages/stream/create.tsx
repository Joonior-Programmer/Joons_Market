import type { NextPage } from "next";
import Layout from "../../components/layout";

const CreateStream: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="my-5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mb-3">
            <input
              id="name"
              type="text"
              placeholder="Title"
              className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md show-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Price
          </label>
          <div className="rounded-md shadow-sm relative flex items-center">
            <div className="absolute left-0 pl-3 flex items-center justify-center pointer-events-none">
              <span className="text-gray-500 text-sm">$</span>
            </div>
            <input
              id="price"
              type="text"
              placeholder="0.00"
              className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md show-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            rows={4}
            className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
          />
        </div>
        <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none hover:font-bold transition-all">
          Go Live
        </button>
      </div>
    </Layout>
  );
};

export default CreateStream;
