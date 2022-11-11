import type { NextPage } from "next";
import Input from "../../components/input";
import Layout from "../../components/layout";
import Button from "../../components/button";

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change Image
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <Input
            kind="text"
            inputFor="email"
            label="Email address"
            type="email"
          ></Input>
        </div>
        <div className="space-y-1">
          <Input inputFor="phone" label="Phone number" kind="phone" />
        </div>
        <Button text="Update Profile"></Button>
      </div>
    </Layout>
  );
};

export default EditProfile;
