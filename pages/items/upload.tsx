import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import Textarea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import urls from "@libs/urls";
import { useEffect, useState } from "react";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { createRandomString } from "@libs/utils";

interface UploadForm {
  picture: FileList;
  title: string;
  price: number;
  description: string;
}

const Upload: NextPage = () => {
  const { user, isLoading, isError } = useUser({ isLoginRequired: true });
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(false);
  const [upload, { data, loading, error }] = useMutation(
    urls.ITEMS_URL + "/upload",
    "POST"
  );

  const { register, watch, handleSubmit } = useForm<UploadForm>();
  const onValid = async (uploadForm: UploadForm) => {
    if (loading || data || imageLoading) return;
    if (preview && pictureFile && pictureFile.length > 0) {
      setImageLoading(true);
      const {
        // Getting Direct Upload URL
        data: {
          uploadInfo: { id, uploadURL },
        },
      } = await axios.post(urls.BASE_URL + "/imageUpload", {
        preview,
      });
      console.log(id, uploadURL);
      // Create a Form for Uploading
      const form = new FormData();
      form.append(
        "file",
        pictureFile[0],
        `${user.id}/items/${createRandomString(1)}`
      );

      // Direct Upload
      const response = await fetch(uploadURL, {
        method: "POST",
        body: form,
      });
      console.log(response);
      upload({ ...uploadForm, picture: id });
      setImageLoading(false);
    } else {
      console.log("here");
      upload({ ...uploadForm, picture: null });
    }
  };
  useEffect(() => {
    if (data && data.code === 0 && data.item) {
      router.push(`/items/${data.item.id}`);
    }
  }, [data]);

  const pictureFile = watch("picture");
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (pictureFile && pictureFile.length > 0) {
      const file = new Blob([pictureFile[0]], { type: "text/plain" });
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  }, [pictureFile]);
  console.log(pictureFile);
  return (
    <Layout canGoBack>
      <div className="px-4 pt-14 h-full mb-4">
        <form onSubmit={handleSubmit(onValid)}>
          {preview ? (
            <div className="relative h-80 mb-4">
              <Image
                fill
                quality={100}
                src={preview}
                alt="Preview"
                className="rounded-md"
              />
            </div>
          ) : null}

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
              <input
                className="hidden"
                type="file"
                {...register("picture")}
                accept="image/*"
              />
            </label>
          </div>

          {/* Title, Price, Descipription, Upload Button */}

          <div className="my-5">
            <Input
              label="Title"
              kind="text"
              inputFor="title"
              register={register}
              required
            />
            <Input
              kind="price"
              label="Price"
              inputFor="price"
              register={register}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Please Write the Description for the Product"
              inputFor="description"
              label="Description"
              register={register("description", { required: true })}
              required
            ></Textarea>
          </div>
          <Button
            text={imageLoading || loading ? "Loading..." : "Upload Product"}
            isDisabled={imageLoading ? imageLoading : loading}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Upload;
