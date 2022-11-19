import type { NextPage } from "next";
import Layout from "@components/layout";
import Item from "@components/item";

const Bought: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="flex flex-col space-y-5 pt-14 pb-11">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            id={i}
            key={i}
            title="IPhone 14"
            price={1.1}
            numOfComments={3}
            numOfHearts={4}
          ></Item>
        ))}
      </div>
    </Layout>
  );
};

export default Bought;
