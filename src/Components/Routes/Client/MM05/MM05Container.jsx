import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const MM05Presenter = dynamic(import("./MM05Presenter"));
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_PRODUCT_SEARCH,
  GET_PRODUCT_SEARCH_TOTALPAGE,
  GET_PRODUCT_SEARCH_TOTALPAGE_ONLY_CNT,
  GET_PRODUCT_FOR_INFINITE,
  UPDATE_PRODUCT_STAR,
} from "./MM05Queries";
import queryString from "query-string";
import useInput from "../../../../Components/Hooks/useInput";
import { withCookies } from "react-cookie";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";
import useWindowSize from "../../../Hooks/useWindowSize";

const MM05Container = ({ cookies }) => {
  ////////////// - VARIABLES- ///////////////
  const size = useWindowSize();

  const router = useRouter();
  const query = router.query;
  const limitCnt = 20;

  ////////////// - USE STATE- ///////////////
  const [limit, setLimit] = useState(limitCnt);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentList, setCurrentList] = useState(0);
  const [pages, setPages] = useState(null);
  const [productSkip, setProductSkip] = useState(true);
  const [viewProductDatum, setViewProductDatum] = useState(null);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const inputSearch = useInput("");
  const [currentImage, setCurrentImage] = useState(0);
  const [currentPath, setCurrentPath] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);

  const [currentId, setCurrentId] = useState("");

  const [timerList, setTimerList] = useState([]);

  ////////////// - USE QUERY- ///////////////
  const {
    data: productDatum,
    loading: productLoading,
    refetch: productRefetch,
  } = useQuery(GET_PRODUCT_SEARCH, {
    variables: {
      searchValue: query.search,
      currentPage,
      limit,
    },
    skip: productSkip,
  });

  const { data: productTotalPageData, refetch: productTotalPageRefetch } =
    useQuery(GET_PRODUCT_SEARCH_TOTALPAGE, {
      variables: {
        searchValue: query.search,
        limit,
      },
      skip: productSkip,
    });

  const {
    data: productTotalPageOnlyCntData,
    refetch: productTotalPageOnlyCntRefetch,
  } = useQuery(GET_PRODUCT_SEARCH_TOTALPAGE_ONLY_CNT, {
    variables: {
      searchValue: query.search,
    },
    skip: productSkip,
  });

  const {
    data: productInfiniteDatum,
    loading: productInfiniteLoading,
    refetch: productInfiniteRefetch,
  } = useQuery(GET_PRODUCT_FOR_INFINITE, {
    variables: {
      limit: limit,
      searchValue: query.search,
    },
    skip: productSkip,
  });

  ///////////// - USE MUTATION- /////////////
  const [updateProductStarMutation] = useMutation(UPDATE_PRODUCT_STAR);

  ///////////// - EVENT HANDLER- ////////////
  const priceUnitToKorean = (number) => {
    const inputNumber = number < 0 ? false : number;
    const unitWords = ["", "만", "억", "조", "경"];
    const splitUnit = 10000;
    const splitCount = unitWords.length;
    const resultArray = [];
    let resultString = "";

    for (let i = 0; i < splitCount; i++) {
      let unitResult =
        (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }

    for (let i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }

    return resultString;
  };

  const imageViewerHandler = (e, images, path) => {
    let image = [];

    images &&
      images.map((data, idx) => {
        image.push({
          src: data,
        });
      });

    if (!isViewerOpen) {
      setImages(image);
      setCurrentPath(path);
    } else {
      setCurrentImage(0);
      setImages([]);
      setCurrentPath("");
    }

    setIsViewerOpen(!isViewerOpen);
  };

  const imageViewerPrevHandler = () => {
    setCurrentImage(currentImage - 1);
  };

  const imageViewerNextHandler = () => {
    setCurrentImage(currentImage + 1);
  };

  const imageViewerGotoHandler = (index) => {
    setCurrentImage(index);
  };

  const imageViewerClickHandler = () => {
    router.push(currentPath);
  };
  const searchProductHandler = () => {
    router.push(`/search/?search=${inputSearch.value}`);
  };

  const _moveLinkHandler = (link) => {
    router.push(link);
  };

  const infiniteScrollHandler = async () => {
    setIsInfiniteLoading(true);

    await setLimit(limit + limitCnt);
    setProductSkip(false);
  };

  const updateProductStarHandler = async (id, star) => {
    let value = 0;

    if (cookies.get(`INSTA_STAR_${id}`)) {
      cookies.remove(`INSTA_STAR_${id}`);

      value = -1;
    } else {
      cookies.set(`INSTA_STAR_${id}`, `1`, {
        path: "/",
        maxAge: 3600 * 24 * 7,
      });

      value = 1;
    }

    const { data } = await updateProductStarMutation({
      variables: {
        id,
        star: star + value,
      },
    });
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

    setCurrentList(list);
    setCurrentPage(page);
  };

  const changePageHandler = (page) => {
    setCurrentPage(page);
    setProductSkip(false);
  };

  const closePageHandler = () => {
    setCurrentId("");
  };

  const shareProductHandler = (text, result) => {
    if (result) {
      toast.notify("클립보드로 URL이 복사되었습니다.", {
        duration: 5,
        type: "success",
      });
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    productRefetch();
    productTotalPageRefetch();
    productTotalPageOnlyCntRefetch();
    // productInfiniteRefetch();

    const timer = setTimeout(() => {
      setProductSkip(false);
    }, 500);

    timerList.push(timer);

    return () => {
      timerList.map((data) => {
        clearTimeout(data);
      });
    };
  }, []);

  useEffect(() => {
    if (isImageLoading) {
      setTimeout(
        () => {
          setImageIndex(imageIndex + 1);
        },
        size.width < 500 ? 3000 : 7000
      );
    } else {
      setImageIndex(0);

      setTimeout(() => {
        setIsImageLoading(true);
      }, 100);
    }
  }, [isImageLoading]);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (imageIndex >= 3) {
          setImageIndex(0);
        } else {
          setImageIndex(imageIndex + 1);
        }
      },
      size.width < 500 ? 3000 : 7000
    );

    timerList.push(timer);

    return () => {
      timerList.map((data) => {
        clearTimeout(data);
      });
    };
  }, [imageIndex]);

  useEffect(() => {
    setCurrentPage(0);
    setCurrentList(0);
    setCurrentId("");

    setTimeout(() => {
      setProductSkip(false);
    }, 1000);
  }, [query.search]);

  useEffect(() => {
    if (productTotalPageData && productDatum) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      timerList.push(timer);

      const temp = [];

      for (let i = 0; i < productTotalPageData.getProductSearchTotalPage; i++)
        temp.push(i);

      setPages(temp);

      setViewProductDatum(productDatum.getProductSearch);
      setProductSkip(true);
    }
  }, [productDatum, productTotalPageData]);

  useEffect(() => {
    setIsImageLoading(false);
  }, [currentPage]);

  // useEffect(() => {
  //   if (productInfiniteDatum) {
  //     setViewProductDatum(productInfiniteDatum.getProductForInfinite);

  //     setIsInfiniteLoading(false);
  //     setProductSkip(true);
  //   }
  // }, [productInfiniteDatum]);

  return (
    <MM05Presenter
      cookies={cookies}
      //
      currentPage={currentPage}
      currentList={currentList}
      limit={limit}
      pages={pages}
      isInfiniteLoading={isInfiniteLoading}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      isImageLoading={isImageLoading}
      imageIndex={imageIndex}
      inputSearch={inputSearch}
      currentImage={currentImage}
      isViewerOpen={isViewerOpen}
      images={images}
      currentId={currentId}
      setCurrentId={setCurrentId}
      //
      productDatum={viewProductDatum}
      productTotalPageOnlyCntData={
        productTotalPageOnlyCntData &&
        productTotalPageOnlyCntData.getProductSearchTotalPageOnlyCnt
      }
      viewProductDatum={viewProductDatum}
      //
      _moveLinkHandler={_moveLinkHandler}
      infiniteScrollHandler={infiniteScrollHandler}
      searchProductHandler={searchProductHandler}
      imageViewerHandler={imageViewerHandler}
      imageViewerPrevHandler={imageViewerPrevHandler}
      imageViewerNextHandler={imageViewerNextHandler}
      imageViewerGotoHandler={imageViewerGotoHandler}
      imageViewerClickHandler={imageViewerClickHandler}
      updateProductStarHandler={updateProductStarHandler}
      prevAndNextPageChangeHandler={prevAndNextPageChangeHandler}
      changePageHandler={changePageHandler}
      closePageHandler={closePageHandler}
      shareProductHandler={shareProductHandler}
    />
  );
};

export default withCookies(MM05Container);
