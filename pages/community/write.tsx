import type { NextPage } from "next";
import Button from "../../components/button";
import Layout from "../../components/layout";
import Input from "../../components/input";
import Textarea from "../../components/textarea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-8">
        <Input
          inputFor="title"
          label="Title"
          kind="text"
          placeholder="Title"
          required
        />
        <Textarea
          placeholder="Ask a question!"
          label="Description"
          inputFor="description"
          required
        ></Textarea>
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
