import React, { useState } from "react";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  CommonSubTitle,
} from "../../../CommonComponents";
import { withResizeDetector } from "react-resize-detector";

const MM03Presenter = ({ width }) => {
  return (
    <WholeWrapper padding={width < 900 ? `70px 0 0` : `210px 0 0`}>
      <RsWrapper></RsWrapper>
    </WholeWrapper>
  );
};

export default withResizeDetector(MM03Presenter);
