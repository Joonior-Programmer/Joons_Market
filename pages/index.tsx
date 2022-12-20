import type { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floatingButton";
import Item from "@components/item";

import useItem from "@libs/client/useItem";
import Loading from "@components/loading";

const Home: NextPage = () => {
  const { items, isLoading: itemLoading, isError: itemError } = useItem({});
  let test;
  return (
    <Layout title="Home" hasTabBar>
      {itemLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col space-y-5 pt-14 pb-11 min-h-screen">
          <Item
            id={"demo"}
            title="Item Purchase Demo Plz Watch it!!!"
            price={0}
            numOfHearts={99}
            isLiked={true}
            createdAt={new Date(1671186916150)}
            picture={"7d7d829d-146d-4f87-dbd7-138e56d3cc00"}
          />
          {items?.map((item) => (
            <Item
              id={item.id}
              key={item.id}
              title={item.title}
              price={item.price}
              numOfHearts={item._count.favourites}
              isLiked={item.favourites.length > 0}
              createdAt={item.createdAt}
              picture={item.picture}
              isSoldOut={item.isSoldOut}
            ></Item>
          ))}
          <FloatingButton href="/items/upload">
            <svg
              className="h-6 w-6 hover:h-8 hover:w-8 transition-all"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </FloatingButton>
        </div>
      )}
    </Layout>
  );
};

export default Home;
