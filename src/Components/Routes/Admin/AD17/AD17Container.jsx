import React, { useEffect, useState } from "react";
import AD17Presenter from "./AD17Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_TOTAL_ADMIN_USER,
  GET_TOTAL_PRODUCT_FOR_ADMIN,
  DELETE_PRODUCT,
  UPDATE_PRODUCT_MANAGER,
  UPDATE_PRODUCT_STATUS,
  UPDATE_PRODUCT_VIEW,
  UPDATE_PRODUCT_OPEN,
  UPDATE_PRODUCT_MAP,
  UPDATE_PRODUCT_COMPLETE,
  UPDATE_PRODUCT_BEST,
} from "./AD17Queries.js";
import { toast } from "react-nextjs-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useInput from "../../../../Components/Hooks/useInput";
import useOnlyNumberInput from "../../../../Components/Hooks/useOnlyNumberInput";
import { useRouter } from "next/router";

export default () => {
  ////////////// - VARIABLE- ////////////////
  const router = useRouter();

  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewProductDatum, setViewProductDatum] = useState(null);
  const [viewAdminUserDatum, setViewAdminUserDatum] = useState(null);
  const [searchType, setSearchType] = useState("1");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchProductType, setSearchProductType] = useState("1");
  const [searchTab, setSearchTab] = useState("1");
  const [orderType, setOrderType] = useState("");
  const [orderValue, setOrderValue] = useState(0);
  const [viewImagePaths, setViewImagePaths] = useState([]);
  const [isManagerDialog, setIsManagerDialog] = useState(false);

  const [tabCount01, setTabCount01] = useState(0);
  const [tabCount02, setTabCount02] = useState(0);
  const [tabCount03, setTabCount03] = useState(0);
  const [tabCount04, setTabCount04] = useState(0);
  const [tabCount05, setTabCount05] = useState(0);
  const [tabCount06, setTabCount06] = useState(0);

  const [currentId, setCurrentId] = useState("");

  const [checkAll, setCheckAll] = useState(false);
  const [checkList, setCheckList] = useState(null);

  const inputSearchType = useInput("1");
  const inputSearchKeyword1 = useInput("");
  const inputSearchKeyword2 = useOnlyNumberInput("");
  const inputSearchKeyword3 = useOnlyNumberInput("");

  const inputManager = useInput("");

  const [productSkip, setProductSkip] = useState(true);
  const [userSkip, setUserSkip] = useState(true);

  ////////////// - USE QUERY- ///////////////
  const { data: adminUserDatum, refetch: adminUserRefetch } = useQuery(
    GET_TOTAL_ADMIN_USER,
    {
      skip: userSkip,
    }
  );

  const { data: productDatum, refetch: productRefetch } = useQuery(
    GET_TOTAL_PRODUCT_FOR_ADMIN,
    {
      variables: {
        searchType,
        searchKeyword,
        searchProductType,
      },
      skip: productSkip,
    }
  );

  ///////////// - USE MUTATION- /////////////
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);
  const [updateProductManagerMutation] = useMutation(UPDATE_PRODUCT_MANAGER);
  const [updateProductStatusMutation] = useMutation(UPDATE_PRODUCT_STATUS);
  const [updateProductViewMutation] = useMutation(UPDATE_PRODUCT_VIEW);
  const [updateProductOpenMutation] = useMutation(UPDATE_PRODUCT_OPEN);
  const [updateProductMapMutation] = useMutation(UPDATE_PRODUCT_MAP);
  const [updateProductCompleteMutation] = useMutation(UPDATE_PRODUCT_COMPLETE);
  const [updateProductBestMutation] = useMutation(UPDATE_PRODUCT_BEST);

  ///////////// - EVENT HANDLER- ////////////
  const moveLinkHandler = (link) => {
    router.push(link);
  };

  const moveURLHandler = (url) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const closePageHandler = () => {
    setCurrentId("");
  };

  const changeCheckboxHandler = async (e) => {
    if (e.target.name === "checkAll") {
      setCheckAll(e.target.checked);
      checkList.forEach((item) => {
        item.checked = e.target.checked;
      });
    } else {
      checkList.find((item) => item.name === e.target.name).checked =
        e.target.checked;
      await setCheckList([...checkList]);
    }
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
    setTimeout(() => {
      setProductSkip(false);
    }, 1000);
  };

  const searchProductTypeHandler = (value) => {
    setSearchProductType(value);

    setTimeout(() => {
      setProductSkip(false);
    }, 1000);
  };

  const changeOrderHandler = (type) => {
    if (orderType === type) {
      if (orderValue === -1) setOrderType("");
      setOrderValue(orderValue === 1 ? -1 : orderValue === -1 ? 0 : 1);
    } else {
      setOrderType(type);
      setOrderValue(1);
    }
  };

  const updateProductManagerHandler = () => {
    const list = checkList.filter((data) => {
      return data.checked;
    });
    if (list.length < 1) {
      toast.notify("변경할 매물을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const productData = viewProductDatum.filter((data) => {
      return data._id === list[0].value;
    })[0];
    inputManager.setValue(productData.manager._id);
    setIsManagerDialog(true);
  };

  const updateProductManagerHandlerAfter = async () => {
    const list = checkList.filter((data) => {
      return data.checked;
    });

    await Promise.all(
      list.map(async (checkData, idx) => {
        const productData = viewProductDatum.filter((data) => {
          return data._id === checkData.value;
        })[0];

        const { data } = await updateProductManagerMutation({
          variables: {
            id: checkData.value,
            manager: inputManager.value,
          },
        });
      })
    );

    toast.notify("정상적으로 처리되었습니다", {
      duration: 5,
      type: "success",
    });
    inputManager.setValue("");
    setIsManagerDialog(false);
    productRefetch();
    setCheckAll(false);

    await Promise.all(
      list.map(async (checkData, idx) => {
        await Promise.all(
          viewProductDatum.map((data, idx) => {
            if (data._id === checkData.value) {
              viewProductDatum[idx].manager = inputManager.value;
              return;
            }
          })
        );
      })
    );

    setViewProductDatum([...viewProductDatum]);
  };

  const updateProductHandler = () => {
    const list = checkList.filter((data) => {
      return data.checked;
    });
    if (list.length < 1) {
      toast.notify("변경할 매물을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (list.length > 1) {
      toast.notify("변경할 매물을 한개만 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    router.push(`/admin/registProductManagement?key=${list[0].value}`);
  };

  const deleteProductHandler = () => {
    const list = checkList.filter((data) => {
      return data.checked;
    });

    if (list.length < 1) {
      toast.notify("삭제하실 매물을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

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
          onClick: () => deleteProductHandlerAfter(list),
        },
      ],
    });
  };

  const deleteProductHandlerAfter = async (checkList) => {
    let result = true;

    await Promise.all(
      checkList.map(async (checkData) => {
        const { data } = await deleteProductMutation({
          variables: {
            id: checkData.value,
          },
        });

        if (!data.deleteProduct) {
          result = false;
        }
      })
    );

    if (result) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
      setCheckAll(false);

      let datum = [];

      await Promise.all(
        checkList.map(async (checkData, idx) => {
          datum = await viewProductDatum.filter((data) => {
            return data._id !== checkData.value;
          });
        })
      );

      const list = [];

      datum.map((data, idx) => {
        list.push({
          name: `checkOne${idx}`,
          value: data._id,
          checked: false,
        });
      });

      setCheckList([...list]);

      setViewProductDatum([...datum]);
    } else {
      toast.notify("정상적으로 처리되지 못했습니다. 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductStatusHandler = async (status) => {
    let result = true;

    const list = checkList.filter((data) => {
      return data.checked;
    });
    if (list.length < 1) {
      toast.notify("변경할 매물을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    await Promise.all(
      list.map(async (checkData, idx) => {
        const { data } = await {
          variables: {
            id: checkData.value,
            status,
            updateProductStatusMutation,
          },
        };

        if (!data.updateProductStatus) {
          result = false;
        }
      })
    );

    if (result) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
      setCheckAll(false);

      await Promise.all(
        list.map(async (checkData, idx) => {
          await Promise.all(
            viewProductDatum.map((data, idx2) => {
              if (data._id === checkData.value) {
                viewProductDatum[idx2].status = status;
                return;
              }
            })
          );
        })
      );
      setViewProductDatum([...viewProductDatum]);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductViewHandler = async () => {
    let result = true;

    const list = checkList.filter((data) => {
      return data.checked;
    });
    if (list.length < 1) {
      toast.notify("변경할 매물을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    await Promise.all(
      list.map(async (checkData, idx) => {
        const productData = viewProductDatum.filter((data) => {
          return data._id === checkData.value;
        })[0];

        const { data } = await updateProductViewMutation({
          variables: {
            id: checkData.value,
            isView: !productData.isView,
          },
        });

        if (!data.updateProductView) {
          result = false;
        }
      })
    );

    if (result) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
      setCheckAll(false);

      await Promise.all(
        list.map(async (checkData, idx) => {
          await Promise.all(
            viewProductDatum.map((data, idx2) => {
              if (data._id === checkData.value) {
                viewProductDatum[idx2].isView = !viewProductDatum[idx2].isView;
                return;
              }
            })
          );
        })
      );
      setViewProductDatum([...viewProductDatum]);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductOpenHandler = async () => {
    let result = true;

    const list = checkList.filter((data) => {
      return data.checked;
    });
    if (list.length < 1) {
      toast.notify("변경할 매물을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    await Promise.all(
      list.map(async (checkData, idx) => {
        const productData = viewProductDatum.filter((data) => {
          return data._id === checkData.value;
        })[0];

        const { data } = await updateProductOpenMutation({
          variables: {
            id: checkData.value,
            isOpen: !productData.isOpen,
          },
        });

        if (!data.updateProductOpen) {
          result = false;
        }
      })
    );

    if (result) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
      setCheckAll(false);

      await Promise.all(
        list.map(async (checkData, idx) => {
          await Promise.all(
            viewProductDatum.map((data, idx2) => {
              if (data._id === checkData.value) {
                viewProductDatum[idx2].isOpen = !viewProductDatum[idx2].isOpen;
                return;
              }
            })
          );
        })
      );
      setViewProductDatum([...viewProductDatum]);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductMapHandler = async (isMap) => {
    let result = true;

    const list = checkList.filter((data) => {
      return data.checked;
    });
    if (list.length < 1) {
      toast.notify("변경할 매물을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    await Promise.all(
      list.map(async (checkData) => {
        const { data } = await updateProductMapMutation({
          variables: {
            id: checkData.value,
            isMap: isMap,
          },
        });

        if (!data.updateProductMap) {
          result = false;
        }
      })
    );

    if (result) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
      setCheckAll(false);

      await Promise.all(
        list.map(async (checkData, idx) => {
          await Promise.all(
            viewProductDatum.map((data, idx2) => {
              if (data._id === checkData.value) {
                viewProductDatum[idx2].isMap = isMap;
                return;
              }
            })
          );
        })
      );
      setViewProductDatum([...viewProductDatum]);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductCompleteHandler = async () => {
    let result = true;

    const list = checkList.filter((data) => {
      return data.checked;
    });
    if (list.length < 1) {
      toast.notify("변경할 매물을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    await Promise.all(
      list.map(async (checkData, idx) => {
        const productData = viewProductDatum.filter((data) => {
          return data._id === checkData.value;
        })[0];

        const { data } = await updateProductCompleteMutation({
          variables: {
            id: checkData.value,
            isComplete: !productData.isComplete,
          },
        });

        if (!data.updateProductComplete) {
          result = false;
        }
      })
    );

    if (result) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
      setCheckAll(false);

      await Promise.all(
        list.map(async (checkData, idx) => {
          await Promise.all(
            viewProductDatum.map((data, idx2) => {
              if (data._id === checkData.value) {
                viewProductDatum[idx2].isComplete =
                  !viewProductDatum[idx2].isComplete;
                return;
              }
            })
          );
        })
      );
      setViewProductDatum([...viewProductDatum]);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateProductBestHandler = async () => {
    let result = true;

    const list = checkList.filter((data) => {
      return data.checked;
    });
    if (list.length < 1) {
      toast.notify("변경할 매물을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    await Promise.all(
      list.map(async (checkData, idx) => {
        const productData = viewProductDatum.filter((data) => {
          return data._id === checkData.value;
        })[0];

        const { data } = await updateProductBestMutation({
          variables: {
            id: checkData.value,
            isBest: !productData.isBest,
          },
        });

        if (!data.updateProductBest) {
          result = false;
        }
      })
    );

    if (result) {
      toast.notify("정상적으로 처리되었습니다", {
        duration: 5,
        type: "success",
      });
      productRefetch();
      setCheckAll(false);

      await Promise.all(
        list.map(async (checkData, idx) => {
          await Promise.all(
            viewProductDatum.map((data, idx2) => {
              if (data._id === checkData.value) {
                viewProductDatum[idx2].isBest = !viewProductDatum[idx2].isBest;
                return;
              }
            })
          );
        })
      );
      setViewProductDatum([...viewProductDatum]);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
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
    adminUserRefetch();
    productRefetch();

    setTimeout(() => {
      setProductSkip(false);
      setUserSkip(false);
    }, 1000);
  }, []);

  useEffect(() => {}, [currentTab]);

  useEffect(() => {
    setProductSkip(false);
  }, [searchTab]);

  useEffect(() => {
    if (viewProductDatum) {
      viewProductDatum.sort((a, b) => {
        if (orderType === "관포") {
          const aValue = Math.round(
            parseInt(a.monthlyPrice) +
              parseInt(a.isManagementFee ? a.managementFee : 0)
          );

          const bValue = Math.round(
            parseInt(b.monthlyPrice) +
              parseInt(b.isManagementFee ? b.managementFee : 0)
          );

          if (orderValue === 1) {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        } else {
          if (!isNaN(a[orderType]) && !isNaN(b[orderType])) {
            let aValue = parseInt(a[orderType]);
            let bValue = parseInt(b[orderType]);

            if (a[orderType] === true) aValue = 1;
            if (a[orderType] === false) aValue = -1;
            if (b[orderType] === true) bValue = 1;
            if (b[orderType] === false) bValue = -1;

            if (orderValue === 1) {
              return aValue - bValue;
            } else {
              return bValue - aValue;
            }
          } else {
            if (orderValue === 1) {
              return a[orderType] < b[orderType]
                ? -1
                : a[orderType] > b[orderType]
                ? 1
                : 0;
            } else {
              return a[orderType] > b[orderType]
                ? -1
                : a[orderType] < b[orderType]
                ? 1
                : 0;
            }
          }
        }
      });

      const list = [];

      viewProductDatum.map((data, idx) => {
        if (checkList && checkList.length > 0) {
          if (checkList[idx] && !checkList[idx].checked) {
            list.push({
              name: `checkOne${idx}`,
              value: data._id,
              checked: false,
            });

            return;
          }
        }

        list.push({
          name: `checkOne${idx}`,
          value: data._id,
          checked: false,
        });
      });

      setCheckList([...list]);
      setCheckAll(false);

      setViewProductDatum([...viewProductDatum]);
    }
  }, [orderType, orderValue]);

  useEffect(() => {
    if (productDatum) {
      const list = [];

      const tabData01 = productDatum.getTotalProductForAdmin;

      const tabData02 = productDatum.getTotalProductForAdmin.filter((data) => {
        return data.isView && !data.isComplete && data.status === 1;
      });

      const tabData03 = productDatum.getTotalProductForAdmin.filter((data) => {
        return !data.isView && !data.isComplete && data.status === 1;
      });

      const tabData04 = productDatum.getTotalProductForAdmin.filter((data) => {
        return data.isComplete && data.status === 1;
      });

      const tabData05 = productDatum.getTotalProductForAdmin.filter((data) => {
        return data.status === 0;
      });

      const tabData06 = productDatum.getTotalProductForAdmin.filter((data) => {
        return data.status === -1;
      });

      const viewProductDatum =
        searchTab === "1"
          ? tabData01
          : searchTab === "2"
          ? tabData02
          : searchTab === "3"
          ? tabData03
          : searchTab === "4"
          ? tabData04
          : searchTab === "5"
          ? tabData05
          : searchTab === "6"
          ? tabData06
          : [];

      viewProductDatum.map((data, idx) => {
        if (checkList && checkList.length > 0) {
          if (checkList[idx] && !checkList[idx].checked) {
            list.push({
              name: `checkOne${idx}`,
              value: data._id,
              checked: false,
            });

            return;
          }
        }

        list.push({
          name: `checkOne${idx}`,
          value: data._id,
          checked: false,
        });
      });

      setTabCount01(tabData01.length);
      setTabCount02(tabData02.length);
      setTabCount03(tabData03.length);
      setTabCount04(tabData04.length);
      setTabCount05(tabData05.length);
      setTabCount06(tabData06.length);

      setViewProductDatum(viewProductDatum);

      setCheckList(list);

      setOrderType("");
      setOrderValue(0);

      setProductSkip(true);
    }
  }, [productDatum]);

  useEffect(() => {
    if (adminUserDatum) {
      setViewAdminUserDatum(adminUserDatum.getTotalAdminUser);
      setUserSkip(true);
    }
  }, [adminUserDatum]);

  return (
    <AD17Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      searchType={searchType}
      setSearchType={setSearchType}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      searchProductType={searchProductType}
      setSearchProductType={setSearchProductType}
      searchTab={searchTab}
      setSearchTab={setSearchTab}
      orderType={orderType}
      setOrderType={setOrderType}
      orderValue={orderValue}
      setOrderValue={setOrderValue}
      viewImagePaths={viewImagePaths}
      setViewImagePaths={setViewImagePaths}
      isManagerDialog={isManagerDialog}
      setIsManagerDialog={setIsManagerDialog}
      tabCount01={tabCount01}
      tabCount02={tabCount02}
      tabCount03={tabCount03}
      tabCount04={tabCount04}
      tabCount05={tabCount05}
      tabCount06={tabCount06}
      currentId={currentId}
      setCurrentId={setCurrentId}
      checkAll={checkAll}
      checkList={checkList}
      inputSearchType={inputSearchType}
      inputSearchKeyword1={inputSearchKeyword1}
      inputSearchKeyword2={inputSearchKeyword2}
      inputSearchKeyword3={inputSearchKeyword3}
      inputManager={inputManager}
      //
      adminUserDatum={viewAdminUserDatum}
      productDatum={viewProductDatum}
      //
      moveLinkHandler={moveLinkHandler}
      moveURLHandler={moveURLHandler}
      closePageHandler={closePageHandler}
      changeCheckboxHandler={changeCheckboxHandler}
      changeSearchTypeHandler={changeSearchTypeHandler}
      changeOrderHandler={changeOrderHandler}
      searchProductHandler={searchProductHandler}
      searchProductTypeHandler={searchProductTypeHandler}
      updateProductManagerHandler={updateProductManagerHandler}
      updateProductManagerHandlerAfter={updateProductManagerHandlerAfter}
      updateProductHandler={updateProductHandler}
      deleteProductHandler={deleteProductHandler}
      updateProductStatusHandler={updateProductStatusHandler}
      updateProductViewHandler={updateProductViewHandler}
      updateProductOpenHandler={updateProductOpenHandler}
      updateProductMapHandler={updateProductMapHandler}
      updateProductCompleteHandler={updateProductCompleteHandler}
      updateProductBestHandler={updateProductBestHandler}
      shareProductHandler={shareProductHandler}
    />
  );
};
