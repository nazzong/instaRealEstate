import React, { useEffect, useState, useRef } from "react";
import AD14Presenter from "./AD14Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_ADMIN_USER_SEARCH,
  DELETE_ADMIN_USER,
  CREATE_ADMIN_USER,
  UPDATE_ADMIN_USER,
} from "./AD14Queries.js";
import { toast } from "react-nextjs-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useInput from "../../../../Components/Hooks/useInput";
import { resizeImage } from "../../../../commonUtils";

export default () => {
  ////////////// - VARIABLE- ////////////////

  /////////////// - USE REF- ////////////////
  const fileRef = useRef();

  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [currentMode, setCurrentMode] = useState(0);
  const [currentId, setCurrentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchValue = useInput("");
  const inputUserId = useInput("");
  const inputPassword = useInput("");
  const inputRank = useInput("");
  const inputName = useInput("");
  const inputMobile = useInput("");
  const inputAddress = useInput("");
  const inputSecurityNumber = useInput("");
  const inputFilePath = useInput("");

  ////////////// - USE QUERY- ///////////////
  const { data: userDatum, refetch: userRefetch } = useQuery(
    GET_ADMIN_USER_SEARCH,
    {
      variables: {
        searchValue: searchValue.value,
      },
    }
  );

  ///////////// - USE MUTATION- /////////////
  const [deleteAdminUserMutation] = useMutation(DELETE_ADMIN_USER);
  const [createAdminUserMutation] = useMutation(CREATE_ADMIN_USER);
  const [updateAdminUserMutation] = useMutation(UPDATE_ADMIN_USER);

  ///////////// - EVENT HANDLER- ////////////
  const fileChangeHandler = async (e) => {
    setIsLoading(true);

    const file = e.target.files[0];

    if (!file) {
      setIsLoading(false);
      return;
    }

    const db_path = await resizeImage(
      "INSTA-ESTATE/uploads/adminUser",
      file,
      120
    );

    inputFilePath.setValue(db_path);

    setIsLoading(false);
  };

  const deleteAdminUserHandler = (id) => {
    confirmAlert({
      title: "DELETE USER DATA",
      message: "???????????? ????????? ?????????????????????????",
      buttons: [
        {
          label: "??????",
          onClick: () => {
            return false;
          },
        },
        {
          label: "??????",
          onClick: () => deleteAdminUserHandlerAfter(id),
        },
      ],
    });
  };

  const deleteAdminUserHandlerAfter = async (id) => {
    const { data } = await deleteAdminUserMutation({
      variables: {
        id,
      },
    });

    if (data.deleteAdminUser) {
      toast.notify("??????????????? ?????? ???????????????.", {
        duration: 5,
        type: "success",
      });
      userRefetch();
    } else {
      toast.notify("?????? ??? ?????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const createAdminUserHandler = async () => {
    if (!inputUserId.value || inputUserId.value.trim() === "") {
      toast.notify("???????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputPassword.value || inputPassword.value.trim() === "") {
      toast.notify("??????????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputRank.value || inputRank.value.trim() === "") {
      toast.notify("????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputName.value || inputName.value.trim() === "") {
      toast.notify("????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputMobile.value || inputMobile.value.trim() === "") {
      toast.notify("???????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputAddress.value || inputAddress.value.trim() === "") {
      toast.notify("????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputSecurityNumber.value || inputSecurityNumber.value.trim() === "") {
      toast.notify("??????????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputFilePath.value) {
      toast.notify("????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (isLoading) {
      toast.notify("????????? ??????????????? ????????????. ????????? ??????????????????.", {
        duration: 5,
        type: "info",
      });
      return;
    }

    const { data } = await createAdminUserMutation({
      variables: {
        userId: inputUserId.value,
        password: inputPassword.value,
        rank: inputRank.value,
        name: inputName.value,
        mobile: inputMobile.value,
        address: inputAddress.value,
        securityNumber: inputSecurityNumber.value,
        filePath: inputFilePath.value,
      },
    });

    if (data.createAdminUser) {
      toast.notify("????????? ?????????????????????.", {
        duration: 5,
        type: "success",
      });
      setCurrentTab(0);
      userRefetch();
    } else {
      toast.notify("?????? ??? ?????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const changeUpdateModeHandler = (data) => {
    setCurrentTab(1);
    setCurrentMode(1);
    setCurrentId(data._id);

    inputUserId.setValue(data.userId);
    inputRank.setValue(data.rank);
    inputName.setValue(data.name);
    inputMobile.setValue(data.mobile);
    inputAddress.setValue(data.address);
    inputSecurityNumber.setValue(data.securityNumber);
    inputFilePath.setValue(data.filePath);
  };

  const updateAdminUserHandler = async () => {
    if (!inputRank.value || inputRank.value.trim() === "") {
      toast.notify("????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputName.value || inputName.value.trim() === "") {
      toast.notify("????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputMobile.value || inputMobile.value.trim() === "") {
      toast.notify("???????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputAddress.value || inputAddress.value.trim() === "") {
      toast.notify("????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputSecurityNumber.value || inputSecurityNumber.value.trim() === "") {
      toast.notify("??????????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputFilePath.value) {
      toast.notify("????????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (isLoading) {
      toast.notify("????????? ??????????????? ????????????. ????????? ??????????????????.", {
        duration: 5,
        type: "info",
      });
      return;
    }

    const { data } = await updateAdminUserMutation({
      variables: {
        id: currentId,
        rank: inputRank.value,
        name: inputName.value,
        mobile: inputMobile.value,
        address: inputAddress.value,
        securityNumber: inputSecurityNumber.value,
        filePath: inputFilePath.value,
      },
    });

    if (data.updateAdminUser) {
      toast.notify("??????????????? ?????? ???????????????.", {
        duration: 5,
        type: "success",
      });
      setCurrentTab(0);
      setCurrentMode(0);
      setCurrentId("");

      inputUserId.setValue("");
      inputPassword.setValue("");
      inputRank.setValue("");
      inputName.setValue("");
      inputMobile.setValue("");
      inputAddress.setValue("");
      inputSecurityNumber.setValue("");
      inputFilePath.setValue("");

      userRefetch();
    } else {
      toast.notify("?????? ??? ?????? ??????????????????.", {
        duration: 5,
        type: "error",
      });
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    userRefetch();
  }, []);

  return (
    <AD14Presenter
      fileRef={fileRef}
      //
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      currentMode={currentMode}
      isLoading={isLoading}
      searchValue={searchValue}
      inputUserId={inputUserId}
      inputPassword={inputPassword}
      inputRank={inputRank}
      inputName={inputName}
      inputMobile={inputMobile}
      inputAddress={inputAddress}
      inputSecurityNumber={inputSecurityNumber}
      inputFilePath={inputFilePath}
      //
      userDatum={userDatum && userDatum.getAdminUserSearch}
      //
      fileChangeHandler={fileChangeHandler}
      deleteAdminUserHandler={deleteAdminUserHandler}
      createAdminUserHandler={createAdminUserHandler}
      changeUpdateModeHandler={changeUpdateModeHandler}
      updateAdminUserHandler={updateAdminUserHandler}
    />
  );
};
