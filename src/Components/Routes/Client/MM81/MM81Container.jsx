import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@apollo/react-hooks";
const MM81Presenter = dynamic(import("./MM81Presenter"));
import { GET_FAQDETAIL, GET_FAQTYPE } from "./MM81Queries";

const MM81Container = () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [dataSkip, setDataSkip] = useState(true);
  const [actionFaqView, setActionFaqView] = useState(null);

  ////////////// - USE QUERY- ///////////////

  const {
    data: faqTypeDatum,
    loading: faqTypeLoading,
    refetch: faqTypeRefetch,
  } = useQuery(GET_FAQTYPE);

  const { data: faqDatum, loading: faqLoading, refetch: faqRefetch } = useQuery(
    GET_FAQDETAIL,
    {
      variables: {
        typeName: faqTypeDatum
          ? faqTypeDatum.getFaqType[currentTab].typeName
          : "",
      },
      skip: dataSkip,
    }
  );

  ///////////// - USE MUTATION- /////////////

  ///////////// - EVENT HANDLER- ////////////
  const onToggleFaqAnswer = (id, content) => {
    if (typeof document !== "undefined") {
      let currentFaqAction = actionFaqView.map((action, idx) =>
        idx === id ? !action : action
      );
      const answer = document.getElementById(`faq-answer-${id}`);
      answer.innerHTML = content;
      setActionFaqView(currentFaqAction);
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    if (faqTypeDatum && faqTypeDatum.getFaqType) {
      setDataSkip(false);
    }
  }, [faqTypeDatum]);

  useEffect(() => {
    if (faqDatum && faqDatum.getFaqDetail && !actionFaqView) {
      let defaultAction = faqDatum.getFaqDetail.map(() => {
        return false;
      });

      setActionFaqView(defaultAction);
    }
  }, [faqDatum]);

  useEffect(() => {
    faqTypeRefetch();
    faqRefetch();
  }, []);

  return (
    <MM81Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      actionFaqView={actionFaqView}
      setActionFaqView={setActionFaqView}
      //
      faqDatum={faqDatum && faqDatum.getFaqDetail}
      faqTypeDatum={faqTypeDatum && faqTypeDatum.getFaqType}
      //
      onToggleFaqAnswer={onToggleFaqAnswer}
    />
  );
};

export default MM81Container;
