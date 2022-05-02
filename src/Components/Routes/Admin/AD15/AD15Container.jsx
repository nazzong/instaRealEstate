import React, { useEffect, useState } from "react";
import AD15Presenter from "./AD15Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_PRODUCT_FOR_ADMIN,
  GET_PRODUCT_TOTAL_PAGE_FOR_ADMIN,
  GET_PRODUCT_TOTAL_PAGE_ONLY_CNT_FOR_ADMIN,
  DELETE_PRODUCT,
  UPDATE_PRODUCT_VIEW,
  UPDATE_PRODUCT_MAP,
  UPDATE_PRODUCT_COMPLETE,
} from "./AD15Queries.js";
import { toast } from "react-nextjs-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useInput from "../../../../Components/Hooks/useInput";
import useOnlyNumberInput from "../../../../Components/Hooks/useOnlyNumberInput";
import { useRouter } from "next/router";

export default ({}) => {
  ////////////// - VARIABLE- ////////////////
  const router = useRouter();

  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentList, setCurrentList] = useState(0);
  const [pages, setPages] = useState(null);

  const [viewProductDatum, setViewProductDatum] = useState(null);
  const [searchType, setSearchType] = useState("1");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchProductType, setSearchProductType] = useState("1");
  const [searchTab, setSearchTab] = useState("1");
  const [searchOrder, setSearchOrder] = useState("1");
  const [isPrivateDialogOpen, setIsPrivateDialogOpen] = useState(false);
  const [privateDialogData, setPrivateDialogData] = useState(null);

  const [tabCount01, setTabCount01] = useState(0);
  const [tabCount02, setTabCount02] = useState(0);
  const [tabCount03, setTabCount03] = useState(0);
  const [tabCount04, setTabCount04] = useState(0);

  const [productSkip, setProductSkip] = useState(true);
  const [pageSkip, setPageSkip] = useState(true);
  const [pageCntSkip, setPageCntSkip] = useState(true);

  const inputSearchType = useInput("1");
  const inputSearchKeyword1 = useInput("");
  const inputSearchKeyword2 = useOnlyNumberInput("");
  const inputSearchKeyword3 = useOnlyNumberInput("");

  ////////////// - USE QUERY- ///////////////
  const { data: productDatum, refetch: productRefetch } = useQuery(
    GET_PRODUCT_FOR_ADMIN,
    {
      variables: {
        id:
          typeof window !== `undefined`
            ? sessionStorage.getItem("DLIUQUXMSUDLQJXS")
            : `-`,
        currentPage,
        limit,
        searchType,
        searchKeyword,
        searchProductType,
        searchTab,
        searchOrder,
      },
      skip: productSkip,
    }
  );

  // const { data: tData, refetch: tRefetch } = useQuery(
  //   GET_PRODUCT_TOTAL_PAGE_FOR_ADMIN,
  //   {
  //     variables: {
  //       id:
  //         typeof window !== `undefined`
  //           ? sessionStorage.getItem("DLIUQUXMSUDLQJXS")
  //           : `-`,
  //       limit,
  //       searchType,
  //       searchKeyword,
  //       searchProductType,
  //       searchTab,
  //       searchOrder,
  //     },
  //     skip: pageSkip,
  //   }
  // );

  const { data: cData, refetch: cRefetch } = useQuery(
    GET_PRODUCT_TOTAL_PAGE_ONLY_CNT_FOR_ADMIN,
    {
      variables: {
        id:
          typeof window !== `undefined`
            ? sessionStorage.getItem("DLIUQUXMSUDLQJXS")
            : `-`,
        searchType,
        searchKeyword,
        searchProductType,
        searchOrder,
      },
      skip: pageCntSkip,
    }
  );

  ///////////// - USE MUTATION- /////////////
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);
  const [updateProductViewMutation] = useMutation(UPDATE_PRODUCT_VIEW);
  const [updateProductMapMutation] = useMutation(UPDATE_PRODUCT_MAP);
  const [updateProductCompleteMutation] = useMutation(UPDATE_PRODUCT_COMPLETE);

  ///////////// - EVENT HANDLER- ////////////
  const moveLinkHandler = (link) => {
    router.push(link);
  };

  const moveURLHandler = (url) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const prevAndNextPageChangeHandler = (page) => {
    let list = currentList;

    if (page < 0) {
      toast.notify("첫 페이지 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (page > pages.length - 1) {
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
    setIsLoading(false);

    setCurrentList(list);
    setCurrentPage(page);

    setTimeout(() => {
      setProductSkip(false);
    }, 1000);
  };

  const changePageHandler = (page) => {
    setIsLoading(false);

    setCurrentPage(page);

    setTimeout(() => {
      setProductSkip(false);
    }, 1000);
  };

  const changeSearchTypeHandler = (e) => {
    inputSearchType.setValue(e.target.value);
    inputSearchKeyword1.setValue("");
    inputSearchKeyword2.setValue("");
    inputSearchKeyword3.setValue("");
  };

  const searchProductHandler = () => {
    if (inputSearchType.value === "1" || inputSearchType.value === "4") {
      setSearchType(inputSearchType.value);
      setSearchKeyword(inputSearchKeyword1.value);
    } else {
      setSearchType(inputSearchType.value);
      setSearchKeyword(
        inputSearchKeyword2.value + "~" + inputSearchKeyword3.value
      );
    }
    setIsLoading(false);
    setCurrentPage(0);
    setCurrentList(0);

    setSearchTab("1");

    setTimeout(() => {
      productRefetch();
      // tRefetch();
      cRefetch();

      setTimeout(() => {
        setProductSkip(false);
        // setPageSkip(false);
        setPageCntSkip(false);
      }, 1000);
    }, 100);
  };

  const searchProductHandler2 = (value, setValue) => {
    setIsLoading(false);

    setCurrentPage(0);
    setCurrentList(0);

    setValue(value);

    setTimeout(() => {
      productRefetch();
      // tRefetch();
      cRefetch();

      setTimeout(() => {
        setProductSkip(false);
        // setPageSkip(false);
        setPageCntSkip(false);
      }, 1000);
    }, 100);
  };

  const deleteProductHandler = (id) => {
    confirmAlert({
      title: "DELETE PRODUCT",
      message: "선택하신 매물을 삭제하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
        {
          label: "확인",
          onClick: () => deleteProductHandlerAfter(id),
        },
      ],
    });
  };

  const deleteProductHandlerAfter = async (id) => {
    const { data } = await deleteProductMutation({
      variables: {
        id,
      },
    });

    if (data.deleteProduct) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
      // tRefetch();
      cRefetch();

      setTimeout(() => {
        setProductSkip(false);
        // setPageSkip(false);
        setPageCntSkip(false);
      }, 2500);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductViewHandler = async (id, isView) => {
    const { data } = await updateProductViewMutation({
      variables: {
        id,
        isView: !isView,
      },
    });

    if (data.updateProductView) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });

      const datum = await viewProductDatum.map((data) => {
        if (data._id === id) {
          return {
            ...data,
            isView: !isView,
          };
        } else {
          return data;
        }
      });

      setViewProductDatum(datum);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductMapHandler = async (id, isMap) => {
    const { data } = await updateProductMapMutation({
      variables: {
        id,
        isMap: !isMap,
      },
    });

    if (data.updateProductMap) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });

      const datum = await viewProductDatum.map((data) => {
        if (data._id === id) {
          return {
            ...data,
            isMap: !isMap,
          };
        } else {
          return data;
        }
      });

      setViewProductDatum(datum);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductCompleteHandler = async (id, isComplete) => {
    const { data } = await updateProductCompleteMutation({
      variables: {
        id,
        isComplete: !isComplete,
      },
    });

    if (data.updateProductComplete) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      const datum = await viewProductDatum.map((data) => {
        if (data._id === id) {
          return {
            ...data,
            isComplete: !isComplete,
          };
        } else {
          return data;
        }
      });

      setViewProductDatum(datum);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const togglePrivateInfoHandler = (e, data) => {
    setPrivateDialogData(data);
    setIsPrivateDialogOpen(!isPrivateDialogOpen);
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    setTimeout(() => {
      productRefetch();
      // tRefetch();
      cRefetch();

      setTimeout(() => {
        setProductSkip(false);
        // setPageSkip(false);
        setPageCntSkip(false);
      }, 2000);
    }, 100);
  }, []);

  useEffect(() => {}, [currentTab]);

  // useEffect(() => {
  //   if (tData) {
  //     const temp = [];

  //     for (let i = 0; i < tData.getProductTotalPageForAdmin; i++) temp.push(i);

  //     setPages(temp);
  //     setPageSkip(true);
  //   }
  // }, [tData]);

  useEffect(() => {
    if (cData) {
      setTabCount01(cData.getProductTotalPageOnlyCntForAdmin.tabCount01);
      setTabCount02(cData.getProductTotalPageOnlyCntForAdmin.tabCount02);
      setTabCount03(cData.getProductTotalPageOnlyCntForAdmin.tabCount03);
      setTabCount04(cData.getProductTotalPageOnlyCntForAdmin.tabCount04);

      setPageCntSkip(true);
    }
  }, [cData]);

  useEffect(() => {
    if (productDatum) {
      setViewProductDatum(productDatum.getProductForAdmin);

      setProductSkip(true);
      setIsLoading(true);
    }
  }, [productDatum]);

  return (
    <AD15Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      currentList={currentList}
      currentPage={currentPage}
      pages={pages}
      limit={limit}
      searchType={searchType}
      setSearchType={setSearchType}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      searchProductType={searchProductType}
      setSearchProductType={setSearchProductType}
      searchTab={searchTab}
      setSearchTab={setSearchTab}
      searchOrder={searchOrder}
      setSearchOrder={setSearchOrder}
      privateDialogData={privateDialogData}
      isPrivateDialogOpen={isPrivateDialogOpen}
      tabCount01={tabCount01}
      tabCount02={tabCount02}
      tabCount03={tabCount03}
      tabCount04={tabCount04}
      inputSearchType={inputSearchType}
      inputSearchKeyword1={inputSearchKeyword1}
      inputSearchKeyword2={inputSearchKeyword2}
      inputSearchKeyword3={inputSearchKeyword3}
      //
      productDatum={viewProductDatum}
      //
      moveLinkHandler={moveLinkHandler}
      moveURLHandler={moveURLHandler}
      prevAndNextPageChangeHandler={prevAndNextPageChangeHandler}
      changePageHandler={changePageHandler}
      changeSearchTypeHandler={changeSearchTypeHandler}
      searchProductHandler={searchProductHandler}
      searchProductHandler2={searchProductHandler2}
      deleteProductHandler={deleteProductHandler}
      updateProductViewHandler={updateProductViewHandler}
      updateProductMapHandler={updateProductMapHandler}
      updateProductCompleteHandler={updateProductCompleteHandler}
      togglePrivateInfoHandler={togglePrivateInfoHandler}
    />
  );
};
