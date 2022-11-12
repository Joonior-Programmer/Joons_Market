import type { NextPage } from "next";
import Content from "../../components/content";
import Layout from "../../components/layout";
import Chat from "../../components/chat";
import ChatInput from "../../components/chatInput";

const StreamDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="py-12 px-4  space-y-4">
        <div className="w-full rounded-md shadow-sm aspect-video bg-slate-500" />
        <div className="border-b">
          <Content
            title="IPhone 31"
            price={140}
            content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
              quidem impedit quaerat dolores earum repellat numquam asperiores
              illum, tempore aspernatur eos explicabo hic aliquam cupiditate?
              Saepe vitae nesciunt est amet."
          />
        </div>

        {/* Live Chat */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-3 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div>
                <Chat content="SadsadgafddsfsdfsdafsagdsagsdoHi how much are you selling them for?" />
                <Chat isOpponent content="I want ￦20,000" />
                <Chat content="No That's Not Fair" />
                <Chat isOpponent content="so How Much are you looking for" />
              </div>
            ))}
          </div>
          <ChatInput />
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
