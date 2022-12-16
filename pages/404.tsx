import type { NextPage } from "next";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import Button from "@components/button";
import Link from "next/link";

const NotFound: NextPage = () => {
  return (
    <Layout canGoBack title="Not Found" hasTabBar>
      <div className="py-24 text-center text-2xl font-medium">
        <p>Page Not Found</p>
        <Link href="/">
          <Button text="Go back to the Home Page" marginTop={16} width="18" />
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
