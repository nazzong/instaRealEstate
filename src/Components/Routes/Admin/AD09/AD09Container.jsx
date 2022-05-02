import React, { useEffect, useState } from "react";
import AD09Presenter from "./AD09Presenter";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_EVENTBOARD, CREATE_EVENTBOARD } from "./AD09Queries.js";
import { toast } from "react-nextjs-toast";
import useInput from "../../../../Components/Hooks/useInput";
import { resizeImage } from "../../../../commonUtils";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [currentThumbnail, setCurrentThumbnail] = useState("");

  const currentTitle = useInput("");
  const [currentDescription, setCurrentDescription] = useState("");
  const currentEventTerm = useInput("");
  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////

  ///////////// - USE MUTATION- /////////////
  const [createEventBoardMutation] = useMutation(CREATE_EVENTBOARD);

  ///////////// - EVENT HANDLER- ////////////
  const fileChangeHandler = async (e) => {
    setIsLoading(true);

    const file = e.target.files[0];

    if (!file) {
      setIsLoading(false);
      return;
    }

    const db_path = await resizeImage(
      "INSTA-ESTATE/uploads/eventBoard",
      file,
      350,
      350
    );

    setCurrentThumbnail(db_path);

    setIsLoading(false);
  };

  const createEventBoardHandler = async () => {
    if (!currentThumbnail || currentThumbnail.trim() === "") {
      toast.notify("상품 이미지는 필수 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!currentTitle.value || currentTitle.value.trim() === "") {
      toast.notify("첫번째 상세 이미지 필수 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!currentDescription || currentDescription.trim() === "") {
      toast.notify("두번째 상세 이미지 필수 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }
    if (!currentEventTerm.value || currentEventTerm.value.trim() === "") {
      toast.notify("세번째 상세 이미지 필수 입니다.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    const { data } = await createEventBoardMutation({
      variables: {
        thumbnail: currentThumbnail,
        title: currentTitle.value,
        eventTerm: currentEventTerm.value,
        description: currentDescription,
      },
    });

    if (data.createEventBoard) {
      toast.notify("CREATE EVENTBOARD!", {
        duration: 5,
        type: "info",
      });

      setCurrentThumbnail("");
      currentTitle.setValue("");
      currentEventTerm.setValue("");
      setCurrentDescription("");
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }
  };
  ////////////// - USE EFFECT- //////////////

  return (
    <AD09Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      //
      currentThumbnail={currentThumbnail}
      currentTitle={currentTitle}
      currentDescription={currentDescription}
      setCurrentDescription={setCurrentDescription}
      currentEventTerm={currentEventTerm}
      //

      fileChangeHandler={fileChangeHandler}
      createEventBoardHandler={createEventBoardHandler}
    />
  );
};
