import React, { useEffect, useState, useRef } from "react";
import AD16Presenter from "./AD16Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_SUB_MENU_FOR_PRODUCT,
  GET_PRODUCTDETAIL,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "./AD16Queries.js";
import { toast } from "react-nextjs-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useInput from "../../../../Components/Hooks/useInput";
import useOnlyNumberInput from "../../../../Components/Hooks/useOnlyNumberInput";
import { areaCalculation2 } from "../../../../commonUtils";
import { useRouter } from "next/router";
import { resizeImage } from "../../../../commonUtils";
import storageFn from "../../../../fsStorage";
import { rewritePath } from "../../../../../src/proxy.ts";
import fetch from "isomorphic-unfetch";
import axios from "axios";

export default ({}) => {
  ////////////// - VARIABLE- ////////////////
  const router = useRouter();
  const query = router.query;

  const unitNumber = {
    "": 1,
    만: 10000,
    억: 100000000,
    조: 1000000000000,
  };

  ////////////// - USE REF- ////////////////
  const thumbnailRef = useRef();
  const fileDropRef = useRef();

  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [currentSubTab, setCurrentSubTab] = useState(0);
  const [currentData, setCurrentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isPostCode, setIsPostCode] = useState(false);
  const [productSkip, setProductSkip] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const inputProductType = useInput("");
  const inputBuildingType = useInput("");
  const inputBuildingUse = useInput("");
  const inputAddress = useInput("");
  const inputRoadAddress = useInput("");
  const inputDetailAddress = useInput("");
  const inputSubwayTime = useOnlyNumberInput("");
  const inputSubwayTime2 = useOnlyNumberInput("");
  const inputSubwayCarTime = useOnlyNumberInput("");
  const inputSubwayCarTime2 = useOnlyNumberInput("");
  const inputSubwayName = useInput("");
  const inputSubwayName2 = useInput("");
  const inputViewAddress = useInput("");
  const inputAddressLat = useInput("");
  const inputAddressLng = useInput("");
  const inputPriceType = useInput("월세");
  const inputPrice1 = useInput("");
  const inputPriceUnit1 = useInput("만");
  const inputPrice2 = useInput("");
  const inputPriceUnit2 = useInput("만");
  const inputPriceCheck = useInput(false);
  const inputIsManagementFee = useInput(true);
  const inputManagementFee = useInput("");
  const inputManagementFeeUnit = useInput("만");
  const inputIsRightFee = useInput(true);
  const inputRightFee = useInput("");
  const inputRightFeeUnit = useInput("만");
  const inputPyeongPrice = useInput("");
  const inputPyeongPriceUnit = useInput("만");
  const inputTotalFloor = useInput("");
  const inputFloor = useInput("");
  const inputFloorCheck = useInput("");
  const inputRealArea = useInput("");
  const inputContractArea = useInput("");
  const inputContractArea2 = useInput("");
  const inputDedicatedArea = useInput("");
  const inputDedicatedArea2 = useInput("");
  const inputGroundArea = useInput("");
  const inputGroundArea2 = useInput("");
  const inputIsParking = useInput(false);
  const inputParkingNumber = useOnlyNumberInput("");
  const inputTotalParkingNumber = useOnlyNumberInput("");
  const inputParkType1 = useOnlyNumberInput("");
  const inputParkType2 = useOnlyNumberInput("");
  const inputIsElevator = useInput(false);
  const inputElevatorNumber = useOnlyNumberInput("");
  const inputIsHeating = useInput(false);
  const inputHeatingType = useInput("없음");
  const inputMoveInDate = useInput("");
  const inputMoveInDateText = useInput("");
  const inputEntranceDirection = useInput("남동");
  const inputUseApprovalDate1 = useOnlyNumberInput("");
  const inputUseApprovalDate2 = useOnlyNumberInput("");
  const inputUseApprovalDate3 = useOnlyNumberInput("");
  const inputRestroom = useInput("외부(남여구분)");
  const inputUsage = useInput("");
  const inputRoomNumber = useOnlyNumberInput("");
  const inputIsCeiling = useInput(false);
  const inputTitle = useInput("");
  const inputDescription = useInput("");
  const inputListTitle = useInput("");
  const inputListSubTitle = useInput("");
  const inputAdditionalContent = useInput("");
  const inputContent = useInput("");
  const inputPrivateAddress = useInput("");
  const inputPrivateTel = useInput("");
  const inputPrivateTel2 = useInput("");
  const inputMemo = useInput("");
  const inputPrivateRemark = useInput("");
  const inputThumbnailPath = useInput("");
  const inputDetailImagePaths = useInput([]);
  const inputCategoryList = useInput([]);
  const inputCategoryNameList = useInput([]);

  const inputImageSort = useOnlyNumberInput("");
  const inputCurrentImageSort = useOnlyNumberInput("");

  ////////////// - USE QUERY- ///////////////
  const { data: subMenuDatum, refetch: subMenuRefetch } = useQuery(
    GET_SUB_MENU_FOR_PRODUCT
  );

  const { data: productData, refetch: productRefetch } = useQuery(
    GET_PRODUCTDETAIL,
    {
      variables: {
        id: query.key || "",
      },
      skip: productSkip,
    }
  );

  ///////////// - USE MUTATION- /////////////
  const [createProductMutation] = useMutation(CREATE_PRODUCT);
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT);

  ///////////// - EVENT HANDLER- ////////////
  const initSettingHandler = () => {
    inputProductType.setValue("");
    inputBuildingType.setValue("");
    inputBuildingUse.setValue("");
    inputAddress.setValue("");
    inputRoadAddress.setValue("");
    inputDetailAddress.setValue("");
    inputSubwayTime.setValue("");
    inputSubwayTime2.setValue("");
    inputSubwayCarTime.setValue("");
    inputSubwayCarTime2.setValue("");
    inputSubwayName.setValue("");
    inputSubwayName2.setValue("");
    inputViewAddress.setValue("");
    inputAddressLat.setValue("");
    inputAddressLng.setValue("");
    inputPriceType.setValue("월세");
    inputPrice1.setValue("");
    inputPriceUnit1.setValue("만");
    inputPrice2.setValue("");
    inputPriceUnit2.setValue("만");
    inputPriceCheck.setValue(false);
    inputIsManagementFee.setValue(true);
    inputManagementFee.setValue("");
    inputManagementFeeUnit.setValue("만");
    inputIsRightFee.setValue(true);
    inputRightFee.setValue("");
    inputRightFeeUnit.setValue("만");
    inputPyeongPrice.setValue("");
    inputPyeongPriceUnit.setValue("만");
    inputTotalFloor.setValue("");
    inputFloor.setValue("");
    inputFloorCheck.setValue("");
    inputRealArea.setValue("");
    inputContractArea.setValue("");
    inputContractArea2.setValue("");
    inputDedicatedArea.setValue("");
    inputDedicatedArea2.setValue("");
    inputGroundArea.setValue("");
    inputGroundArea2.setValue("");
    inputIsParking.setValue(false);
    inputParkingNumber.setValue("");
    inputTotalParkingNumber.setValue("");
    inputParkType1.setValue("");
    inputParkType2.setValue("");
    inputIsElevator.setValue(false);
    inputElevatorNumber.setValue("");
    inputIsHeating.setValue(false);
    inputHeatingType.setValue("없음");
    inputMoveInDate.setValue("");
    inputMoveInDateText.setValue("");
    inputEntranceDirection.setValue("남동");
    inputUseApprovalDate1.setValue("");
    inputUseApprovalDate2.setValue("");
    inputUseApprovalDate3.setValue("");
    inputRestroom.setValue("외부(남여구분)");
    inputUsage.setValue("");
    inputRoomNumber.setValue("");
    inputIsCeiling.setValue(false);
    inputTitle.setValue("");
    inputDescription.setValue("");
    inputListTitle.setValue("");
    inputListSubTitle.setValue("");
    inputAdditionalContent.setValue("");
    inputContent.setValue("");
    inputPrivateAddress.setValue("");
    inputPrivateTel.setValue("");
    inputPrivateTel2.setValue("");
    inputMemo.setValue("");
    inputPrivateRemark.setValue("");
    inputThumbnailPath.setValue("");
    inputDetailImagePaths.setValue([]);
    inputCategoryList.setValue([]);
    inputCategoryNameList.setValue([]);

    inputImageSort.setValue("");
    inputCurrentImageSort.setValue("");
  };

  const fileChangeHandler = async (e) => {
    setIsLoading(true);

    const file = e.target.files[0];

    if (!file) {
      setIsLoading(false);
      return;
    }

    const db_path = await resizeImage(
      "INSTA-ESTATE/uploads/productThumbnail",
      file,
      300,
      null
    );

    inputThumbnailPath.setValue(db_path);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const fileChangeHandler2 = async (e) => {
    setIsLoading(true);

    const file = e.target.files[0];

    if (!file) {
      setIsLoading(false);
      return;
    }

    const db_path = await resizeImage(
      "INSTA-ESTATE/uploads/productDetail__v2",
      file,
      500,
      null
    );

    inputDetailImagePaths.setValue([...inputDetailImagePaths.value, db_path]);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const fileDropHandler = async (e) => {
    setIsLoading(true);

    const detailImagePaths = await fileDropHandlerPromise(e.dataTransfer.files);

    setTimeout(() => {
      inputDetailImagePaths.setValue([
        ...inputDetailImagePaths.value,
        ...detailImagePaths,
      ]);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 500);
  };

  const fileDropHandlerPromise = (files) => {
    return new Promise(async (resolve, reject) => {
      const detailImagePaths = [];

      for await (let file of files) {
        if (!file) {
          continue;
        }

        const db_path = await resizeImage(
          "INSTA-ESTATE/uploads/productDetail__v2",
          file,
          500,
          null
        );

        detailImagePaths.push(db_path);
      }

      resolve(detailImagePaths);
    });
  };

  const removeDetailImageHandler = (idx) => {
    inputDetailImagePaths.value.splice(idx, 1);

    inputDetailImagePaths.setValue([...inputDetailImagePaths.value]);
  };

  const changeCategoryHandler = (e) => {
    const value = e.target.value;

    const menuId = value.split("/")[0];
    const subMenuId = value.split("/")[1];

    const mainMenu = subMenuDatum.getSubMenuForProduct.filter((data) => {
      return data._id === menuId;
    })[0];

    const categoryName = mainMenu.subMenu.filter((data) => {
      return data._id === subMenuId;
    })[0].name;

    inputCategoryList.setValue([...inputCategoryList.value, e.target.value]);
    inputCategoryNameList.setValue([
      ...inputCategoryNameList.value,
      categoryName,
    ]);
  };

  const removeCategoryHandler = (idx) => {
    inputCategoryList.value.splice(idx, 1);
    inputCategoryNameList.value.splice(idx, 1);

    inputCategoryList.setValue([...inputCategoryList.value]);
    inputCategoryNameList.setValue([...inputCategoryNameList.value]);
  };

  const createProductHandler = async () => {
    if (typeof window === `undefined`) return;

    if (currentSubTab === 0) {
      if (!inputProductType.value) {
        toast.notify("매물 종류를 선택해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputBuildingType.value) {
        toast.notify("건물 유형을 선택해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
    }

    if (!inputBuildingUse.value) {
      toast.notify("건물 형태를 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputAddress.value || inputAddress.value.trim() === "") {
      toast.notify("주소를 검색해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    // if (!inputViewAddress.value || inputViewAddress.value.trim() === "") {
    // toast.notify("소재지를 입력해주세요.", {
    //   duration: 5,
    //   type: "error",
    // });
    //   return;
    // }

    if (!inputSubwayName.value || inputSubwayName.value.trim() === "") {
      toast.notify("인근 전철역을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      (!inputSubwayTime.value || inputSubwayTime.value.trim() === "") &&
      (!inputSubwayCarTime.value || inputSubwayCarTime.value.trim() === "")
    ) {
      toast.notify("인근 전철역 도보 또는 차량을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputPriceType.value || inputPriceType.value.trim() === "") {
      toast.notify("기본정보 - 유형을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (inputPriceType.value === "월세") {
      if (!inputPrice1.value || inputPrice1.value.trim() === "") {
        toast.notify("보증금을 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPriceUnit1.value || inputPriceUnit1.value.trim() === "") {
        toast.notify("보증금 단위를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPrice2.value || inputPrice2.value.trim() === "") {
        toast.notify("월세를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPriceUnit2.value || inputPriceUnit2.value.trim() === "") {
        toast.notify("월세 단위를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
    } else if (inputPriceType.value === "전세") {
      if (!inputPrice1.value || inputPrice1.value.trim() === "") {
        toast.notify("전세금을 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPriceUnit1.value || inputPriceUnit1.value.trim() === "") {
        toast.notify("전세금 단위를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
    } else if (inputPriceType.value === "매매") {
      if (!inputPrice1.value || inputPrice1.value.trim() === "") {
        toast.notify("매매가를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPriceUnit1.value || inputPriceUnit1.value.trim() === "") {
        toast.notify("매매가 단위를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
    }

    if (
      inputIsManagementFee.value &&
      (!inputManagementFee.value || inputManagementFee.value.trim() === "")
    ) {
      toast.notify("관리비를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputIsManagementFee.value &&
      (!inputManagementFeeUnit.value ||
        inputManagementFeeUnit.value.trim() === "")
    ) {
      toast.notify("관리비 단위를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputIsRightFee.value &&
      (!inputRightFee.value || inputRightFee.value.trim() === "")
    ) {
      toast.notify("권리금을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputIsRightFee.value &&
      (!inputRightFeeUnit.value || inputRightFeeUnit.value.trim() === "")
    ) {
      toast.notify("권리금 단위를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputTotalFloor.value || inputTotalFloor.value.trim() === "") {
      toast.notify("전체 층수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (inputFloorCheck.value === "" && !inputFloor.value) {
      toast.notify("해당 층수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    // if (!inputRealArea.value || inputRealArea.value.trim() === "") {
    // toast.notify("실면적을 입력해주세요.", {
    //   duration: 5,
    //   type: "error",
    // });
    //   return;
    // }

    if (!inputContractArea.value || inputContractArea.value.trim() === "") {
      toast.notify("전용면적을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputDedicatedArea.value || inputDedicatedArea.value.trim() === "") {
      toast.notify("공급면적을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (inputPriceType.value === "매매") {
      if (!inputGroundArea.value || inputGroundArea.value.trim() === "") {
        toast.notify("대지면적을 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPyeongPrice.value || inputPyeongPrice.value.trim() === "") {
        toast.notify("평당매매가를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (
        inputPyeongPrice.value &&
        (!inputPyeongPriceUnit.value ||
          inputPyeongPriceUnit.value.trim() === "")
      ) {
        toast.notify("평당매매가 단위를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
    }

    if (
      inputIsParking.value &&
      (!inputParkingNumber.value || inputParkingNumber.value.trim() === "")
    ) {
      toast.notify("주차가능 대수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputIsParking.value &&
      (!inputTotalParkingNumber.value ||
        inputTotalParkingNumber.value.trim() === "")
    ) {
      toast.notify("총주차 대수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputIsElevator.value &&
      (!inputElevatorNumber.value || inputElevatorNumber.value.trim() === "")
    ) {
      toast.notify("엘리베이터 대수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputMoveInDate.value) {
      toast.notify("입주가능일을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputMoveInDate.value === "직접입력" &&
      (!inputMoveInDateText.value || inputMoveInDateText.value.trim() === "")
    ) {
      toast.notify("입주가능일을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      !inputUseApprovalDate1.value ||
      inputUseApprovalDate1.value.trim() === ""
    ) {
      toast.notify("사용승인일을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      !inputUseApprovalDate2.value ||
      inputUseApprovalDate2.value.trim() === ""
    ) {
      toast.notify("사용승인일을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      !inputUseApprovalDate3.value ||
      inputUseApprovalDate3.value.trim() === ""
    ) {
      toast.notify("사용승인일을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputUsage.value || inputUsage.value.trim() === "") {
      toast.notify("건축물 용도를 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputRoomNumber.value || inputRoomNumber.value.trim() === "") {
      toast.notify("룸갯수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputTitle.value || inputTitle.value.trim() === "") {
      toast.notify("제목을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputDescription.value || inputDescription.value.trim() === "") {
      toast.notify("상세설명을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputListTitle.value || inputListTitle.value.trim() === "") {
      toast.notify("부가제목을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputListSubTitle.value || inputListSubTitle.value.trim() === "") {
      toast.notify("부가설명을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    // if (!inputThumbnailPath.value) {
    // toast.notify("썸네일을 등록해주세요.", {
    //   duration: 5,
    //   type: "error",
    // });
    //   return;
    // }

    if (inputDetailImagePaths.value.length < 1) {
      toast.notify("매물 사진을 1개 이상 등록해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (isLoading) {
      toast.notify("파일을 업로드 중입니다. 잠시만 기다려주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    setIsCreateLoading(true);

    if (isCreateLoading) return;

    setTimeout(async () => {
      const { data } = await createProductMutation({
        variables: {
          categoryList: inputCategoryList.value.map((data) => {
            return data.split("/")[1];
          }),
          manager: sessionStorage.getItem("DLIUQUXMSUDLQJXS"),
          productType: inputProductType.value,
          buildingUse: inputBuildingUse.value,
          buildingType: inputBuildingType.value,
          address: inputAddress.value,
          roadAddress: inputRoadAddress.value,
          detailAddress: inputDetailAddress.value,
          subwayTime: inputSubwayTime.value,
          subwayTime2: inputSubwayTime2.value,
          subwayCarTime: inputSubwayCarTime.value,
          subwayCarTime2: inputSubwayCarTime2.value,
          subwayName: inputSubwayName.value,
          subwayName2: inputSubwayName2.value,
          viewAddress: inputViewAddress.value,
          addressLat: inputAddressLat.value,
          addressLng: inputAddressLng.value,
          isMonthly: inputPriceType.value === "월세",
          monthlyDeposit:
            inputPriceType.value === "월세" ? inputPrice1.value : "",
          monthlyDepositUnit:
            inputPriceType.value === "월세" ? inputPriceUnit1.value : "",
          monthlyPrice:
            inputPriceType.value === "월세" ? inputPrice2.value : "",
          monthlyPriceUnit:
            inputPriceType.value === "월세" ? inputPriceUnit2.value : "",
          isMonthlyCheck:
            inputPriceType.value === "월세"
              ? Boolean(inputPriceCheck.value)
              : false,
          isJeonse: inputPriceType.value === "전세",
          jeonseDeposit:
            inputPriceType.value === "전세" ? inputPrice1.value : "",
          jeonseDepositUnit:
            inputPriceType.value === "전세" ? inputPriceUnit1.value : "",
          isJeonseCheck:
            inputPriceType.value === "전세"
              ? Boolean(inputPriceCheck.value)
              : false,
          isTrading: inputPriceType.value === "매매",
          tradingPrice:
            inputPriceType.value === "매매" ? inputPrice1.value : "",
          tradingPriceUnit:
            inputPriceType.value === "매매" ? inputPriceUnit1.value : "",
          isTradingCheck:
            inputPriceType.value === "매매"
              ? Boolean(inputPriceCheck.value)
              : false,
          isManagementFee: inputIsManagementFee.value,
          managementFee: inputManagementFee.value,
          managementFeeUnit: inputManagementFeeUnit.value,
          isRightFee: inputIsRightFee.value,
          rightFee: inputRightFee.value,
          rightFeeUnit: inputRightFeeUnit.value,
          pyeongPrice: inputPyeongPrice.value,
          pyeongPriceUnit: inputPyeongPriceUnit.value,
          totalFloor: inputTotalFloor.value + "층",
          floor: inputFloor.value
            ? inputFloor.value + "층"
            : inputFloorCheck.value,
          realArea: inputRealArea.value,
          contractArea: inputContractArea.value,
          dedicatedArea: inputDedicatedArea.value,
          groundArea: inputGroundArea.value,
          isParking: inputIsParking.value,
          parkingNumber: inputParkingNumber.value,
          totalParkingNumber: inputTotalParkingNumber.value,
          parkType1: inputParkType1.value,
          parkType2: inputParkType2.value,
          isElevator: inputIsElevator.value,
          elevatorNumber: inputElevatorNumber.value,
          isHeating: inputIsHeating.value,
          heatingType: inputHeatingType.value,
          moveInDate:
            inputMoveInDate.value === "직접입력"
              ? inputMoveInDateText.value
              : inputMoveInDate.value,
          entranceDirection: inputEntranceDirection.value,
          useApprovalDate:
            inputUseApprovalDate1.value +
            "-" +
            inputUseApprovalDate2.value +
            "-" +
            inputUseApprovalDate3.value,
          restroom: inputRestroom.value,
          usage: inputUsage.value,
          roomNumber: inputRoomNumber.value,
          isCeiling: inputIsCeiling.value,
          title: inputTitle.value,
          description: inputDescription.value,
          listTitle: inputListTitle.value,
          listSubTitle: inputListSubTitle.value,
          additionalContent: inputAdditionalContent.value,
          content: inputContent.value,
          privateAddress: inputPrivateAddress.value,
          privateTel: inputPrivateTel.value,
          privateTel2: inputPrivateTel2.value,
          memo: inputMemo.value,
          privateRemark: inputPrivateRemark.value,
          thumbnailPath: inputThumbnailPath.value || "-",
          detailImagePaths: inputDetailImagePaths.value,
        },
      });

      if (data.createProduct) {
        if (sessionStorage.getItem("XLJHALKJQLIUXMXA") == 1) {
          toast.notify("매물이 정상적으로 등록되었습니다.", {
            duration: 5,
            type: "success",
          });
          router.push(`/admin/totalProductManagement`);
        } else {
          // toast.notify("매물이 등록되었습니다. 승인완료 후 매물을 확인하실 수 있습니다.", {
          //   duration: 5,
          //   type: "info",
          // });
          toast.notify("매물이 정상적으로 등록되었습니다.", {
            duration: 5,
            type: "success",
          });
          router.push(`/admin/productManagement`);
        }
        return;
      } else {
        setIsCreateLoading(false);
        toast.notify("잠시 후 다시 시도해주세요.", {
          duration: 5,
          type: "error",
        });
      }
    }, 100);
  };

  const updateProductHandler = async () => {
    if (typeof window === `undefined`) return;

    if (currentSubTab === 0) {
      if (!inputProductType.value) {
        toast.notify("매물 종류를 선택해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputBuildingType.value) {
        toast.notify("건물 유형을 선택해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
    }

    if (!inputBuildingUse.value) {
      toast.notify("건물 형태를 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputAddress.value || inputAddress.value.trim() === "") {
      toast.notify("주소를 검색해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    // if (!inputViewAddress.value || inputViewAddress.value.trim() === "") {
    // toast.notify("소재지를 입력해주세요.", {
    //   duration: 5,
    //   type: "error",
    // });
    //   return;
    // }

    if (!inputSubwayName.value || inputSubwayName.value.trim() === "") {
      toast.notify("인근 전철역을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      (!inputSubwayTime.value || inputSubwayTime.value.trim() === "") &&
      (!inputSubwayCarTime.value || inputSubwayCarTime.value.trim() === "")
    ) {
      toast.notify("인근 전철역 도보 또는 차량을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputPriceType.value || inputPriceType.value.trim() === "") {
      toast.notify("기본정보 - 유형을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (inputPriceType.value === "월세") {
      if (!inputPrice1.value || inputPrice1.value.trim() === "") {
        toast.notify("보증금을 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPriceUnit1.value || inputPriceUnit1.value.trim() === "") {
        toast.notify("보증금 단위를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPrice2.value || inputPrice2.value.trim() === "") {
        toast.notify("월세를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPriceUnit2.value || inputPriceUnit2.value.trim() === "") {
        toast.notify("월세 단위를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
    } else if (inputPriceType.value === "전세") {
      if (!inputPrice1.value || inputPrice1.value.trim() === "") {
        toast.notify("전세금을 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPriceUnit1.value || inputPriceUnit1.value.trim() === "") {
        toast.notify("전세금 단위를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
    } else if (inputPriceType.value === "매매") {
      if (!inputPrice1.value || inputPrice1.value.trim() === "") {
        toast.notify("매매가를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPriceUnit1.value || inputPriceUnit1.value.trim() === "") {
        toast.notify("매매가 단위를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
    }

    if (
      inputIsManagementFee.value &&
      (!inputManagementFee.value || inputManagementFee.value.trim() === "")
    ) {
      toast.notify("관리비를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputIsManagementFee.value &&
      (!inputManagementFeeUnit.value ||
        inputManagementFeeUnit.value.trim() === "")
    ) {
      toast.notify("관리비 단위를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputIsRightFee.value &&
      (!inputRightFee.value || inputRightFee.value.trim() === "")
    ) {
      toast.notify("권리금을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputIsRightFee.value &&
      (!inputRightFeeUnit.value || inputRightFeeUnit.value.trim() === "")
    ) {
      toast.notify("권리금 단위를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputTotalFloor.value || inputTotalFloor.value.trim() === "") {
      toast.notify("전체 층수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (inputFloorCheck.value === "" && !inputFloor.value) {
      toast.notify("해당 층수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    // if (!inputRealArea.value || inputRealArea.value.trim() === "") {
    // toast.notify("실면적을 입력해주세요.", {
    //   duration: 5,
    //   type: "error",
    // });
    //   return;
    // }

    if (!inputContractArea.value || inputContractArea.value.trim() === "") {
      toast.notify("전용면적을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputDedicatedArea.value || inputDedicatedArea.value.trim() === "") {
      toast.notify("공급면적을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (inputPriceType.value === "매매") {
      if (!inputGroundArea.value || inputGroundArea.value.trim() === "") {
        toast.notify("대지면적을 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (!inputPyeongPrice.value || inputPyeongPrice.value.trim() === "") {
        toast.notify("평당매매가를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }

      if (
        inputPyeongPrice.value &&
        (!inputPyeongPriceUnit.value ||
          inputPyeongPriceUnit.value.trim() === "")
      ) {
        toast.notify("평당매매가 단위를 입력해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
    }

    if (
      inputIsParking.value &&
      (!inputParkingNumber.value || inputParkingNumber.value.trim() === "")
    ) {
      toast.notify("주차가능 대수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputIsParking.value &&
      (!inputTotalParkingNumber.value ||
        inputTotalParkingNumber.value.trim() === "")
    ) {
      toast.notify("총주차 대수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputIsElevator.value &&
      (!inputElevatorNumber.value || inputElevatorNumber.value.trim() === "")
    ) {
      toast.notify("엘리베이터 대수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputMoveInDate.value) {
      toast.notify("입주가능일을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      inputMoveInDate.value === "직접입력" &&
      (!inputMoveInDateText.value || inputMoveInDateText.value.trim() === "")
    ) {
      toast.notify("입주가능일을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      !inputUseApprovalDate1.value ||
      inputUseApprovalDate1.value.trim() === ""
    ) {
      toast.notify("사용승인일을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      !inputUseApprovalDate2.value ||
      inputUseApprovalDate2.value.trim() === ""
    ) {
      toast.notify("사용승인일을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      !inputUseApprovalDate3.value ||
      inputUseApprovalDate3.value.trim() === ""
    ) {
      toast.notify("사용승인일을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputUsage.value || inputUsage.value.trim() === "") {
      toast.notify("건축물 용도를 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputRoomNumber.value || inputRoomNumber.value.trim() === "") {
      toast.notify("룸갯수를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputTitle.value || inputTitle.value.trim() === "") {
      toast.notify("제목을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputDescription.value || inputDescription.value.trim() === "") {
      toast.notify("상세설명을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputListTitle.value || inputListTitle.value.trim() === "") {
      toast.notify("부가제목을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputListSubTitle.value || inputListSubTitle.value.trim() === "") {
      toast.notify("부가설명을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    // if (!inputThumbnailPath.value) {
    // toast.notify("썸네일을 등록해주세요.", {
    //   duration: 5,
    //   type: "error",
    // });
    //   return;
    // }

    if (inputDetailImagePaths.value.length < 1) {
      toast.notify("매물 사진을 1개 이상 등록해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (isLoading) {
      toast.notify("파일을 업로드 중입니다. 잠시만 기다려주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const { data } = await updateProductMutation({
      variables: {
        id: query.key,
        categoryList: inputCategoryList.value.map((data) => {
          return data.split("/")[1];
        }),
        productType: inputProductType.value,
        buildingUse: inputBuildingUse.value,
        buildingType: inputBuildingType.value,
        address: inputAddress.value,
        roadAddress: inputRoadAddress.value,
        detailAddress: inputDetailAddress.value,
        subwayTime: inputSubwayTime.value,
        subwayTime2: inputSubwayTime2.value,
        subwayCarTime: inputSubwayCarTime.value,
        subwayCarTime2: inputSubwayCarTime2.value,
        subwayName: inputSubwayName.value,
        subwayName2: inputSubwayName2.value,
        viewAddress: inputViewAddress.value,
        addressLat: inputAddressLat.value,
        addressLng: inputAddressLng.value,
        isMonthly: inputPriceType.value === "월세",
        monthlyDeposit:
          inputPriceType.value === "월세" ? inputPrice1.value : "",
        monthlyDepositUnit:
          inputPriceType.value === "월세" ? inputPriceUnit1.value : "",
        monthlyPrice: inputPriceType.value === "월세" ? inputPrice2.value : "",
        monthlyPriceUnit:
          inputPriceType.value === "월세" ? inputPriceUnit2.value : "",
        isMonthlyCheck:
          inputPriceType.value === "월세"
            ? Boolean(inputPriceCheck.value)
            : false,
        isJeonse: inputPriceType.value === "전세",
        jeonseDeposit: inputPriceType.value === "전세" ? inputPrice1.value : "",
        jeonseDepositUnit:
          inputPriceType.value === "전세" ? inputPriceUnit1.value : "",
        isJeonseCheck:
          inputPriceType.value === "전세"
            ? Boolean(inputPriceCheck.value)
            : false,
        isTrading: inputPriceType.value === "매매",
        tradingPrice: inputPriceType.value === "매매" ? inputPrice1.value : "",
        tradingPriceUnit:
          inputPriceType.value === "매매" ? inputPriceUnit1.value : "",
        isTradingCheck:
          inputPriceType.value === "매매"
            ? Boolean(inputPriceCheck.value)
            : false,
        isManagementFee: inputIsManagementFee.value,
        managementFee: inputManagementFee.value,
        managementFeeUnit: inputManagementFeeUnit.value,
        isRightFee: inputIsRightFee.value,
        rightFee: inputRightFee.value,
        rightFeeUnit: inputRightFeeUnit.value,
        pyeongPrice: inputPyeongPrice.value,
        pyeongPriceUnit: inputPyeongPriceUnit.value,
        totalFloor: inputTotalFloor.value + "층",
        floor: inputFloor.value
          ? inputFloor.value + "층"
          : inputFloorCheck.value,
        realArea: inputRealArea.value,
        contractArea: inputContractArea.value,
        dedicatedArea: inputDedicatedArea.value,
        groundArea: inputGroundArea.value,
        isParking: inputIsParking.value,
        parkingNumber: inputParkingNumber.value,
        totalParkingNumber: inputTotalParkingNumber.value,
        parkType1: inputParkType1.value,
        parkType2: inputParkType2.value,
        isElevator: inputIsElevator.value,
        elevatorNumber: inputElevatorNumber.value,
        isHeating: inputIsHeating.value,
        heatingType: inputHeatingType.value,
        moveInDate:
          inputMoveInDate.value === "직접입력"
            ? inputMoveInDateText.value
            : inputMoveInDate.value,
        entranceDirection: inputEntranceDirection.value,
        useApprovalDate:
          inputUseApprovalDate1.value +
          "-" +
          inputUseApprovalDate2.value +
          "-" +
          inputUseApprovalDate3.value,
        restroom: inputRestroom.value,
        usage: inputUsage.value,
        roomNumber: inputRoomNumber.value,
        isCeiling: inputIsCeiling.value,
        title: inputTitle.value,
        description: inputDescription.value,
        listTitle: inputListTitle.value,
        listSubTitle: inputListSubTitle.value,
        additionalContent: inputAdditionalContent.value,
        content: inputContent.value,
        privateAddress: inputPrivateAddress.value,
        privateTel: inputPrivateTel.value,
        privateTel2: inputPrivateTel2.value,
        memo: inputMemo.value,
        privateRemark: inputPrivateRemark.value,
        thumbnailPath: inputThumbnailPath.value || "-",
        detailImagePaths: inputDetailImagePaths.value,
      },
    });
    if (data.updateProduct) {
      toast.notify("매물정보가 변경 되었습니다.", {
        duration: 5,
        type: "success",
      });
      router.back();
      return;
    } else {
      toast.notify("한번 수정된 매물은 3분 후 수정할 수 있습니다.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const dialogToggle = (e, idx) => {
    if (openDialog) {
      inputImageSort.setValue("");
    } else {
      inputImageSort.setValue(String(idx + 1));
      inputCurrentImageSort.setValue(idx);
    }
    setOpenDialog(!openDialog);
  };

  const updateDetailImageSortHandler = async () => {
    if (!inputImageSort.value || inputImageSort.value.trim() === "") {
      toast.notify("변경할 순서를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const currentImage = inputDetailImagePaths.value.splice(
      inputCurrentImageSort.value,
      1
    );

    inputDetailImagePaths.value.splice(
      parseInt(inputImageSort.value) - 1,
      0,
      currentImage[0]
    );

    inputDetailImagePaths.setValue([...inputDetailImagePaths.value]);

    await dialogToggle();
    setTimeout(() => {
      setOpenDialog(false);
    }, 100);
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    initSettingHandler();
    subMenuRefetch();
  }, []);

  useEffect(() => {
    if (query.key) {
      productRefetch();

      setTimeout(() => {
        setProductSkip(false);
      }, 1000);
    }
  }, [query.key]);

  useEffect(() => {}, [currentTab]);

  useEffect(() => {
    let productType =
      currentSubTab === 0
        ? "원룸"
        : currentSubTab === 1
        ? "사무실"
        : currentSubTab === 2
        ? "상가"
        : "";

    inputProductType.setValue(productType);
  }, [currentSubTab]);

  useEffect(() => {
    if (inputPrice1.value && inputGroundArea2.value) {
      const price =
        (parseInt(inputPrice1.value) *
          parseInt(unitNumber[inputPriceUnit1.value] || 0)) /
          parseInt(inputGroundArea2.value) || "";

      if (parseInt(price) / unitNumber["조"] >= 1) {
        inputPyeongPrice.setValue(String(parseInt(price) / unitNumber["조"]));
        inputPyeongPriceUnit.setValue("조");
      } else if (parseInt(price) / unitNumber["억"] >= 1) {
        inputPyeongPrice.setValue(String(parseInt(price) / unitNumber["억"]));
        inputPyeongPriceUnit.setValue("억");
      } else if (parseInt(price) / unitNumber["만"] >= 1) {
        inputPyeongPrice.setValue(String(parseInt(price) / unitNumber["만"]));
        inputPyeongPriceUnit.setValue("만");
      } else {
        inputPyeongPrice.setValue(
          String(parseFloat(parseInt(price) / unitNumber["만"]).toFixed(1))
        );
        inputPyeongPriceUnit.setValue("만");
      }
    } else {
      inputPyeongPrice.setValue("");
      inputPyeongPriceUnit.setValue("만");
    }
  }, [inputPrice1.value, inputGroundArea2.value]);

  useEffect(() => {
    if (productData) {
      const data = productData.getProductDetail;

      const categoryList = [];
      const categoryNameList = [];

      data.categoryList.map((data) => {
        categoryList.push(data.parentMenu._id + "/" + data._id);
        categoryNameList.push(data.name);
      });

      setCurrentSubTab(
        data.productType === "상가" ? 2 : data.productType === "사무실" ? 1 : 0
      );

      inputProductType.setValue(data.productType);
      inputBuildingType.setValue(data.buildingType);
      inputBuildingUse.setValue(data.buildingUse);
      inputAddress.setValue(data.address);
      inputRoadAddress.setValue(data.roadAddress);
      inputDetailAddress.setValue(data.detailAddress);
      inputSubwayTime.setValue(data.subwayTime || "");
      inputSubwayTime2.setValue(data.subwayTime2 || "");
      inputSubwayCarTime.setValue(data.subwayCarTime || "");
      inputSubwayCarTime2.setValue(data.subwayCarTime2 || "");
      inputSubwayName.setValue(data.subwayName || "");
      inputSubwayName2.setValue(data.subwayName2 || "");
      inputViewAddress.setValue(data.viewAddress);
      inputAddressLat.setValue(data.addressLat);
      inputAddressLng.setValue(data.addressLng);

      inputPriceType.setValue(
        data.isMonthly
          ? "월세"
          : data.isJeonse
          ? "전세"
          : data.isTrading
          ? "매매"
          : ""
      );
      inputPrice1.setValue(
        data.isMonthly
          ? data.monthlyDeposit
          : data.isJeonse
          ? data.jeonseDeposit
          : data.isTrading
          ? data.tradingPrice
          : ""
      );
      inputPriceUnit1.setValue(
        data.isMonthly
          ? data.monthlyDepositUnit
          : data.isJeonse
          ? data.jeonseDepositUnit
          : data.isTrading
          ? data.tradingPriceUnit
          : ""
      );
      inputPrice2.setValue(
        data.isMonthly
          ? data.monthlyPrice
          : data.isJeonse
          ? ""
          : data.isTrading
          ? ""
          : ""
      );
      inputPriceUnit2.setValue(
        data.isMonthly
          ? data.monthlyPriceUnit
          : data.isJeonse
          ? ""
          : data.isTrading
          ? ""
          : ""
      );
      inputPriceCheck.setValue(
        data.isMonthly
          ? data.isMonthlyCheck
          : data.isJeonse
          ? data.isJeonseCheck
          : data.isTrading
          ? data.isTradingCheck
          : ""
      );
      inputIsManagementFee.setValue(data.isManagementFee);
      inputManagementFee.setValue(data.managementFee);
      inputManagementFeeUnit.setValue(data.managementFeeUnit);
      inputIsRightFee.setValue(data.isRightFee);
      inputRightFee.setValue(data.rightFee);
      inputRightFeeUnit.setValue(data.rightFeeUnit);
      inputPyeongPrice.setValue(String(data.pyeongPrice) || "");
      inputPyeongPriceUnit.setValue(data.pyeongPriceUnit || "");
      inputTotalFloor.setValue(data.totalFloor.replace("층", ""));
      inputFloor.setValue(
        ["복층", "건물전체", "없음"].includes(data.floor)
          ? ""
          : data.floor.replace("층", "")
      );
      inputFloorCheck.setValue(
        ["복층", "건물전체", "없음"].includes(data.floor) ? data.floor : ""
      );
      inputRealArea.setValue(data.realArea);
      inputContractArea.setValue(data.contractArea);
      inputContractArea2.setValue(areaCalculation2(data.contractArea));
      inputDedicatedArea.setValue(data.dedicatedArea);
      inputDedicatedArea2.setValue(areaCalculation2(data.dedicatedArea));
      inputGroundArea.setValue(data.groundArea || "");
      inputGroundArea2.setValue(
        data.groundArea ? areaCalculation2(data.groundArea) : ""
      );
      inputIsParking.setValue(data.isParking);
      inputParkingNumber.setValue(data.parkingNumber);
      inputTotalParkingNumber.setValue(data.totalParkingNumber);
      inputParkType1.setValue(data.parkType1);
      inputParkType2.setValue(data.parkType2);
      inputIsElevator.setValue(data.isElevator);
      inputElevatorNumber.setValue(data.elevatorNumber);
      inputIsHeating.setValue(data.isHeating);
      inputHeatingType.setValue(data.heatingType);
      inputMoveInDate.setValue(
        ["즉시입주", "협의가능"].includes(data.moveInDate)
          ? data.moveInDate
          : "직접입력"
      );
      inputMoveInDateText.setValue(
        ["즉시입주", "협의가능"].includes(data.moveInDate)
          ? ""
          : data.moveInDate
      );
      inputEntranceDirection.setValue(data.entranceDirection);
      inputUseApprovalDate1.setValue(data.useApprovalDate.split("-")[0]);
      inputUseApprovalDate2.setValue(data.useApprovalDate.split("-")[1]);
      inputUseApprovalDate3.setValue(data.useApprovalDate.split("-")[2]);
      inputRestroom.setValue(data.restroom);
      inputUsage.setValue(data.usage);
      inputRoomNumber.setValue(data.roomNumber);
      inputIsCeiling.setValue(data.isCeiling || false);
      inputTitle.setValue(data.title);
      inputDescription.setValue(data.description);
      inputListTitle.setValue(data.listTitle);
      inputListSubTitle.setValue(data.listSubTitle);
      inputAdditionalContent.setValue(data.additionalContent);
      inputContent.setValue(data.content);
      inputPrivateAddress.setValue(data.privateAddress);
      inputPrivateTel.setValue(data.privateTel);
      inputPrivateTel2.setValue(data.privateTel2 || "");
      inputMemo.setValue(data.memo);
      inputPrivateRemark.setValue(data.privateRemark);
      inputThumbnailPath.setValue(data.thumbnailPath);
      inputDetailImagePaths.setValue(data.detailImagePaths);
      inputCategoryList.setValue(categoryList);
      inputCategoryNameList.setValue(categoryNameList);

      setCurrentData(data);
    }
  }, [productData]);

  return (
    <AD16Presenter
      thumbnailRef={thumbnailRef}
      fileDropRef={fileDropRef}
      //
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      currentSubTab={currentSubTab}
      setCurrentSubTab={setCurrentSubTab}
      currentKey={query.key}
      currentData={currentData}
      isLoading={isLoading}
      isPostCode={isPostCode}
      setIsPostCode={setIsPostCode}
      openDialog={openDialog}
      //
      inputProductType={inputProductType}
      inputBuildingType={inputBuildingType}
      inputBuildingUse={inputBuildingUse}
      inputAddress={inputAddress}
      inputRoadAddress={inputRoadAddress}
      inputDetailAddress={inputDetailAddress}
      inputSubwayTime={inputSubwayTime}
      inputSubwayTime2={inputSubwayTime2}
      inputSubwayCarTime={inputSubwayCarTime}
      inputSubwayCarTime2={inputSubwayCarTime2}
      inputSubwayName={inputSubwayName}
      inputSubwayName2={inputSubwayName2}
      inputViewAddress={inputViewAddress}
      inputAddressLat={inputAddressLat}
      inputAddressLng={inputAddressLng}
      inputPriceType={inputPriceType}
      inputPrice1={inputPrice1}
      inputPriceUnit1={inputPriceUnit1}
      inputPrice2={inputPrice2}
      inputPriceUnit2={inputPriceUnit2}
      inputPriceCheck={inputPriceCheck}
      inputIsManagementFee={inputIsManagementFee}
      inputManagementFee={inputManagementFee}
      inputManagementFeeUnit={inputManagementFeeUnit}
      inputIsRightFee={inputIsRightFee}
      inputRightFee={inputRightFee}
      inputRightFeeUnit={inputRightFeeUnit}
      inputPyeongPrice={inputPyeongPrice}
      inputPyeongPriceUnit={inputPyeongPriceUnit}
      inputTotalFloor={inputTotalFloor}
      inputFloor={inputFloor}
      inputFloorCheck={inputFloorCheck}
      inputRealArea={inputRealArea}
      inputContractArea={inputContractArea}
      inputContractArea2={inputContractArea2}
      inputDedicatedArea={inputDedicatedArea}
      inputDedicatedArea2={inputDedicatedArea2}
      inputGroundArea={inputGroundArea}
      inputGroundArea2={inputGroundArea2}
      inputIsParking={inputIsParking}
      inputParkingNumber={inputParkingNumber}
      inputTotalParkingNumber={inputTotalParkingNumber}
      inputParkType1={inputParkType1}
      inputParkType2={inputParkType2}
      inputIsElevator={inputIsElevator}
      inputElevatorNumber={inputElevatorNumber}
      inputHeatingType={inputHeatingType}
      inputIsHeating={inputIsHeating}
      inputMoveInDate={inputMoveInDate}
      inputMoveInDateText={inputMoveInDateText}
      inputEntranceDirection={inputEntranceDirection}
      inputUseApprovalDate1={inputUseApprovalDate1}
      inputUseApprovalDate2={inputUseApprovalDate2}
      inputUseApprovalDate3={inputUseApprovalDate3}
      inputRestroom={inputRestroom}
      inputUsage={inputUsage}
      inputRoomNumber={inputRoomNumber}
      inputIsCeiling={inputIsCeiling}
      inputTitle={inputTitle}
      inputDescription={inputDescription}
      inputListTitle={inputListTitle}
      inputListSubTitle={inputListSubTitle}
      inputAdditionalContent={inputAdditionalContent}
      inputContent={inputContent}
      inputPrivateAddress={inputPrivateAddress}
      inputMemo={inputMemo}
      inputPrivateTel={inputPrivateTel}
      inputPrivateTel2={inputPrivateTel2}
      inputPrivateRemark={inputPrivateRemark}
      inputThumbnailPath={inputThumbnailPath}
      inputDetailImagePaths={inputDetailImagePaths}
      inputCategoryNameList={inputCategoryNameList}
      inputImageSort={inputImageSort}
      //
      subMenuDatum={subMenuDatum && subMenuDatum.getSubMenuForProduct}
      //
      fileChangeHandler={fileChangeHandler}
      fileChangeHandler2={fileChangeHandler2}
      fileDropHandler={fileDropHandler}
      removeDetailImageHandler={removeDetailImageHandler}
      changeCategoryHandler={changeCategoryHandler}
      removeCategoryHandler={removeCategoryHandler}
      createProductHandler={createProductHandler}
      updateProductHandler={updateProductHandler}
      dialogToggle={dialogToggle}
      updateDetailImageSortHandler={updateDetailImageSortHandler}
    />
  );
};
