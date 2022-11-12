import type { NextPage } from "next";
import Layout from "../../components/layout";
import Link from "next/link";
import FloatingButton from "../../components/floatingButton";

const Stream: NextPage = () => {
  return (
    <Layout title="Live" hasTabBar>
      <div className="pt-10 pb-20 px-4 space-y-4 divide-y-[1px]">
        {/* Item List */}

        {[1, 2, 3, 4, 5].map((_, i) => (
          <Link href="stream/1">
            <div
              className="pt-4 px-4 cursor-pointer hover:px-2 transition-all"
              key={i}
            >
              <div className="w-full rounded-md shadow-sm aspect-video bg-slate-500" />
              <h3 className="mt-1 text-gray-900 font-bold text-2zl">
                Joon&apos;s Video
              </h3>
            </div>
          </Link>
        ))}

        {/* Create Button */}

        <FloatingButton href="stream/create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 hover:h-8 hover:w-8 transition-all"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Stream;
