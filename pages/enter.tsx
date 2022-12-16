import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { createClassName } from "@libs/utils";
import urls from "@libs/urls";
import Input from "@components/input";
import Button from "@components/button";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import Link from "next/link";
import useUser from "@libs/client/useUser";
import Loading from "@components/loading";
import Head from "next/head";

interface EnterForm {
  phone?: number;
  email?: string;
  method: string;
}

interface VerificationForm {
  verificationCode?: string;
}

const Enter: NextPage = () => {
  const { user, isLoading, isError } = useUser({ isLogoutRequired: true });
  const router = useRouter();

  //Handling Enter Form

  const {
    register: registerEnter,
    watch: watchEnter,
    handleSubmit: handleSubmitEnter,
    reset: resetEnter,
    formState: { errors },
  } = useForm<EnterForm>();

  const [enter, { loading: enterLoading, data: enterData, error: enterError }] =
    useMutation(urls.USERS_URL + "/enter", "POST");

  const {
    register: registerVerification,
    watch: watchVerification,
    handleSubmit: handleVerificationSubmit,
  } = useForm<VerificationForm>();

  const [
    verify,
    {
      loading: verificationLoading,
      data: verificationData,
      error: verificationError,
    },
  ] = useMutation(urls.USERS_URL + "/confirm", "POST");

  const [method, setMethod] = useState<"email" | "phone">("email");

  // Reset states when Login method is changed

  const onEmailClick = () => {
    setMethod("email"), resetEnter();
  };
  const onPhoneClick = () => {
    setMethod("phone"), resetEnter();
  };
  const onValidEnter = (enterForm: EnterForm) => {
    enterForm.method = method;
    enter(enterForm);
  };
  const onValidVerification = (verificationForm: VerificationForm) => {
    verify(verificationForm);
  };
  useEffect(() => {
    console.log(verificationData);
    if (verificationData?.code === 0) {
      router.push("/");
    }
  }, [verificationData]);
  useEffect(() => {
    if (verificationError?.code === 2) router?.push("/enter");
  }, [verificationError]);
  console.log(errors);
  return (
    <div className="mt-16 px-4">
      <Head>
        <title>{"Enter | Joon's Market"}</title>
      </Head>
      <h3 className="text-sm font-bold text-center">
        Enter to Joon&apos;s Market
      </h3>
      {verificationLoading || enterLoading || isLoading ? (
        <Loading />
      ) : (
        <div className="mt-8">
          {method === "email" && enterData ? (
            <div className="text-center">
              <p className="text-lg font-medium">
                Please check your email to login
              </p>
              <p className="font-bold text-2xl mt-2">*** Important ***</p>
              <p className="font-medium">
                Please Kindly check your "Spam mail" or "All Email" as well
              </p>
            </div>
          ) : null}
          {method === "phone" && enterData ? (
            <form onSubmit={handleVerificationSubmit(onValidVerification)}>
              <Input
                label="Verification Code"
                inputFor="payload"
                kind="number"
                register={registerVerification}
              />
              {verificationError ? (
                <p className="text-center text-sm font-medium text-red-500">
                  {verificationError.message}
                </p>
              ) : null}
              <Button
                text={verificationLoading ? "Loading" : "Verify"}
                isDisabled={verificationLoading}
              />
            </form>
          ) : null}
          <div
            className={createClassName(
              "flex flex-col items-center",
              enterData ? "hidden" : ""
            )}
          >
            <h5 className="text-sm text-gray-500 font-medium">Enter using:</h5>
            <div className="grid border-b w-full grid-cols-2 gap-16">
              <button
                className={createClassName(
                  "pb-4 border-b-2 font-medium hover:font-bold transition-all",
                  method === "email"
                    ? "border-orange-500 text-orange-400"
                    : "border-transparent text-gray-500"
                )}
                onClick={onEmailClick}
              >
                Email
              </button>
              <button
                className={createClassName(
                  "pb-4 border-b-2 font-medium hover:font-bold transition-all",
                  method === "phone"
                    ? "border-orange-500 text-orange-400"
                    : "border-transparent text-gray-500"
                )}
                onClick={onPhoneClick}
              >
                Phone
              </button>
            </div>
          </div>
          <form
            className="flex flex-col"
            onSubmit={handleSubmitEnter(onValidEnter)}
          >
            <div className="mt-1">
              {method === "email" && !enterData ? (
                <Input
                  inputFor="email"
                  type="email"
                  label="Email"
                  kind="text"
                  register={registerEnter}
                  required
                />
              ) : null}
              {method === "phone" && !enterData ? (
                <>
                  <Input
                    inputFor="phone"
                    label="Phone number"
                    kind="phone"
                    register={registerEnter}
                    disabled
                    required
                  />
                  {errors?.phone ? (
                    <div className="text-center text-red-500 text-sm font-medium">
                      {errors.phone.message}
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>

            {method === "email" && !enterData ? (
              <Button
                text={enterLoading ? "Loading" : "Get login link"}
                isDisabled={enterLoading}
              />
            ) : null}
            {method === "phone" && !enterData ? (
              <Button
                text={enterLoading ? "Loading" : "Get one-time password"}
                // isDisabled={enterLoading}
                isDisabled={true}
              />
            ) : null}
          </form>
          <div className={createClassName("mt-8", enterData ? "hidden" : "")}>
            <div className="relative">
              <div className="absolute w-full border-t border-gray-300" />
              <div className="relative -top-3 text-center">
                <span className="bg-white px-2 text-sm text-gray-500">
                  Or enter with
                </span>
              </div>
            </div>

            {/* Social Login */}

            <div className="grid grid-cols-2 gap-3 mt-2">
              <Link href={urls.USERS_URL + "/twitter/start"}>
                <button className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
              </Link>
              <Link href={urls.USERS_URL + "/github/start"}>
                <button className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {method === "phone" ? (
        <div className="flex justify-center rounded-md">
          <iframe
            className="rounded-md shadow-sm m-3"
            width="341"
            height="606"
            src="https://www.youtube.com/embed/HAn5hKz_-ro"
            title="Phone Login Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}
    </div>
  );
};

export default Enter;
