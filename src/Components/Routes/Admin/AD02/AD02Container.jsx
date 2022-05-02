import React, { useState, useEffect } from "react";
import AD02Presenter from "./AD02Presenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-nextjs-toast";
import {
  GET_MAINBANNER,
  MODIFY_MAINBANNER,
  MODIFY_MAINBANNER_IMAGEPATH,
} from "./AD02Queries.js";
import { resizeImage } from "../../../../commonUtils";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [dataFlag, setDataFlag] = useState(true);

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const {
    data: mainBannerDatum,
    loading: mainBannerLoading,
    refetch: mainBannerRefetch,
  } = useQuery(GET_MAINBANNER);

  if (!mainBannerLoading) {
    if (dataFlag) {
      setTitle(mainBannerDatum.getMainBanner[currentTab].title);

      let newContent = mainBannerDatum.getMainBanner[currentTab].content;
      newContent = String(newContent);

      const arr = newContent.split("<br />");
      let afterString = "";

      arr.map((data) => {
        afterString = afterString + data + "\n";
      });

      setContent(afterString);
      setLink(mainBannerDatum.getMainBanner[currentTab].link);
      setDataFlag(false);
    }
  }

  ///////////// - USE MUTATION- /////////////
  const [modifyMainBannerMutation] = useMutation(MODIFY_MAINBANNER);
  const [modifyMainBannerImagePathMutation] = useMutation(
    MODIFY_MAINBANNER_IMAGEPATH
  );

  ///////////// - EVENT HANDLER- ////////////
  const infoUpdateHandler = async () => {
    const { data } = await modifyMainBannerMutation({
      variables: {
        id: mainBannerDatum && mainBannerDatum.getMainBanner[currentTab]._id,
        title,
        content,
        link,
      },
    });

    if (data.modifyMainBanner) {
      toast.notify("MAIN BANNER INFORMATION UPDATE", {
        duration: 5,
        type: "info",
      });
      mainBannerRefetch();
    }
  };

  const fileChangeHandler = async (e) => {
    setIsLoading(true);

    const file = e.target.files[0];

    if (!file) {
      setIsLoading(false);
      return;
    }

    const db_path = await resizeImage(
      "INSTA-ESTATE/uploads/mainBanner",
      file,
      1920,
      500
    );

    const { data } = await modifyMainBannerImagePathMutation({
      variables: {
        id: mainBannerDatum && mainBannerDatum.getMainBanner[currentTab]._id,
        imagePath: db_path,
      },
    });

    if (data.modifyMainBannerImagePath) {
      toast.notify("MAIN BANNER IMAGE UPDATE", {
        duration: 5,
        type: "info",
      });
      mainBannerRefetch();
    } else {
      toast.notify("잠시 후 다시 시도해주세요.", {
        duration: 5,
        type: "error",
      });
    }

    setIsLoading(false);
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    mainBannerRefetch();
  }, []);

  useEffect(() => {
    setDataFlag(true);
  }, [currentTab]);

  return (
    <AD02Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      link={link}
      setLink={setLink}
      //
      mainBannerDatum={mainBannerDatum && mainBannerDatum.getMainBanner}
      //
      infoUpdateHandler={infoUpdateHandler}
      fileChangeHandler={fileChangeHandler}
    />
  );
};
