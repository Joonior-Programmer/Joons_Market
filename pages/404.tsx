import type { NextPage } from "next";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import Button from "@components/button";
import Link from "next/link";

const NotFound: NextPage = () => {
  const { user, isLoading, isError } = useUser({});
  return (
    <Layout
      canGoBack
      title="Not Found"
      hasTabBar
      userData={{ user, isLoading, isError }}
    >
      <div className="py-24 text-center text-2xl font-medium">
        <p>Page Not Found</p>
        <Link href="/">
          <Button text="Go back to the Home Page" marginTop={16} width="16" />
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
