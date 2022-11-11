import type { NextPage } from "next";
import Layout from "../../components/layout";

const ItemDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="mb-8">
          <div className="h-96 bg-orange-300" />
          <div className="flex py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 cursor-pointer rounded-full bg-orange-700" />
            <div className="cursor-pointer">
              <p className="text-sm font-medium text-gray-700">Steve Jebs</p>
              <p className="text-xs font-medium text-gray-500">
                View profile &rarr;
              </p>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">IPhone 31</h1>
            <p className="text-3xl mt-3 text-gray-900">$140</p>
            <p className="text-base my-6 text-gray-700">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
              quidem impedit quaerat dolores earum repellat numquam asperiores
              illum, tempore aspernatur eos explicabo hic aliquam cupiditate?
              Saepe vitae nesciunt est amet.
            </p>
            <div className="flex items-center justify-between space-x-2">
              <button className="flex-1 font-md transition-all hover:bg-orange-600 hover:font-bold bg-orange-500 text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Talk to seller
              </button>
              <button className="p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="cursor-pointer">
                <div className="h-56 w-full mb-4 bg-orange-800" />
                <h3 className="text-gray-700 -mb-1">sGalaxy S60</h3>
                <p className="text-sm font-medium text-gray-900">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
