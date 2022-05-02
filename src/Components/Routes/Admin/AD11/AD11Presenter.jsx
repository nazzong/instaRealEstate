import React from "react";
import {
  WholeWrapper,
  Wrapper,
  InfoText,
  TextInput,
  CommonButton,
} from "../../../../Components/AdminCommonComponents";
import dynamic from "next/dynamic";
const Title = dynamic(import("../Components/Title"));
const Tabs = dynamic(import("../Components/Tabs"));
const Fade = dynamic(import("react-reveal/Fade"));
import styled from "styled-components";

const tabs = ["블로그 링크 관리"];

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  //
  link,
  setLink,
  //
  infoUpdateHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="블로그 링크 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper
        isBorder={true}
        al={`center`}
        ju={`center`}
        padding={`20px`}
        height={`200px`}
        isScroll={true}
      >
        <Fade left delay={0}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>LINK</InfoText>
            <TextInput
              width={`600px`}
              height={`30px`}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Wrapper>
        </Fade>

        <Fade left delay={240}>
          <Wrapper al={`flex-end`} ju={`flex-end`} margin={`70px 0px 0px 0px`}>
            <CommonButton kindOf={`update`} onClick={infoUpdateHandler}>
              LINK UPDATE
            </CommonButton>
          </Wrapper>
        </Fade>
      </Wrapper>
    </WholeWrapper>
  );
};
