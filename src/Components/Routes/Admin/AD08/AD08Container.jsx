import React, { useEffect, useState } from "react";
import AD08Presenter from "./AD08Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_MENU_FOR_ADMIN,
  MODIFY_MENU_USEYN,
  MODIFY_SUB_MENU_USEYN,
  MODIFY_MENU_SORT,
  MODIFY_SUB_MENU_SORT,
  DELETE_MENU,
  DELETE_SUB_MENU,
  CREATE_MENU,
  CREATE_SUB_MENU,
} from "./AD08Queries.js";
import { toast } from "react-nextjs-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useInput from "../../../../Components/Hooks/useInput";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMenuIndex, setCurrentMenuIndex] = useState(-1);
  const [currentSubMenu, setCurrentSubMenu] = useState(null);
  const [isMenuDialog, setIsMenuDialog] = useState(false);
  const [isSubMenuDialog, setIsSubMenuDialog] = useState(false);

  const inputMenu = useInput("");
  const inputSubMenu = useInput("");
  const inputIsCategory = useInput(false);

  const [viewMenuDatum, setViewMenuDatum] = useState(null);

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const { data: menuDatum, loading, refetch: menuRefetch } = useQuery(
    GET_MENU_FOR_ADMIN
  );

  ///////////// - USE MUTATION- /////////////
  const [modifyMenuUseYnMutation] = useMutation(MODIFY_MENU_USEYN);
  const [modifySubMenuUseYnMutation] = useMutation(MODIFY_SUB_MENU_USEYN);
  const [modifyMenuSortMutation] = useMutation(MODIFY_MENU_SORT);
  const [modifySubMenuSortMutation] = useMutation(MODIFY_SUB_MENU_SORT);
  const [deleteMenuMutation] = useMutation(DELETE_MENU);
  const [deleteSubMenuMutation] = useMutation(DELETE_SUB_MENU);
  const [createMenuMutation] = useMutation(CREATE_MENU);
  const [createSubMenuMutation] = useMutation(CREATE_SUB_MENU);

  ///////////// - EVENT HANDLER- ////////////
  const menuClickHandler = (data, idx) => {
    setCurrentMenuIndex(idx);
    setCurrentSubMenu(data);
  };

  const toggleMenuUseYnHandler = async (data) => {
    const { data: result } = await modifyMenuUseYnMutation({
      variables: {
        id: data._id,
        useYn: !data.useYn,
      },
    });

    if (result.modifyMenuUseYn) {
      toast.notify("UPDATE MENU STATE!", {
        duration: 5,
        type: "info",
      });
      menuRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const toggleSubMenuUseYnHandler = async (data, idx) => {
    const { data: result } = await modifySubMenuUseYnMutation({
      variables: {
        id: data._id,
        useYn: !data.useYn,
      },
    });

    if (result.modifySubMenuUseYn) {
      toast.notify("UPDATE SUB MENU STATE!", {
        duration: 5,
        type: "info",
      });

      viewMenuDatum[currentMenuIndex].subMenu[idx].useYn = !data.useYn;
      setViewMenuDatum([...viewMenuDatum]);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateMenuSortUpHandler = async (data, idx) => {
    if (idx === 0) {
      toast.notify("더이상 올리실 수 없습니다.", {
        duration: 5,
        type: "info",
      });
      return;
    }

    const { data: result } = await modifyMenuSortMutation({
      variables: {
        id: data._id,
        sort: idx,
      },
    });

    const { data: result2 } = await modifyMenuSortMutation({
      variables: {
        id: viewMenuDatum[idx - 1]._id,
        sort: idx + 1,
      },
    });

    if (result2.modifyMenuSort) {
      menuRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateMenuSortDownHandler = async (data, idx) => {
    if (idx === viewMenuDatum.length - 1) {
      toast.notify("더이상 내리실 수 없습니다.", {
        duration: 5,
        type: "info",
      });
      return;
    }

    const { data: result } = await modifyMenuSortMutation({
      variables: {
        id: data._id,
        sort: idx + 2,
      },
    });

    const { data: result2 } = await modifyMenuSortMutation({
      variables: {
        id: viewMenuDatum[idx + 1]._id,
        sort: idx + 1,
      },
    });

    if (result2.modifyMenuSort) {
      menuRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateSubMenuSortUpHandler = async (data, idx) => {
    if (idx === 0) {
      toast.notify("더이상 올리실 수 없습니다.", {
        duration: 5,
        type: "info",
      });
      return;
    }

    const { data: result } = await modifySubMenuSortMutation({
      variables: {
        id: data._id,
        sort: idx,
      },
    });

    const { data: result2 } = await modifySubMenuSortMutation({
      variables: {
        id: viewMenuDatum[currentMenuIndex].subMenu[idx - 1]._id,
        sort: idx + 1,
      },
    });

    viewMenuDatum[currentMenuIndex].subMenu[idx].sort = idx;
    viewMenuDatum[currentMenuIndex].subMenu[idx - 1].sort = idx + 1;
    setViewMenuDatum([...viewMenuDatum]);

    if (result2.modifySubMenuSort) {
      menuRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const updateSubMenuSortDownHandler = async (data, idx) => {
    if (idx === viewMenuDatum[currentMenuIndex].subMenu.length - 1) {
      toast.notify("더이상 내리실 수 없습니다.", {
        duration: 5,
        type: "info",
      });
      return;
    }

    const { data: result } = await modifySubMenuSortMutation({
      variables: {
        id: data._id,
        sort: idx + 2,
      },
    });

    const { data: result2 } = await modifySubMenuSortMutation({
      variables: {
        id: viewMenuDatum[currentMenuIndex].subMenu[idx + 1]._id,
        sort: idx + 1,
      },
    });

    viewMenuDatum[currentMenuIndex].subMenu[idx].sort = idx + 2;
    viewMenuDatum[currentMenuIndex].subMenu[idx + 1].sort = idx + 1;
    setViewMenuDatum([...viewMenuDatum]);

    if (result2.modifySubMenuSort) {
      menuRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const deleteMenuHandler = async (id) => {
    confirmAlert({
      title: "DELETE MENU DATA",
      message: "선택하신 메뉴를 삭제하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
        {
          label: "확인",
          onClick: () => deleteMenuHandlerAfter(id),
        },
      ],
    });
  };

  const deleteMenuHandlerAfter = async (id) => {
    const { data } = await deleteMenuMutation({
      variables: {
        id,
      },
    });

    if (data.deleteMenu) {
      setCurrentMenuIndex(-1);
      setCurrentSubMenu(null);
      menuRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const deleteSubMenuHandler = async (id) => {
    confirmAlert({
      title: "DELETE SUB MENU DATA",
      message: "선택하신 메뉴를 삭제하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
        {
          label: "확인",
          onClick: () => deleteSubMenuHandlerAfter(id),
        },
      ],
    });
  };

  const deleteSubMenuHandlerAfter = async (id) => {
    const { data } = await deleteSubMenuMutation({
      variables: {
        id,
      },
    });

    if (data.deleteSubMenu) {
      menuRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const createMenuHandler = async () => {
    if (!inputMenu.value || inputMenu.value.trim() === "") {
      toast.notify("추가할 메뉴를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const { data } = await createMenuMutation({
      variables: {
        name: inputMenu.value,
        sort: viewMenuDatum.length + 1,
        isCategory: inputIsCategory.value,
      },
    });

    if (data.createMenu) {
      setIsMenuDialog(false);
      menuRefetch();
      inputMenu.setValue("");
      inputIsCategory.setValue(false);
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const createSubMenuHandler = async () => {
    if (!inputSubMenu.value || inputSubMenu.value.trim() === "") {
      toast.notify("추가할 메뉴를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const { data } = await createSubMenuMutation({
      variables: {
        parentMenu: viewMenuDatum[currentMenuIndex]._id,
        name: inputSubMenu.value,
        sort: viewMenuDatum[currentMenuIndex].subMenu.length + 1,
      },
    });

    if (data.createSubMenu) {
      setIsSubMenuDialog(false);
      menuRefetch();
      inputSubMenu.setValue("");
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const toggleMenuDialogHandler = () => {
    if (isMenuDialog) {
      setIsMenuDialog(false);
      inputMenu.setValue("");
    } else {
      setIsMenuDialog(true);
    }
  };

  const toggleSubMenuDialogHandler = () => {
    if (isSubMenuDialog) {
      setIsSubMenuDialog(false);
      inputSubMenu.setValue("");
    } else {
      if (currentMenuIndex === -1) {
        toast.notify("좌측 메뉴를 선택해주세요.", {
          duration: 5,
          type: "error",
        });
        return;
      }
      setIsSubMenuDialog(true);
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    menuRefetch();
  }, []);

  useEffect(() => {
    if (menuDatum) {
      setViewMenuDatum(menuDatum.getMenuForAdmin);

      if (currentMenuIndex !== -1)
        setCurrentSubMenu(menuDatum.getMenuForAdmin[currentMenuIndex].subMenu);
    }
  }, [menuDatum]);

  return (
    <AD08Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      currentSubMenu={currentSubMenu}
      isMenuDialog={isMenuDialog}
      setIsMenuDialog={setIsMenuDialog}
      isSubMenuDialog={isSubMenuDialog}
      setIsSubMenuDialog={setIsSubMenuDialog}
      inputMenu={inputMenu}
      inputSubMenu={inputSubMenu}
      inputIsCategory={inputIsCategory}
      //
      menuDatum={viewMenuDatum}
      //
      menuClickHandler={menuClickHandler}
      toggleMenuUseYnHandler={toggleMenuUseYnHandler}
      toggleSubMenuUseYnHandler={toggleSubMenuUseYnHandler}
      updateMenuSortUpHandler={updateMenuSortUpHandler}
      updateMenuSortDownHandler={updateMenuSortDownHandler}
      updateSubMenuSortUpHandler={updateSubMenuSortUpHandler}
      updateSubMenuSortDownHandler={updateSubMenuSortDownHandler}
      deleteMenuHandler={deleteMenuHandler}
      deleteSubMenuHandler={deleteSubMenuHandler}
      createMenuHandler={createMenuHandler}
      createSubMenuHandler={createSubMenuHandler}
      toggleMenuDialogHandler={toggleMenuDialogHandler}
      toggleSubMenuDialogHandler={toggleSubMenuDialogHandler}
    />
  );
};
