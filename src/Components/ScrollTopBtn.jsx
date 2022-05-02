import React from "react";
import styled from "styled-components";
import { IoIosArrowDropup } from "react-icons/io";
import { translate10 } from "../Components/AnimationCommon";
import { Text, Wrapper } from "../Components/CommonComponents";
import { animateScroll as scroll } from "react-scroll";

const FixedWraper = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  position: fixed;
  bottom: 10px;
  right: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 10;

  & svg {
    font-size: 30px;
    margin: 5px 0px;
    cursor: pointer;
    transition: transform 600ms ease-in-out 0s;

    &:hover {
      transform: rotateY(360deg);
    }
  }

  @media (max-width: 700px) {
    bottom: 20px;
    right: 20px;
  }
`;

const _moveScroll = (val) => {
  scroll.scrollTo(val);
};

const ScrollTopBtn = () => {
  return (
    <FixedWraper>
      <IoIosArrowDropup onClick={() => _moveScroll(0)} />
    </FixedWraper>
  );
};

export default ScrollTopBtn;
