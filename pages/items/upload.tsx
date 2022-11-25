import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import urls from "@libs/urls";
import { useEffect } from "react";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";

interface UploadForm {
  picture: string;
  title: string;
  price: number;
  description: string;
}

const Upload: NextPage = () => {
  const { user, isLoading, isError } = useUser({});
  const router = useRouter();
  const [upload, { data, loading, error }] = useMutation(
    urls.ITEMS_URL + "/upload",
    "POST"
  );
  console.log(urls.ITEMS_URL + "/upload");
  const { register, watch, handleSubmit } = useForm<UploadForm>();
  const onValid = (uploadForm: UploadForm) => {
    console.log(uploadForm);
    upload(uploadForm);
  };
  useEffect(() => {
    if (data && data.code === 0 && data.item) {
      router.push(`/items/${data.item.id}`);
    }
  }, [data]);
  return (
    <Layout canGoBack userData={{ user, isLoading, isError }}>
      <div className="px-4 pt-14 h-full">
        <form onSubmit={handleSubmit(onValid)}>
          {/* Picture Input */}
          <div>
            <label className="w-full group cursor-pointer text-gray-600 hover:text-orange-500 hover:border-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
              <svg
                className="h-12 w-12 group-hover:h-14 group-hover:w-14 transition-all"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input className="hidden" type="file" {...register("picture")} />
            </label>
          </div>

          {/* Title, Price, Descipription, Upload Button */}

          <div className="my-5">
            <Input
              label="Title"
              kind="text"
              inputFor="title"
              register={register}
            />
            <Input
              kind="price"
              label="Price"
              inputFor="price"
              register={register}
            />
          </div>
          <div>
            <Textarea
              placeholder="Please Write the Description for the Product"
              inputFor="description"
              label="Description"
              register={register("description")}
            ></Textarea>
          </div>
          <Button text="Upload product" />
        </form>
      </div>
    </Layout>
  );
};

export default Upload;
