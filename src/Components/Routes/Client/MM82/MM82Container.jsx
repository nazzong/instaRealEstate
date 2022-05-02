import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import dynamic from "next/dynamic";
import { toast } from "react-nextjs-toast";
import { GET_EVENTBOARD, GET_EVENTBOARD_TOTALPAGE } from "./MM82Queries";
const MM82Presenter = dynamic(import("./MM82Presenter"));
import { useRouter } from "next/router";

const MM82Container = ({}) => {
  ////////////// - VARIABLES- ///////////////
  const router = useRouter();

  ////////////// - USE STATE- ///////////////
  const [pages, setPages] = useState(null);
  const [limit, setLimit] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentList, setCurrentList] = useState(0);

  ////////////// - USE QUERY- ///////////////
  const {
    data: eventDatum,
    loading: eventLoading,
    refetch: eventRefetch,
  } = useQuery(GET_EVENTBOARD, {
    variables: {
      limit,
      currentPage,
    },
  });

  const {
    data: totalEventPageData,
    loading: totalEventPageLoading,
    refetch: totalEventPageRefetch,
  } = useQuery(GET_EVENTBOARD_TOTALPAGE, {
    variables: {
      limit,
    },
  });

  if (!totalEventPageLoading && !pages) {
    const temp = [];

    for (let i = 0; i < totalEventPageData.getEventBoardTotalPageClient; i++)
      temp.push(i);

    setPages(temp);
  }

  ///////////// - USE MUTATION- /////////////

  ///////////// - EVENT HANDLER- ////////////
  const moveLinkHandler = (link) => {
    router.push(`${router.pathname}-detail/${link}`);
  };

  const prevAndNextPageChangeEventHandler = (page) => {
    let list = currentList;

    if (page < 0) {
      toast.notify("첫 페이지 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (page > totalEventPageData.getEventBoardTotalPageClient - 1) {
      toast.notify("마지막 페이지 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if ((currentList + 1) * 5 === page) {
      list += 1;
    } else if (currentList * 5 - 1 === page) {
      list -= 1;
    }

    setCurrentList(list);
    setCurrentPage(page);
  };

  const changePageHandler = (page) => {
    setCurrentPage(page);
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    eventRefetch();
    totalEventPageRefetch();
  }, []);

  return (
    <MM82Presenter
      pages={pages}
      currentPage={currentPage}
      currentList={currentList}
      //
      eventDatum={eventDatum && eventDatum.getEventBoardClient}
      //
      moveLinkHandler={moveLinkHandler}
      prevAndNextPageChangeEventHandler={prevAndNextPageChangeEventHandler}
      changePageHandler={changePageHandler}
    />
  );
};

export default MM82Container;
