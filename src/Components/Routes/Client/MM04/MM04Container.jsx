import React, { useEffect, useRef } from "react";
import MM04Presenter from "./MM04Presenter";
import { GET_ESTATE } from "./MM04Queries.js";
import { useQuery } from "@apollo/react-hooks";

const MM04Container = () => {
  ////////////// - USE REF- /////////// ////
  const descriptionRef = useRef();

  ////////////// - USE STATE- /////////// ////

  ////////////// - USE QUERY- ///////////////
  const { data: estateData, refetch: estateRefetch } = useQuery(GET_ESTATE);

  ///////////// - USE MUTATION- /////////////

  ///////////// - EVENT HANDLER- ////////////

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    estateRefetch();
  }, []);

  useEffect(() => {
    if (estateData) {
      descriptionRef.current.innerHTML = estateData.getEstate.description;
    }
  }, [estateData]);

  return (
    <MM04Presenter
      descriptionRef={descriptionRef}
      //
      estateData={estateData && estateData.getEstate}
    />
  );
};

export default MM04Container;
