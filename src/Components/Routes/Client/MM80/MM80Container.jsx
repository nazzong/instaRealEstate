import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@apollo/react-hooks";
import { toast } from "react-nextjs-toast";
const MM80Presenter = dynamic(import("./MM80Presenter"));
import useInput from "../../../../Components/Hooks/useInput";
import {
  GET_NOTICEBOARD,
  GET_NOTICEBOARD_TOTALPAGE,
  GET_NOTICEBOARD_TOTALPAGE_ONLY_CNT,
} from "./MM80Queries";
import { useRouter } from "next/router";

const MM80Container = ({}) => {
  ////////////// - VARIABLES- ///////////////
  const router = useRouter();

  ////////////// - USE STATE- ///////////////
  const [currentPage, setCurrentPage] = useState(0);
  const [currentList, setCurrentList] = useState(0);
  const [limit, setLimit] = useState(15);
  const [pages, setPages] = useState(null);
  const searchValue = useInput("");
  const sortValue = useInput("createdAt");

  ////////////// - USE QUERY- ///////////////
  const {
    data: noticeDatum,
    loading: noticeLoading,
    refetch: noticeRefetch,
  } = useQuery(GET_NOTICEBOARD, {
    variables: {
      searchValue: searchValue.value,
      limit,
      currentPage: currentPage,
      sort: sortValue.value,
    },
  });

  const {
    data: totalNoticePageOnlyCntData,
    loading: totalNoticePageOnlyCntLoading,
    refetch: totalNoticePageOnlyCntRefetch,
  } = useQuery(GET_NOTICEBOARD_TOTALPAGE_ONLY_CNT, {
    variables: {
      searchValue: searchValue.value,
      limit,
    },
  });

  const {
    data: totalNoticePageData,
    loading: totalNoticePageLoading,
    refetch: totalNoticePageRefetch,
  } = useQuery(GET_NOTICEBOARD_TOTALPAGE, {
    variables: {
      searchValue: searchValue.value,
      limit,
    },
  });

  if (!totalNoticePageLoading && !pages) {
    const temp = [];

    for (let i = 0; i < totalNoticePageData.getNoticeBoardTotalPageClient; i++)
      temp.push(i);

    setPages(temp);
  }

  ///////////// - USE MUTATION- /////////////

  ///////////// - EVENT HANDLER- ////////////
  const moveLinkHandler = (link) => {
    router.push(`${router.pathname}-detail/${link}`);
  };
  const prevAndNextPageChangeNoticeHandler = (page) => {
    let list = currentList;

    if (page < 0) {
      toast.notify("첫 페이지 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (page > totalNoticePageData.getNoticeBoardTotalPageClient - 1) {
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
    noticeRefetch();
    totalNoticePageOnlyCntRefetch();
    totalNoticePageRefetch();
  }, []);

  return (
    <MM80Presenter
      searchValue={searchValue}
      pages={pages}
      setPages={setPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      currentList={currentList}
      limit={limit}
      sortValue={sortValue}
      //
      noticeDatum={noticeDatum && noticeDatum.getNoticeBoardClient}
      totalCnt={
        totalNoticePageOnlyCntData &&
        totalNoticePageOnlyCntData.getNoticeBoardTotalPageOnlyCntClient
      }
      //

      moveLinkHandler={moveLinkHandler}
      prevAndNextPageChangeNoticeHandler={prevAndNextPageChangeNoticeHandler}
      changePageHandler={changePageHandler}
    />
  );
};

export default MM80Container;
