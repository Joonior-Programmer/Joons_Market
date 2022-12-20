import type { NextPage } from "next";
import Layout from "@components/layout";
import Item from "@components/item";
import { useRouter } from "next/router";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { RecordsResponseType } from "@libs/responseTypes";
import { useEffect } from "react";
import { Kind } from "@prisma/client";
import Loading from "@components/loading";

const Bought: NextPage = () => {
  const router = useRouter();
  const {
    query: { id, kind },
  } = router;

  const { user, isLoading, isError } = useUser({
    id: router?.query?.id as string,
  });
  const { data, error } = useSWR<RecordsResponseType>(
    id && kind ? `/api/users/${id}/record?kind=${kind}` : null
  );
  useEffect(() => {
    if (
      kind &&
      !(kind === Kind.Sell || kind === Kind.Bought || kind === Kind.Favourite)
    ) {
      router.replace("/404");
    }
  }, [kind]);

  return (
    <Layout canGoBack title={kind as string}>
      {!data ? (
        <Loading />
      ) : (
        <div className="flex flex-col space-y-5 pt-14 pb-11">
          {data && data?.code === 0 && data?.records?.length > 0 ? (
            data?.records?.map((record) => (
              <Item
                id={record.item.id}
                key={record.item.id}
                title={record.item.title}
                price={record.item.price}
                numOfHearts={record.item?._count?.favourites}
                isLiked={record.item.favourites.length === 1}
                createdAt={record.item.createdAt}
                picture={record.item.picture}
                isSoldOut={record.item.isSoldOut}
              />
            ))
          ) : (
            <p className="text-center text-lg font-medium ">No Record Exist</p>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Bought;
