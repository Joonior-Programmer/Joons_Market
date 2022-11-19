import type { NextPage } from "next";
import Chat from "@components/chat";
import ChatInput from "@components/chatInput";
import Layout from "@components/layout";

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="pt-12 pb-8 px-4 space-y-4 mb-6">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div>
            <Chat content="Hi how much are you selling them for?" />
            <Chat isOpponent content="I want ￦20,000" />
            <Chat content="No That's Not Fair" />
            <Chat isOpponent content="So How Much are you looking for" />
          </div>
        ))}

        <ChatInput />
      </div>
    </Layout>
  );
};

export default ChatDetail;
