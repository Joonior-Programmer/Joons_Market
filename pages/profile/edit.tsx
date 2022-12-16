import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import Button from "@components/button";
import Profile from "@components/profile";
import { useForm } from "react-hook-form";
import useUser from "@libs/client/useUser";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import urls from "@libs/urls";
import { useRouter } from "next/router";
import axios from "axios";

interface ProfileEditForm {
  nickname: string;
  picture?: string;
  phone?: string;
  email?: string;
  avatar?: FileList;
}

interface uploadImageResponseType {
  code: number;
  uploadInfo: {
    id: string;
    uploadURL: string;
  };
}

const EditProfile: NextPage = () => {
  const router = useRouter();
  const { user, isLoading, isError } = useUser({ isLoginRequired: true });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<ProfileEditForm>();

  const [edit, { loading, data, error }] = useMutation(
    urls.USERS_URL + `/me/edit`,
    "PUT"
  );
  const [imageLoading, setImageLoading] = useState(false);
  useEffect(() => {
    if (user) setValue("nickname", user.nickname);
  }, [user]);

  const onValid = async (profileEditForm: ProfileEditForm) => {
    if (getValues("nickname") === "" || data) return;
    if (preview && pictureFile && pictureFile.length > 0) {
      setImageLoading(true);
      const {
        // Getting Direct Upload URL
        data: {
          uploadInfo: { id, uploadURL },
        },
      } = await axios.post<uploadImageResponseType, any>(
        urls.BASE_URL + "/imageUpload",
        {
          preview,
        }
      );

      // Create a Form for Uploading
      const form = new FormData();
      form.append("file", pictureFile[0], user.id + "/profile");

      // Direct Upload
      const response = await fetch(uploadURL, {
        method: "POST",
        body: form,
      });
      edit({ ...profileEditForm, avatar: id });
      setImageLoading(false);
    } else {
      edit(profileEditForm);
    }
  };

  useEffect(() => {
    if ((data && data.code !== 0) || error)
      setError("nickname", { message: error.message });
    if (data && data.code === 0) router.push("/profile/me");
  }, [data, error, setError, router]);

  const [preview, setPreview] = useState("");
  const pictureFile = watch("picture");

  useEffect(() => {
    if (pictureFile && pictureFile.length > 0) {
      const file = new Blob([pictureFile[0]], { type: "text/plain" });
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  }, [pictureFile]);

  return (
    <Layout canGoBack title="Edit Profile">
      <div className="py-14 px-4 space-y-4">
        <form onSubmit={handleSubmit(onValid)}>
          <div className="flex items-center space-x-3">
            <Profile picSize={14} avatar={user?.avatar} preview={preview}>
              <label
                htmlFor="picture"
                className="cursor-pointer py-2 px-3 border
              ml-4 border-gray-300 rounded-md shadow-sm text-sm hover:font-medium
              transition-all
              hover:bg-gray-400
              hover:text-white 
              hover:text-base
              focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
              >
                Change Image
                <input
                  id="picture"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  {...register("picture")}
                />
              </label>
            </Profile>
          </div>

          <Input
            kind="text"
            inputFor="nickname"
            label="Nickname"
            type="text"
            register={register}
            required
          />
          {/* {user?.email ? (
            <div className="space-y-1">
              <Input
                kind="text"
                inputFor="email"
                label="Email address"
                type="email"
                register={register}
                required
              />
            </div>
          ) : null}
          {user?.phone ? (
            <div className="space-y-1">
              <Input
                inputFor="phone"
                label="Phone number"
                kind="phone"
                register={register}
                required
              />
            </div>
          ) : null} */}
          <p className="text-center font-medium text-red-500">
            {error?.message}
          </p>
          <Button
            text={loading || imageLoading ? "Loading..." : "Update Profile"}
            isDisabled={imageLoading ? imageLoading : loading}
          />
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
