import React, { useEffect, useState } from "react";
import AD13Presenter from "./AD13Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_USER_SEARCH,
  DELETE_USER,
  SEND_USER_MESSAGE,
} from "./AD13Queries.js";
import { toast } from "react-nextjs-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useInput from "../../../../Components/Hooks/useInput";

export default () => {
  ////////////// - VARIABLE- ////////////////

  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const searchValue = useInput("");
  const inputType = useInput("");
  const inputText = useInput("");

  const [checkAll, setCheckAll] = useState(false);
  const [checkList, setCheckList] = useState(null);

  ////////////// - USE QUERY- ///////////////
  const { data: userDatum, refetch: userRefetch } = useQuery(GET_USER_SEARCH, {
    variables: {
      searchValue: searchValue.value,
    },
  });

  ///////////// - USE MUTATION- /////////////
  const [deleteUserMutation] = useMutation(DELETE_USER);
  const [sendUserMessageMutation] = useMutation(SEND_USER_MESSAGE);

  ///////////// - EVENT HANDLER- ////////////
  const deleteUserHandler = (id) => {
    confirmAlert({
      title: "DELETE USER DATA",
      message: "선택하신 회원을 삭제하시겠습니까?",
      buttons: [
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
        {
          label: "확인",
          onClick: () => deleteUserHandlerAfter(id),
        },
      ],
    });
  };

  const deleteUserHandlerAfter = async (id) => {
    const { data } = await deleteUserMutation({
      variables: {
        id,
      },
    });

    if (data.deleteUser) {
      toast.notify("정상적으로 처리 되었습니다.", {
        duration: 5,
        type: "success",
      });

      userRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const sendMessageHandler = async () => {
    if (!inputType.value || inputType.value.trim() === "") {
      toast.notify("전송유형을 선택해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!inputText.value || inputText.value.trim() === "") {
      toast.notify("내용을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const user = new Array();
    checkList.map((data) => {
      user.push(data.value);
    });

    const { data } = await sendUserMessageMutation({
      variables: {
        user,
        type: inputType.value,
        text: inputText.value.replace(/\n/g, "<br />"),
      },
    });

    if (data.sendUserMessage) {
      toast.notify("정상적으로 전송되었습니다", {
        duration: 5,
        type: "success",
      });
    } else {
      toast.notify("전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }

    inputType.setValue("");
    inputText.setValue("");

    checkList.map((data, idx) => {
      checkList[idx] = { ...data, checked: false };
    });

    setCheckList(checkList);
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

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    userRefetch();
  }, []);

  useEffect(() => {
    searchValue.setValue("");
  }, [currentTab]);

  useEffect(() => {
    const list = [];

    if (userDatum) {
      userDatum.getUserSearch.map((data, idx) => {
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
      setCheckList(list);
    }
  }, [userDatum]);

  return (
    <AD13Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      searchValue={searchValue}
      inputType={inputType}
      inputText={inputText}
      checkAll={checkAll}
      checkList={checkList}
      //
      userDatum={userDatum && userDatum.getUserSearch}
      //
      deleteUserHandler={deleteUserHandler}
      sendMessageHandler={sendMessageHandler}
      changeCheckboxHandler={changeCheckboxHandler}
    />
  );
};
