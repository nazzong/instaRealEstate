import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-nextjs-toast";
import useInput from "../../../../Components/Hooks/useInput";
import useOnlyNumberInput from "../../../../Components/Hooks/useOnlyNumberInput";
const MM90Presenter = dynamic(import("./MM90Presenter"));
import { useRouter } from "next/router";

import {
  CREATE_USER,
  GET_USER_BY_EMAIL,
  GET_USER_BY_MOBILE,
} from "./MM90Queries";

const MM90Container = ({}) => {
  ////////////// - VARIABLES- ///////////////
  const router = useRouter();

  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);

  const [checkAgree1, setCheckAgree1] = useState(false);
  const [checkAgree2, setCheckAgree2] = useState(false);

  const inputName = useInput("");

  const inputEmail = useInput("");
  const inputEmailDomain = useInput("");
  const selectEmailDomain = useInput("");

  const inputMobile1 = useOnlyNumberInput("");
  const inputMobile2 = useOnlyNumberInput("");
  const inputMobile3 = useOnlyNumberInput("");

  const [emailSkip, setEmailSkip] = useState(true);
  const [mobileSkip, setMobileSkip] = useState(true);

  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [isMobileCheck, setIsMobileCheck] = useState(false);

  ////////////// - USE QUERY- ///////////////
  const {
    data: emailData,
    loading: emailLoading,
    refetch: emailRefetch,
  } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email:
        inputEmail.value +
        "@" +
        (selectEmailDomain.value === "직접입력"
          ? inputEmailDomain.value
          : selectEmailDomain.value),
    },
    skip: emailSkip,
  });

  const {
    data: mobileData,
    loading: mobileLoading,
    refetch: mobileRefetch,
  } = useQuery(GET_USER_BY_MOBILE, {
    variables: {
      mobile: `${inputMobile1.value}-${inputMobile2.value}-${inputMobile3.value}`,
    },
    skip: mobileSkip,
  });

  ///////////// - USE MUTATION- /////////////
  const [createUserMutation] = useMutation(CREATE_USER);

  ///////////// - EVENT HANDLER- ////////////
  const checkAgreeHandler = () => {
    if (!checkAgree1) {
      toast.notify("개인정보 처리방침에 동의해주세요.", {
        duration: 5,
        type: "info",
      });
      return;
    }

    if (!checkAgree2) {
      toast.notify("이용약관에 동의해주세요.", {
        duration: 5,
        type: "info",
      });
      return;
    }

    setCurrentTab(1);
  };

  const checkEmailHandler = () => {
    if (!inputEmail.value || inputEmail.value.trim() === "") {
      toast.notify("이메일을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!selectEmailDomain.value || selectEmailDomain.value.trim() === "") {
      toast.notify("이메일 도메인을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (
      selectEmailDomain.value === "직접입력" &&
      (!inputEmailDomain.value || inputEmailDomain.value.trim() === "")
    ) {
      toast.notify("이메일 도메인을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    setEmailSkip(false);
  };

  const checkMobileHandler = () => {
    if (!inputMobile1.value || inputMobile1.value.trim() === "") {
      toast.notify("휴대폰 번호를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!inputMobile2.value || inputMobile2.value.trim() === "") {
      toast.notify("휴대폰 번호를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!inputMobile3.value || inputMobile3.value.trim() === "") {
      toast.notify("휴대폰 번호를 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    setMobileSkip(false);
  };

  const createUserHandler = () => {
    if (!inputName.value || inputName.value.trim() === "") {
      toast.notify("이름을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!isEmailCheck) {
      toast.notify("이메일 중복확인을 해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!isMobileCheck) {
      toast.notify("휴대폰 번호 중복확인을 해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    confirmAlert({
      title: "알림",
      message: "입력하신 정보로 회원가입 하시겠습니까 ?",
      buttons: [
        {
          label: "확인",
          onClick: () => {
            createUserHandlerAfter();
          },
        },
        {
          label: "취소",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  const createUserHandlerAfter = async () => {
    const { data } = await createUserMutation({
      variables: {
        name: inputName.value,
        email:
          inputEmail.value +
          "@" +
          (selectEmailDomain.value === "직접입력"
            ? inputEmailDomain.value
            : selectEmailDomain.value),
        mobile: `${inputMobile1.value}-${inputMobile2.value}-${inputMobile3.value}`,
      },
    });

    if (data.createUser) {
      toast.notify("회원가입 되었습니다.", {
        duration: 5,
        type: "success",
      });

      setCurrentTab(2);

      inputEmail.setValue("");
      inputEmailDomain.setValue("");
      selectEmailDomain.setValue("");
      inputMobile1.setValue("");
      inputMobile2.setValue("");
      inputMobile3.setValue("");
      inputName.setValue("");
    } else {
      toast.notify("가입 중 문제가 발생했습니다. 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };

  const moveLinkHandler = (link) => {
    router.push(link);
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    emailRefetch();
    mobileRefetch();
  }, []);

  useEffect(() => {
    if (emailData) {
      if (!emailData.getUserByEmail) {
        toast.notify("사용 가능한 이메일입니다.", {
          duration: 5,
          type: "success",
        });
        setIsEmailCheck(true);
      } else {
        toast.notify("이미 사용중인 이메일입니다.", {
          duration: 5,
          type: "error",
        });
        setIsEmailCheck(false);
      }
      setEmailSkip(true);
    }
  }, [emailData]);

  useEffect(() => {
    if (mobileData) {
      if (!mobileData.getUserByMobile) {
        toast.notify("사용 가능한 휴대폰 번호입니다.", {
          duration: 5,
          type: "success",
        });
        setIsMobileCheck(true);
      } else {
        toast.notify("이미 사용중인 휴대폰 번호입니다.", {
          duration: 5,
          type: "error",
        });
        setIsMobileCheck(false);
      }
      setMobileSkip(true);
    }
  }, [mobileData]);

  return (
    <MM90Presenter
      currentTab={currentTab}
      inputName={inputName}
      inputEmail={inputEmail}
      inputEmailDomain={inputEmailDomain}
      selectEmailDomain={selectEmailDomain}
      inputMobile1={inputMobile1}
      inputMobile2={inputMobile2}
      inputMobile3={inputMobile3}
      checkAgree1={checkAgree1}
      setCheckAgree1={setCheckAgree1}
      checkAgree2={checkAgree2}
      setCheckAgree2={setCheckAgree2}
      //
      checkEmailHandler={checkEmailHandler}
      checkMobileHandler={checkMobileHandler}
      createUserHandler={createUserHandler}
      checkAgreeHandler={checkAgreeHandler}
      moveLinkHandler={moveLinkHandler}
    />
  );
};

export default MM90Container;
