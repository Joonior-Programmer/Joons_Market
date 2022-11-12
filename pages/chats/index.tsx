import type { NextPage } from "next";
import Layout from "../../components/layout";
import Link from "next/link";
const Chats: NextPage = () => {
  return (
    <Layout title="Chat" hasTabBar>
      <div className="pt-10 pb-16 divide-y-[1px]">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Link href="chats/1">
            <div
              key={i}
              className="flex group px-4 cursor-pointer py-3 items-center space-x-3"
            >
              <div className="w-12 h-12 rounded-full bg-slate-300 group-hover:w-14 group-hover:h-14 transition-all" />
              <div className="group-hover:font-bold transition-all">
                <p className="text-gray-700">Steve Jebs</p>
                <p className="text-sm text-gray-500">
                  See you tomorrow in the corner at 2pm!
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
