import type { NextPage } from "next";
import Layout from "@components/layout";
import Profile from "@components/profile";
import Link from "next/link";
import Button from "@components/button";
import Content from "@components/content";
import { useRouter } from "next/router";
import useItem from "@libs/client/useItem";
import useUser from "@libs/client/useUser";
import axios from "axios";
import urls from "@libs/urls";
import { createClassName, createImageUrl } from "@libs/utils";
import Image from "next/image";
import Loading from "@components/loading";
import useSWR from "swr";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const { item, relatedItems, isLoading, isError, mutate } = useItem({
    id: id ? id.toString() : undefined,
    idRequired: true,
  });
  const { user: me, isLoading: meLoading, isError: meError } = useUser({});
  const onFavouriteClick = () => {
    loginValidator();
    if (!item) return;
    const newFavourite = JSON.parse(JSON.stringify(item?.favourites)); // Deep Copy of Favourites
    item!.favourites.length > 0 ? newFavourite?.pop() : newFavourite?.push(me);
    mutate(
      { code: 0, item: { ...item, favourites: newFavourite }, relatedItems },
      false
    );
    axios.post(urls.ITEMS_URL + `/${id}/favourite`);
  };

  const loginValidator = () => {
    if (!me) return router.push("/enter");
  };

  const handleTalkToSeller = async () => {
    if (!me) router.push("/enter");
    const { data } = await axios.post(urls.CHAT_URL + "/create", {
      id,
      sellerId: item?.userId,
    });
    if (data.code === 0 || data.code === 1)
      router.push(`/chats/${data.chatroom.id}`);
  };

  const paypalOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "CAD",
    intent: "capture",
  };

  const handleCreateOrder = async () => {
    const paypalInfo = await axios.post(urls.PAYMENT_URL, {
      item: {
        id: item?.id,
        price: item?.price,
        title: item?.title,
      },
    } as any);

    return paypalInfo.data.id;
  };

  const handleApprove = async (data: any, action: any) => {
    await action.order.capture();
    const response = await axios.post(urls.PAYMENT_URL + "/approve", {
      paymentInfo: {
        itemId: item?.id,
        buyerId: me?.id,
        paypalOrderId: data.orderID,
        payerPaypalId: data.payerID,
      },
    });
    if (response.data.code === 0)
      router.push(`/profile/record?kind=Bought&id=${me.id}`);
  };
  return (
    <Layout canGoBack>
      {meLoading || isLoading ? (
        <Loading />
      ) : (
        <div className="px-4 pt-14 pb-4">
          <div className="mb-8">
            {/* Picture */}
            {item?.picture ? (
              <div className="relative h-96">
                <Image
                  fill
                  alt="Item Image"
                  className="h-96 rounded-md"
                  quality={100}
                  src={createImageUrl(item?.picture, "public")}
                />
              </div>
            ) : (
              <div className="h-96 bg-orange-300" />
            )}

            {/* Profile */}

            <div className="border-b-[1px]">
              <Profile
                nickname={item?.user?.nickname}
                fontType="medium"
                picSize={12}
                picLocation="center"
                textSize="sm"
                avatar={item?.user?.avatar}
              >
                <Link
                  href={`/profile/${
                    me?.id === item?.user?.id ? "" : item?.user?.id
                  }`}
                >
                  <p className="cursor-pointer text-xs font-medium text-gray-500">
                    View profile &rarr;
                  </p>
                </Link>
              </Profile>
            </div>

            {/* Content */}

            <div className="mt-5">
              <Content
                title={item?.title!}
                price={item?.price!}
                content={item?.description!}
              />
            </div>
          </div>

          {/* Talk to Seller and Favourite Buttons */}

          <div className="flex items-center justify-between space-x-2">
            {/* <Link href={me ? "" : "/enter"} className="w-full"> */}
            <Button
              text={
                me?.id === item?.user?.id ? "It's your Item" : "Talk to seller"
              }
              marginTop={0}
              textSize="base"
              isDisabled={me?.id === item?.user?.id || item?.isSoldOut}
              onClick={handleTalkToSeller}
            />
            {/* </Link> */}

            <button
              className={createClassName(
                `p-2 hover:bg-gray-100 hover:p-3 rounded-md flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500`,
                item && item?.favourites?.length > 0
                  ? "text-red-400 hover:text-red-500"
                  : "text-gray-400  hover:text-gray-500"
              )}
              onClick={onFavouriteClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
          </div>
          {me && me?.id !== item?.user?.id && !item?.isSoldOut ? (
            <div className="pt-2">
              <PayPalScriptProvider options={paypalOptions}>
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={handleCreateOrder}
                  onApprove={handleApprove}
                />
              </PayPalScriptProvider>
            </div>
          ) : null}

          {item?.order &&
          (item?.order?.buyerId === me?.id ||
            item?.order?.sellerId === me?.id) ? (
            <div className="m-auto bg-slate-100 justify-center mt-4 p-6 border-4 border-orange-500 rounded-md text-sm font-medium w-80">
              <p>Buyer Name : {item?.order?.buyer?.nickname}</p>
              <p>Seller Name : {item?.order?.seller?.nickname}</p>
              <p>Paypal Order ID : {item?.order?.paypalOrderId}</p>
              <p>
                Payment Date:{" "}
                {item?.order?.createdAt
                  .toString()
                  .slice(0, 19)
                  .replace("T", " ")}
              </p>
            </div>
          ) : null}

          {/* Similar Item Recommendation */}

          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {relatedItems?.map((item, i) => (
                <Link href={`/items/${item.id}`} key={item.id}>
                  <div className="cursor-pointer">
                    {item.picture ? (
                      <Image
                        width={232}
                        height={224}
                        quality={100}
                        src={createImageUrl(item.picture, "item")}
                        alt="Item List"
                        className="rounded-md h-56 group-hover:w-24 group-hover:h-24 transition-all"
                      />
                    ) : (
                      <div className="h-56 w-full mb-4 bg-orange-500 rounded-md" />
                    )}

                    <h3 className="font-medium text-gray-700 -mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-900">
                      ${item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ItemDetail;

// export async function getStaticProps() {
//   // Using the variables below in the browser will return `undefined`. Next.js doesn't
//   // expose environment variables unless they start with `NEXT_PUBLIC_`
//   const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

//   return { props: { PAYPAL_CLIENT_ID } };
// }
