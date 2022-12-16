import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import urls from "@libs/urls";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "@libs/client/useUser";

interface CreateStreamForm {
  title: string;
  price: number;
  description: string;
}

const CreateStream: NextPage = () => {
  const router = useRouter();
  const { user, isLoading, isError } = useUser({ isLoginRequired: true });
  const { register, watch, handleSubmit } = useForm<CreateStreamForm>();
  const [createStream, { data, loading, error }] = useMutation(
    urls.STREAM_URL + "/create",
    "POST"
  );
  const onValid = (createStreamForm: CreateStreamForm) => {
    if (!loading && !data) createStream(createStreamForm);
  };

  useEffect(() => {
    if (data && data?.code === 0) router.push("/stream");
  }, [data, router]);
  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <form onSubmit={handleSubmit(onValid)}>
          <div className="my-5">
            <Input
              label="Title"
              register={register}
              inputFor="title"
              kind="text"
              required
            ></Input>
            <Input
              label="Price"
              register={register}
              inputFor="price"
              kind="price"
              required
            ></Input>
          </div>
          <div>
            <Textarea
              label="Description"
              inputFor="description"
              placeholder="Please Write the Description for the Live Stream"
              register={register("description", { required: true })}
              required
            ></Textarea>
          </div>
          <Button
            text={loading ? "Loading..." : "Go Live"}
            isDisabled={loading}
          ></Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateStream;
