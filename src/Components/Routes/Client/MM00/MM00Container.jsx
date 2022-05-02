import React, { useState, useEffect } from "react";
import MM00Presenter from "./MM00Presenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  ADD_ACCEPT_RECORD,
  GET_MAINBANNER,
  GET_PRODUCT_BY_BEST,
  GET_PRODUCT_FOR_MAIN,
  GET_PRODUCT_TOTALPAGE_FOR_MAIN,
  GET_PRODUCT_TOTALPAGE_ONLY_CNT_FOR_MAIN,
  GET_PRODUCT_FOR_INFINITE,
  UPDATE_PRODUCT_STAR,
  GET_ALLMENUS,
} from "./MM00Queries";
import { animateScroll as scroll } from "react-scroll";
import useInput from "../../../Hooks/useInput";
import { withCookies } from "react-cookie";
import { toast } from "react-nextjs-toast";
import { areaCalculation } from "../../../../commonUtils";
import { useRouter } from "next/router";
import useWindowSize from "../../../Hooks/useWindowSize";

const MM00Container = ({ cookies }) => {
  ////////////// - VARIABLE- ///////////////
  const size = useWindowSize();

  const router = useRouter();
  const limitCnt = 30;
  const initSlidesToShow = 4;

  const unitNumber = {
    "": 1,
    만: 10000,
    억: 100000000,
    조: 1000000000000,
  };

  ////////////// - USE STATE- ///////////////
  const [width, setWidth] = useState(size.width);
  const [limit, setLimit] = useState(limitCnt);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentList, setCurrentList] = useState(0);
  const [pages, setPages] = useState(null);
  const [pageCnt, setPageCnt] = useState(0);

  const [pageSkip, setPageSkip] = useState(true);
  const [pageCntSkip, setPageCntSkip] = useState(true);
  const [productSkip00, setProductSkip00] = useState(true);
  const [productSkip01, setProductSkip01] = useState(true);
  const [productSkip02, setProductSkip02] = useState(true);
  const [productSkip03, setProductSkip03] = useState(true);
  const [productSkip04, setProductSkip04] = useState(true);
  const [viewProductDatum00, setViewProductDatum00] = useState(null);
  const [viewProductDatum01, setViewProductDatum01] = useState(null);
  const [viewProductDatum02, setViewProductDatum02] = useState(null);
  const [viewProductDatum03, setViewProductDatum03] = useState(null);
  const [viewProductDatum04, setViewProductDatum04] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageChange, setIsImageChange] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const inputSearch = useInput("");
  const [currentImage, setCurrentImage] = useState(0);
  const [currentPath, setCurrentPath] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(initSlidesToShow);

  const [currentId, setCurrentId] = useState("");

  const [timerList, setTimerList] = useState([]);

  const [mainLimit, setMainLimit] = useState(
    size.width < 500
      ? 6
      : size.width < 800
      ? 8
      : size.width < 1500
      ? 14
      : size.width < 2000
      ? 18
      : 24
  );

  const [moreCategory, setMoreCategory] = useState("");
  const [moreLimit, setMoreLimit] = useState(mainLimit);
  const [moreLoading, setMoreLoading] = useState(false);

  // Filter
  const [isFilter, setIsFilter] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [currentFilterTab, setCurrentFilterTab] = useState(0);

  const [starList, setStarList] = useState([]);
  const [contractAreaMode, setContractAreaMode] = useState(2);

  const inputType = useInput("");
  const inputMonthText = useInput("전체");
  const inputMonthStart = useInput(0);
  const inputMonthEnd = useInput(1000);
  const inputMonthLimit = useInput(true);
  const inputDepositText = useInput("전체");
  const inputDepositStart = useInput(0);
  const inputDepositEnd = useInput(20000);
  const inputDepositLimit = useInput(true);
  const inputTradingText = useInput("전체");
  const inputTradingStart = useInput(0);
  const inputTradingEnd = useInput(300000);
  const inputTradingLimit = useInput(true);
  const inputRightFeeText = useInput("전체");
  const inputRightFeeStart = useInput(0);
  const inputRightFeeEnd = useInput(20000);
  const inputRightFeeLimit = useInput(true);
  const inputIsRightFee = useInput(false);
  const inputContractAreaText = useInput("전체");
  const inputContractAreaStart = useInput(0);
  const inputContractAreaEnd = useInput(150);
  const inputContractAreaLimit = useInput(true);
  const inputFloor = useInput("");
  const inputIsParking = useInput("");
  const inputIsElevator = useInput("");
  const inputRestroom1 = useInput("");
  const inputRestroom2 = useInput("");
  const inputIsCeiling = useInput(false);
  const inputBuildingUse = useInput("");
  const inputProductType = useInput("");

  ////////////// - USE QUERY- ///////////////
  // const { data: menuDatum, refetch: menuRefetch } = useQuery(GET_ALLMENUS);

  // const { data: mainBannerData, refetch: mainBannerRefetch } = useQuery(
  //   GET_MAINBANNER
  // );

  // const {
  //   data: bestProductDatum,
  //   loading: bestProductLoading,
  //   refetch: bestProductRefetch,
  // } = useQuery(GET_PRODUCT_BY_BEST);

  const { data: productDatum00, refetch: productRefetch00 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        mainLimit: 0,
        currentPage,
        limit,
        category: "",
        moreCategory,
        moreLimit,
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        restroom1: inputRestroom1.value,
        restroom2: inputRestroom2.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip00,
    }
  );

  const { data: tData, refetch: tRefetch } = useQuery(
    GET_PRODUCT_TOTALPAGE_FOR_MAIN,
    {
      variables: {
        limit,
        category: "",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        restroom1: inputRestroom1.value,
        restroom2: inputRestroom2.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: pageSkip,
    }
  );

  const { data: cData, refetch: cRefetch } = useQuery(
    GET_PRODUCT_TOTALPAGE_ONLY_CNT_FOR_MAIN,
    {
      variables: {
        category: "",
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        restroom1: inputRestroom1.value,
        restroom2: inputRestroom2.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: pageCntSkip,
    }
  );

  const { data: productDatum01, refetch: productRefetch01 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        mainLimit,
        currentPage,
        limit,
        category: "사무실",
        moreCategory,
        moreLimit,
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        restroom1: inputRestroom1.value,
        restroom2: inputRestroom2.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip01,
    }
  );

  const { data: productDatum02, refetch: productRefetch02 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        mainLimit,
        currentPage,
        limit,
        category: "상가",
        moreCategory,
        moreLimit,
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        restroom1: inputRestroom1.value,
        restroom2: inputRestroom2.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip02,
    }
  );

  const { data: productDatum03, refetch: productRefetch03 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        mainLimit,
        currentPage,
        limit,
        category: "주택",
        moreCategory,
        moreLimit,
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        restroom1: inputRestroom1.value,
        restroom2: inputRestroom2.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip03,
    }
  );

  const { data: productDatum04, refetch: productRefetch04 } = useQuery(
    GET_PRODUCT_FOR_MAIN,
    {
      variables: {
        mainLimit,
        currentPage,
        limit,
        category: "매매",
        moreCategory,
        moreLimit,
        filterTab: currentFilterTab,
        starList,
        type: inputType.value,
        monthStart: inputMonthStart.value,
        monthEnd: inputMonthEnd.value,
        monthLimit: inputMonthLimit.value,
        depositStart: inputDepositStart.value,
        depositEnd: inputDepositEnd.value,
        depositLimit: inputDepositLimit.value,
        tradingStart: inputTradingStart.value,
        tradingEnd: inputTradingEnd.value,
        tradingLimit: inputTradingLimit.value,
        rightFeeStart: inputRightFeeStart.value,
        rightFeeEnd: inputRightFeeEnd.value,
        rightFeeLimit: inputRightFeeLimit.value,
        isRightFee: Boolean(inputIsRightFee.value),
        contractAreaStart: inputContractAreaStart.value,
        contractAreaEnd: inputContractAreaEnd.value,
        contractAreaLimit: inputContractAreaLimit.value,
        floor: inputFloor.value,
        isParking: inputIsParking.value,
        isElevator: inputIsElevator.value,
        restroom1: inputRestroom1.value,
        restroom2: inputRestroom2.value,
        isCeiling: Boolean(inputIsCeiling.value),
        buildingUse: inputBuildingUse.value,
        productType: inputProductType.value,
      },
      skip: productSkip04,
    }
  );

  ///////////// - USE MUTATION- /////////////
  const [addAcceptRecordMutation] = useMutation(ADD_ACCEPT_RECORD);
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

  const shareProductHandler = (text, result) => {
    if (result) {
      toast.notify("클립보드로 URL이 복사되었습니다.", {
        duration: 5,
        type: "success",
      });
    }
  };

  const closePageHandler = () => {
    setCurrentId("");
  };

  const _addAceeptRecord = async () => {
    if (typeof window === `undefined`) return;

    const d = new Date();
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    month = ("00" + month).slice(-2);
    date = ("00" + date).slice(-2);

    const regDate = year + month + date;

    const {
      data: { addAcceptRecord },
    } = await addAcceptRecordMutation({
      variables: {
        date: regDate,
      },
    });

    await sessionStorage.setItem("ALKJSDLJOQIUALSX", "LAZKNJXOIUQASDSA");
  };

  const changeFilterTabHandler = async (value) => {
    if (value === 0) {
      inputIsCeiling.setValue(false);
      inputBuildingUse.setValue("");
      inputProductType.setValue("");
    } else if (value === 1) {
      inputRightFeeText.setValue("전체");
      inputRightFeeStart.setValue(0);
      inputRightFeeEnd.setValue(20000);
      inputRightFeeLimit.setValue(true);
      inputIsRightFee.setValue(false);
      inputProductType.setValue("");
    } else if (value === 2) {
      inputType.setValue("");
      inputRightFeeText.setValue("전체");
      inputRightFeeStart.setValue(0);
      inputRightFeeEnd.setValue(20000);
      inputRightFeeLimit.setValue(true);
      inputIsRightFee.setValue(false);
      inputFloor.setValue("");
      inputIsCeiling.setValue(false);
      inputBuildingUse.setValue("");
    } else if (value === 3) {
      const starList = [];

      await Promise.all(
        Object.keys(cookies.cookies).map((key) => {
          if (key.includes("INSTA_STAR")) {
            starList.push(key.replace("INSTA_STAR_", ""));
          }
        })
      );
      setStarList(starList);
    }

    setCurrentFilterTab(value);
    setIsImageLoading(false);
    setCurrentPage(0);

    setTimeout(() => {
      setProductSkip01(false);
    }, 100);

    setTimeout(() => {
      setProductSkip02(false);
    }, 500);

    setTimeout(() => {
      setProductSkip03(false);
    }, 900);

    setTimeout(() => {
      setProductSkip04(false);
    }, 1400);
  };

  const changeValueHandler = (inputObj, value) => {
    inputObj.setValue(value);
  };

  const changeSliderHandler = (
    type,
    inputText,
    inputStart,
    inputEnd,
    inputLimit,
    setInputLimit,
    newValue,
    maxValue
  ) => {
    inputStart.setValue(newValue[0]);
    inputEnd.setValue(newValue[1]);

    let startText = "";
    let endText = "";

    if (type === "전용면적") {
      if (newValue[0] === 0 && newValue[1] === maxValue && inputLimit) {
        inputText.setValue("전체");
      } else {
        if (newValue[0] === 0) {
          startText = "최소";
        } else {
          startText = `${areaCalculation(newValue[0], 0)}㎡ (${newValue[0]}평)`;
        }

        if (newValue[1] === maxValue && inputLimit) {
          endText = "최대";
        } else {
          if (newValue[1] !== maxValue) setInputLimit(false);

          endText = `${areaCalculation(newValue[1], 0)}㎡ (${newValue[1]}평)`;
        }

        if (endText) inputText.setValue(startText + " ~ " + endText);
        else inputText.setValue(startText);
      }
    } else {
      if (newValue[0] === 0 && newValue[1] === maxValue && inputLimit) {
        inputText.setValue("전체");
      } else {
        if (newValue[0] === 0) {
          startText = "최소";
        } else {
          startText = priceUnitToKorean(newValue[0] * unitNumber["만"]);
        }

        if (newValue[1] === maxValue && inputLimit) {
          endText = "최대";
        } else {
          if (newValue[1] !== maxValue) setInputLimit(false);

          endText = priceUnitToKorean(newValue[1] * unitNumber["만"]);
        }

        if (endText) inputText.setValue(startText + " ~ " + endText);
        else inputText.setValue(startText);
      }
    }
  };

  const startFilterHandler = () => {
    setIsLoading(true);
    setIsImageLoading(false);

    setPages(null);
    setCurrentPage(0);
    setCurrentList(0);

    productRefetch00();
    tRefetch();
    cRefetch();

    setTimeout(() => {
      setIsFilter(true);
      setProductSkip00(false);
      setPageSkip(false);
      setPageCntSkip(false);

      if (size.width < 500) setIsFilterOpen(false);
    }, 500);
  };

  const resetFilterHandler = () => {
    setIsImageLoading(false);

    setCurrentFilterTab(0);

    inputType.setValue("");
    inputMonthText.setValue("전체");
    inputMonthStart.setValue(0);
    inputMonthEnd.setValue(1000);
    inputMonthLimit.setValue(true);
    inputDepositText.setValue("전체");
    inputDepositStart.setValue(0);
    inputDepositEnd.setValue(20000);
    inputDepositLimit.setValue(true);
    inputTradingText.setValue("전체");
    inputTradingStart.setValue(0);
    inputTradingEnd.setValue(300000);
    inputTradingLimit.setValue(true);
    inputRightFeeText.setValue("전체");
    inputRightFeeStart.setValue(0);
    inputRightFeeEnd.setValue(20000);
    inputIsRightFee.setValue(false);
    inputRightFeeLimit.setValue(true);
    inputContractAreaText.setValue("전체");
    inputContractAreaStart.setValue(0);
    inputContractAreaEnd.setValue(150);
    inputContractAreaLimit.setValue(true);
    inputFloor.setValue("");
    inputIsParking.setValue("");
    inputIsElevator.setValue("");
    inputRestroom1.setValue("");
    inputRestroom2.setValue("");
    inputIsCeiling.setValue(false);
    inputBuildingUse.setValue("");
    inputProductType.setValue("");

    const cookiesKey = Object.keys(cookies.cookies);

    cookiesKey.map((data, idx) => {
      if (data.includes("INSTAR_STAR")) {
        cookies.remove(data);
      }
    });

    setIsFilter(false);

    // setProductSkip01(false);
    // setProductSkip02(false);
    // setProductSkip03(false);
    // setProductSkip04(false);
    // setProductSkip05(false);
    // setProductSkip06(false);

    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);

    // timerList.push(timer);

    const timer1 = setTimeout(() => {
      setProductSkip01(false);
    }, 100);

    const timer2 = setTimeout(() => {
      setProductSkip02(false);
    }, 500);

    const timer3 = setTimeout(() => {
      setProductSkip03(false);
    }, 900);

    const timer4 = setTimeout(() => {
      setProductSkip04(false);
    }, 1400);

    const timer5 = setTimeout(() => {
      setIsImageChange(!isImageChange);
    }, 1800);

    timerList.push(timer1);
    timerList.push(timer2);
    timerList.push(timer3);
    timerList.push(timer4);
    timerList.push(timer5);
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
    setIsLoading(true);
    setCurrentList(list);
    setCurrentPage(page);

    const timer = setTimeout(() => {
      setProductSkip00(false);
    }, 100);

    timerList.push(timer);
  };

  const changePageHandler = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProductSkip00(false);
    }, 100);

    timerList.push(timer);
  };

  const moreCategoryHandler = (category) => {
    if (moreLoading) return;

    setMoreCategory(category);
    setMoreLimit(moreLimit + mainLimit);
    setMoreLoading(true);

    setTimeout(() => {
      if (category === "사무실") {
        setProductSkip01(false);
      } else if (category === "상가") {
        setProductSkip02(false);
      } else if (category === "주택") {
        setProductSkip03(false);
      } else if (category === "매매") {
        setProductSkip04(false);
      }
    }, 100);

    setTimeout(() => {
      setMoreLoading(false);
    }, 5000);
  };

  ////////////// - USE EFFECT- //////////////

  useEffect(() => {
    if (typeof window === `undefined`) return;

    const item = sessionStorage.getItem("ALKJSDLJOQIUALSX");

    if (item !== "LAZKNJXOIUQASDSA") {
      _addAceeptRecord();
    }

    scroll.scrollTo(0);

    setTimeout(() => {
      document.body.style.zoom = `74%`;
    }, 100);

    // setProductSkip01(false);
    // productRefetch01();

    // setProductSkip02(false);
    // productRefetch02();

    // setProductSkip03(false);
    // productRefetch03();

    // setProductSkip04(false);
    // productRefetch04();

    // setProductSkip05(false);
    // productRefetch05();

    // setProductSkip06(false);
    // productRefetch06();

    const timer1 = setTimeout(() => {
      setProductSkip01(false);
      productRefetch01();
    }, 100);

    const timer2 = setTimeout(() => {
      setProductSkip02(false);
      productRefetch02();
    }, 500);

    const timer3 = setTimeout(() => {
      setProductSkip03(false);
      productRefetch03();
    }, 900);

    const timer4 = setTimeout(() => {
      setProductSkip04(false);
      productRefetch04();
    }, 1400);

    timerList.push(timer1);
    timerList.push(timer2);
    timerList.push(timer3);
    timerList.push(timer4);

    return () => {
      timerList.map((data) => {
        clearTimeout(data);
      });
    };
  }, []);

  useEffect(() => {
    if (size.width) {
      setWidth(size.width);

      let slidesToShow;

      if (size.width < 800) {
        slidesToShow = 1;
      } else if (size.width < 1000) {
        slidesToShow = 2;
      } else if (size.width < 1350) {
        slidesToShow = 3;
      } else {
        slidesToShow = initSlidesToShow;
      }

      setSlidesToShow(slidesToShow);
    }
  }, [size.width]);

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

      setTimeout(
        () => {
          setIsImageLoading(true);
        },
        size.width < 500 ? 3000 : 7000
      );
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
    if (router.query.reset === "true") {
      resetFilterHandler();
      setCurrentId("");
      setMoreCategory("");
      setMoreLimit(mainLimit);
      setMoreLoading(false);

      router.push("/");
    }
  }, [router.query.reset]);

  useEffect(() => {
    if (productDatum00) {
      const timer1 = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      setViewProductDatum00(productDatum00.getProductForMain);
      setProductSkip00(true);

      setTimeout(() => {
        setIsImageChange(!isImageChange);
      }, 500);

      timerList.push(timer1);
    }
  }, [productDatum00]);

  useEffect(() => {
    if (tData) {
      const temp = [];

      for (let i = 0; i < tData.getProductTotalPageForMain; i++) temp.push(i);

      setPages(temp);
      setPageSkip(true);
    }
  }, [tData]);

  useEffect(() => {
    if (cData) {
      setPageCnt(cData.getProductTotalPageOnlyCntForMain);
      setPageCntSkip(true);
    }
  }, [cData]);

  useEffect(() => {
    if (productDatum01) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setMoreLoading(false);
      }, 100);

      timerList.push(timer);

      setViewProductDatum01(productDatum01.getProductForMain);
      setProductSkip01(true);
    }
  }, [productDatum01]);

  useEffect(() => {
    if (productDatum02) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setMoreLoading(false);
      }, 100);

      timerList.push(timer);

      setViewProductDatum02(productDatum02.getProductForMain);
      setProductSkip02(true);
    }
  }, [productDatum02]);

  useEffect(() => {
    if (productDatum03) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setMoreLoading(false);
      }, 100);

      timerList.push(timer);

      setViewProductDatum03(productDatum03.getProductForMain);
      setProductSkip03(true);
    }
  }, [productDatum03]);

  useEffect(() => {
    if (productDatum04) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setMoreLoading(false);
      }, 100);

      timerList.push(timer);

      setViewProductDatum04(productDatum04.getProductForMain);
      setProductSkip04(true);
    }
  }, [productDatum04]);

  // useEffect(() => {
  //   if (
  //     viewProductDatum01 &&
  //     viewProductDatum02 &&
  //     viewProductDatum03 &&
  //     viewProductDatum04 &&
  //     viewProductDatum05 &&
  //     viewProductDatum06
  //   ) {
  //     const timer = setTimeout(() => {
  //       setIsImageLoading(true);
  //     }, 3000);

  //     timerList.push(timer);
  //   }
  // }, [
  //   viewProductDatum01,
  //   viewProductDatum02,
  //   viewProductDatum03,
  //   viewProductDatum04,
  //   viewProductDatum05,
  //   viewProductDatum06,
  // ]);

  // useEffect(() => {
  //   if (menuDatum && productDatum) {
  //     const menu = menuDatum.getHeaderMenus.filter((data) => {
  //       return data.isProduct;
  //     });

  //     const array = [];

  //     menu.map(async (data) => {
  //       array.push({
  //         name: data.name,
  //         list: productDatum.getProduct.filter(async (productData) => {
  //           if (!productData.categoryList[0]) return false;

  //           const resultList = productData.categoryList.filter(
  //             (categoryData) => {
  //               if (categoryData.parentMenu.name === "홍대사무실 테마별") {
  //                 return (
  //                   categoryData.name === "甲인테리어 사무실" &&
  //                   categoryData.parentMenu._id === data._id
  //                 );
  //               } else if (categoryData.parentMenu.name === "홍대상가 테마별") {
  //                 return (
  //                   categoryData.name === "甲인테리어 상가" &&
  //                   categoryData.parentMenu._id === data._id
  //                 );
  //               } else {
  //                 return categoryData.parentMenu._id === data._id;
  //               }
  //             }
  //           );

  //           let flag = true;

  //           await Promise.all(
  //             array.map((data2) => {
  //               data2.list.filter((data3) => {
  //                 console.log(data3);
  //               });
  //             })
  //           );

  //           return resultList.length > 0 && flag;
  //         }),
  //       });
  //     });
  //     array.map((data, idx) => {
  //       array[idx].list = data.list.slice(0, 20);
  //     });

  //     setViewProductDatum(array);
  //   } else {
  //     menuRefetch();
  //     productRefetch();
  //   }
  // }, [menuDatum, productDatum]);

  return (
    <>
      {/* <MM00Search /> */}
      <MM00Presenter
        cookies={cookies}
        //
        width={width}
        currentList={currentList}
        currentPage={currentPage}
        pages={pages}
        limit={limit}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isImageLoading={isImageLoading}
        isImageChange={isImageChange}
        imageIndex={imageIndex}
        inputSearch={inputSearch}
        currentImage={currentImage}
        isViewerOpen={isViewerOpen}
        images={images}
        slidesToShow={slidesToShow}
        currentId={currentId}
        setCurrentId={setCurrentId}
        moreCategory={moreCategory}
        moreLoading={moreLoading}
        isFilter={isFilter}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        currentFilterTab={currentFilterTab}
        setCurrentFilterTab={setCurrentFilterTab}
        contractAreaMode={contractAreaMode}
        setContractAreaMode={setContractAreaMode}
        inputType={inputType}
        inputMonthText={inputMonthText}
        inputMonthStart={inputMonthStart}
        inputMonthEnd={inputMonthEnd}
        inputMonthLimit={inputMonthLimit}
        inputDepositText={inputDepositText}
        inputDepositStart={inputDepositStart}
        inputDepositEnd={inputDepositEnd}
        inputDepositLimit={inputDepositLimit}
        inputTradingText={inputTradingText}
        inputTradingStart={inputTradingStart}
        inputTradingEnd={inputTradingEnd}
        inputTradingLimit={inputTradingLimit}
        inputRightFeeText={inputRightFeeText}
        inputRightFeeStart={inputRightFeeStart}
        inputRightFeeEnd={inputRightFeeEnd}
        inputRightFeeLimit={inputRightFeeLimit}
        inputIsRightFee={inputIsRightFee}
        inputContractAreaText={inputContractAreaText}
        inputContractAreaStart={inputContractAreaStart}
        inputContractAreaEnd={inputContractAreaEnd}
        inputContractAreaLimit={inputContractAreaLimit}
        inputFloor={inputFloor}
        inputIsParking={inputIsParking}
        inputIsElevator={inputIsElevator}
        inputRestroom1={inputRestroom1}
        inputRestroom2={inputRestroom2}
        inputIsCeiling={inputIsCeiling}
        inputBuildingUse={inputBuildingUse}
        inputProductType={inputProductType}
        //
        // mainBannerData={mainBannerData && mainBannerData.getMainBanner}
        // bestProductDatum={bestProductDatum && bestProductDatum.getProductByBest}
        productDatum00={viewProductDatum00}
        productDatum01={viewProductDatum01}
        productDatum02={viewProductDatum02}
        productDatum03={viewProductDatum03}
        productDatum04={viewProductDatum04}
        //
        _moveLinkHandler={_moveLinkHandler}
        searchProductHandler={searchProductHandler}
        imageViewerHandler={imageViewerHandler}
        imageViewerPrevHandler={imageViewerPrevHandler}
        imageViewerNextHandler={imageViewerNextHandler}
        imageViewerGotoHandler={imageViewerGotoHandler}
        imageViewerClickHandler={imageViewerClickHandler}
        updateProductStarHandler={updateProductStarHandler}
        shareProductHandler={shareProductHandler}
        closePageHandler={closePageHandler}
        changeFilterTabHandler={changeFilterTabHandler}
        changeValueHandler={changeValueHandler}
        changeSliderHandler={changeSliderHandler}
        startFilterHandler={startFilterHandler}
        resetFilterHandler={resetFilterHandler}
        prevAndNextPageChangeHandler={prevAndNextPageChangeHandler}
        changePageHandler={changePageHandler}
        moreCategoryHandler={moreCategoryHandler}
      />
    </>
  );
};

export default withCookies(MM00Container);
