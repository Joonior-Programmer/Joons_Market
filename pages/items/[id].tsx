import type { NextPage } from "next";
import Layout from "@components/layout";
import Profile from "@components/profile";
import Link from "next/link";
import Button from "@components/button";
import Content from "@components/content";
import { useRouter } from "next/router";
import useItem from "@libs/client/useItem";
import useUser from "@libs/client/useUser";

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { item, isLoading, isError } = useItem({
    id: router?.query?.id as string,
    idRequired: true,
  });
  const { user: me, isLoading: meLoading, isError: meError } = useUser({});
  console.log(item, me);

  return (
    <Layout
      canGoBack
      userData={{ user: me, isLoading: meLoading, isError: meError }}
    >
      <div className="px-4 pt-14 pb-4">
        <div className="mb-8">
          {/* Picture */}

          <div className="h-96 bg-orange-300" />

          {/* Profile */}

          <div className="border-b-[1px]">
            <Profile
              nickname={item?.user?.nickname}
              fontType="medium"
              picSize={12}
              picLocation="center"
              textSize="sm"
            >
              <Link
                href={`/profile/${
                  me?.id === item?.user?.id ? "" : item?.user?.id
                }`}
              >
                <p className="cursor-pointer text-xs font-medium text-gray-500">
                  View profile &rarr;
                </p>
              </Link>
            </Profile>
          </div>

          {/* Content */}

          <div className="mt-5">
            <Content
              title={item?.title!}
              price={item?.price!}
              content={item?.description!}
            />
          </div>
        </div>

        {/* Talk to Seller and Favourite Buttons */}

        <div className="flex items-center justify-between space-x-2">
          <Button
            text={
              me?.id === item?.user?.id ? "It's your Item" : "Talk to seller"
            }
            marginTop={0}
            textSize="base"
            isDisabled={me?.id === item?.user?.id}
          ></Button>
          <button className="p-2 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
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

        {/* Similar Item Recommendation */}

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4].map((_, i) => (
              <Link href="1">
                <div key={i} className="cursor-pointer">
                  <div className="h-56 w-full mb-4 bg-orange-800" />
                  <h3 className="font-medium text-gray-700 -mb-1">
                    Galaxy S60
                  </h3>
                  <p className="text-sm font-medium text-gray-900">$6</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
