import type { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floatingButton";
import Item from "@components/item";

const Home: NextPage = () => {
  return (
    <Layout title="Home" hasTabBar>
      <div className="flex flex-col space-y-5 pt-14 pb-11">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            id={i}
            key={i}
            title="IPhone 14"
            price={100}
            numOfComments={3}
            numOfHearts={4}
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
    </Layout>
  );
};

export default Home;
