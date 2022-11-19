import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout title="Authentication Failed" hasTabBar>
      <div className="mt-24 flex items-center flex-col justify-center">
        <p className="font-bold text-2xl">Could not log you in</p>
        <p className="text-lg">Please use same device and browser</p>
        <p>Verification is needed to be done within 3 Minutes</p>
        <Link href="/enter">
          <Button text="Try Again"></Button>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
