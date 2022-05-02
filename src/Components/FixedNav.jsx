import React from "react";
import styled from "styled-components";
import { translate10 } from "../Components/AnimationCommon";
import { Image } from "../Components/CommonComponents";

const FixedWraper = styled.div`
  position: fixed;
  bottom: 70px;
  right: 5px;
  z-index: 1000;

  @media (max-width: 700px) {
    top: auto;
    bottom: 60px;
    right: 10px;
  }
`;

const FixedContents = styled.div`
  width: 135px;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 4px;
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize};
  cursor: pointer;
  transition: 0.3s;
  line-height: 1.4;
  text-align: center;

  &:hover {
    background: rgba(134, 134, 134, 0.78);
  }

  @media (max-width: 700px) {
    margin: 0px 0px 10px;
  }
`;

const FixedNav = () => {
  return (
    <FixedWraper>
      <a href="http://pf.kakao.com/_UfhxjK" target="_blank">
        <FixedContents margin={`0px 0px 10px`}>
          <Image
            width={`22px`}
            radius={`4px`}
            margin={`0px 8px 0px 0px`}
            alt="카카오톡 아이콘"
            src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EBONE%2Fassets%2Fimages%2Ficon%2Fkakao-icon.png?alt=media&token=27dfa1a1-5780-489b-92f9-d01212b4903c`}
          />
          1:1 카톡상담
        </FixedContents>
      </a>
      {/* <a href="tel:16442753">
        <FixedContents fontSize={`14px`}>
          
          <br />
          1644-2753
        </FixedContents>
      </a> */}
    </FixedWraper>
  );
};

export default FixedNav;
