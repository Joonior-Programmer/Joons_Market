import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import Textarea from "@components/textarea";

const CreateStream: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="my-5">
          <Input label="Title" inputFor="title" kind="text"></Input>
          <Input label="Price" inputFor="price" kind="price"></Input>
        </div>
        <div>
          <Textarea
            label="Description"
            inputFor="description"
            placeholder="Please Write the Description for the Live Stream"
          ></Textarea>
        </div>
        <Button text="Go Live"></Button>
      </div>
    </Layout>
  );
};

export default CreateStream;
