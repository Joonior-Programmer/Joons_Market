import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import Input from "@components/input";
import Textarea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import urls from "@libs/urls";
import { useForm } from "react-hook-form";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface WriteForm {
  title: string;
  description: string;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { user, isLoading, isError } = useUser({ isLoginRequired: true });
  const [write, { data, loading, error }] = useMutation(
    urls.COMMUNITY_URL + "/write",
    "POST"
  );
  const { register, watch, handleSubmit } = useForm<WriteForm>();
  const onValid = (writeForm: WriteForm) => {
    if (!loading && !data) write(writeForm);
  };
  useEffect(() => {
    if (data?.code === 0) router.push(`/community/${data.post.id}`);
  }, [data, router]);

  return (
    <Layout canGoBack>
      <form className="px-4 py-8" onSubmit={handleSubmit(onValid)}>
        <Input
          inputFor="title"
          label="Title"
          kind="text"
          placeholder="Title"
          required
          register={register}
        />
        <Textarea
          placeholder="Ask a question!"
          label="Description"
          inputFor="description"
          required
          register={register("description")}
        ></Textarea>
        <Button text={loading ? "Loading..." : "Submit"} isDisabled={loading} />
      </form>
    </Layout>
  );
};

export default Write;
