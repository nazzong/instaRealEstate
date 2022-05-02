import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import dynamic from "next/dynamic";
const MM01Presenter = dynamic(import("./MM01Presenter"));
import {
  GET_MENU_BY_ID,
  GET_SUB_MENU_BY_ID,
  GET_PRODUCT_BY_MENU,
  GET_PRODUCT_BY_MENU_FOR_INFINITE,
  GET_PRODUCT_TOTALPAGE,
  GET_PRODUCT_TOTALPAGE_ONLY_CNT,
  UPDATE_PRODUCT_STAR,
} from "./MM01Queries";
import { withCookies } from "react-cookie";
import { toast } from "react-nextjs-toast";
import { useRouter } from "next/router";
import useWindowSize from "../../../Hooks/useWindowSize";

const MM01Container = ({ cookies }) => {
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
  const [menuSkip, setMenuSkip] = useState(true);
  const [subMenuSkip, setSubMenuSkip] = useState(true);
  const [productSkip, setProductSkip] = useState(true);
  const [viewProductDatum, setViewProductDatum] = useState(null);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const [currentImage, setCurrentImage] = useState(0);
  const [currentPath, setCurrentPath] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);

  const [currentId, setCurrentId] = useState("");

  const [timerList, setTimerList] = useState([]);

  ////////////// - USE QUERY- ///////////////
  const {
    data: menuData,
    loading: menuLoading,
    refetch: menuRefetch,
  } = useQuery(GET_MENU_BY_ID, {
    variables: {
      id: query.pmenu || "",
    },
    skip: menuSkip,
  });

  const {
    data: subMenuData,
    loading: subMenuLoading,
    refetch: subMenuRefetch,
  } = useQuery(GET_SUB_MENU_BY_ID, {
    variables: {
      id: query.cmenu || "",
    },
    skip: subMenuSkip,
  });

  const {
    data: productDatum,
    loading: productLoading,
    refetch: productRefetch,
  } = useQuery(GET_PRODUCT_BY_MENU, {
    variables: {
      pmenu: query.pmenu,
      cmenu: query.cmenu,
      currentPage,
      limit,
    },
  });

  const {
    data: productTotalPageData,
    refetch: productTotalPageRefetch,
  } = useQuery(GET_PRODUCT_TOTALPAGE, {
    variables: {
      pmenu: query.pmenu,
      cmenu: query.cmenu,
      limit,
    },
  });

  const {
    data: productTotalPageOnlyCntData,
    refetch: productTotalPageOnlyCntRefetch,
  } = useQuery(GET_PRODUCT_TOTALPAGE_ONLY_CNT, {
    variables: {
      pmenu: query.pmenu,
      cmenu: query.cmenu,
    },
  });

  const {
    data: productInfiniteDatum,
    loading: productInfiniteLoading,
    refetch: productInfiniteRefetch,
  } = useQuery(GET_PRODUCT_BY_MENU_FOR_INFINITE, {
    variables: {
      limit: limit,
      pmenu: query.pmenu,
      cmenu: query.cmenu,
    },
    skip: productSkip,
  });

  ///////////// - USE MUTATION- /////////////
  const [updateProductStarMutation] = useMutation(UPDATE_PRODUCT_STAR);

  ///////////// - EVENT HANDLER- ////////////
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

    if (page > productTotalPageData.getProductTotalPage - 1) {
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
    menuRefetch();
    subMenuRefetch();
    productRefetch();
    productTotalPageRefetch();
    productTotalPageOnlyCntRefetch();
    // productInfiniteRefetch();

    if (query.pmenu) {
      setMenuSkip(false);
    }

    if (query.cmenu) {
      setSubMenuSkip(false);
    }

    return () => {
      timerList.map((data) => {
        clearTimeout(data);
      });
    };
  }, []);

  useEffect(() => {
    if (query.pmenu) {
      setSubMenuSkip(true);
      setMenuSkip(false);
    }

    if (query.cmenu) {
      setMenuSkip(true);
      setSubMenuSkip(false);
    }

    setCurrentPage(0);
    setCurrentList(0);

    setCurrentImage(0);
    setCurrentPath("");
    setIsViewerOpen(false);
    setImages([]);

    setCurrentId("");
  }, [query.pmenu, query.cmenu]);

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
    if (productDatum) {
      setProductSkip(false);
    }
  }, [productDatum]);

  useEffect(() => {
    if (productTotalPageData) {
      const temp = [];

      for (let i = 0; i < productTotalPageData.getProductTotalPage; i++)
        temp.push(i);

      setPages(temp);
    }
  }, [productTotalPageData]);

  useEffect(() => {
    setIsImageLoading(false);
  }, [currentPage]);

  // useEffect(() => {
  //   if (productInfiniteDatum) {
  //     setViewProductDatum(productInfiniteDatum.getProductbyMenuForInfinite);

  //     setIsInfiniteLoading(false);
  //     setProductSkip(true);
  //   }
  // }, [productInfiniteDatum]);

  return (
    <MM01Presenter
      cookies={cookies}
      //
      currentPage={currentPage}
      currentList={currentList}
      limit={limit}
      pages={pages}
      isInfiniteLoading={isInfiniteLoading}
      isImageLoading={isImageLoading}
      imageIndex={imageIndex}
      currentImage={currentImage}
      isViewerOpen={isViewerOpen}
      images={images}
      currentId={currentId}
      setCurrentId={setCurrentId}
      //
      menuData={menuData && menuData.getMenuById}
      subMenuData={subMenuData && subMenuData.getSubMenuById}
      productDatum={productDatum && productDatum.getProductByMenu}
      productTotalPageOnlyCntData={
        productTotalPageOnlyCntData &&
        productTotalPageOnlyCntData.getProductTotalPageOnlyCnt
      }
      viewProductDatum={viewProductDatum}
      //
      _moveLinkHandler={_moveLinkHandler}
      infiniteScrollHandler={infiniteScrollHandler}
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

export default withCookies(MM01Container);
