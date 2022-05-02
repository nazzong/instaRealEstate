import React, { useState, useEffect } from "react";
import AD11Presenter from "./AD11Presenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-nextjs-toast";
import { GET_BLOG_LINK, MODIFY_BLOG_LINK } from "./AD11Queries.js";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [link, setLink] = useState("");

  const [dataFlag, setDataFlag] = useState(true);

  /////////////// - USE REF- ////////////////

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const {
    data: blogLinkData,
    loading: blogLinkLoading,
    refetch: blogLinkRefetch,
  } = useQuery(GET_BLOG_LINK);

  if (!blogLinkLoading) {
    if (dataFlag) {
      setLink(blogLinkData.getBlogLink.link);
      setDataFlag(false);
    }
  }

  ///////////// - USE MUTATION- /////////////
  const [modifyBlogLinkMutation] = useMutation(MODIFY_BLOG_LINK);

  ///////////// - EVENT HANDLER- ////////////
  const infoUpdateHandler = async () => {
    const { data } = await modifyBlogLinkMutation({
      variables: {
        id: blogLinkData.getBlogLink._id,
        link,
      },
    });

    if (data.modifyBlogLink) {
      toast.notify("BLOG LINK UPDATE", {
        duration: 5,
        type: "info",
      });
      blogLinkRefetch();
    }
    setIsLoading(false);
  };
  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    blogLinkRefetch();
  }, []);

  useEffect(() => {
    setDataFlag(true);
  }, [currentTab]);

  return (
    <AD11Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      //
      link={link}
      setLink={setLink}
      //
      infoUpdateHandler={infoUpdateHandler}
    />
  );
};
