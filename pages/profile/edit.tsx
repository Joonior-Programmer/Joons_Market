import type { NextPage } from "next";
import Input from "@components/input";
import Layout from "@components/layout";
import Button from "@components/button";
import Profile from "@components/profile";
import { useForm } from "react-hook-form";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";
interface ProfileEditForm {
  nickname: string;
  picture?: string;
  phone?: string;
  email?: string;
}

const EditProfile: NextPage = () => {
  const { user, isLoading, isError } = useUser();

  const { register, watch, handleSubmit, reset } = useForm<ProfileEditForm>({
    defaultValues: {
      nickname: user?.nickname,
      email: user?.email && undefined,
      phone: user?.phone && undefined,
    },
  });
  // console.log(user?.nickname);

  register("nickname", { value: "hi" });
  console.log(watch());
  return (
    <Layout canGoBack>
      <div className="py-14 px-4 space-y-4">
        <form>
          <div className="flex items-center space-x-3">
            <Profile picSize={14}>
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
          />
          {user?.email ? (
            <div className="space-y-1">
              <Input
                kind="text"
                inputFor="email"
                label="Email address"
                type="email"
                register={register}
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
              />
            </div>
          ) : null}

          <Button text="Update Profile"></Button>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
