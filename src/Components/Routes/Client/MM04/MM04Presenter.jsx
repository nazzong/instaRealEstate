import React from "react";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  UlWrapper,
  LiWrapper,
  Image,
} from "../../../CommonComponents";
import styled from "styled-components";
import { BiDownArrow } from "react-icons/bi";
import Theme from "../../../../Styles/Theme";
import { withResizeDetector } from "react-resize-detector";
import "@4leaf.njm/react-quill/dist/quill.snow.css";
import useWindowSize from "../../../Hooks/useWindowSize";

const MM04Presenter = ({
  width,
  //
  descriptionRef,
  //
  estateData,
}) => {
  const size = useWindowSize();

  return (
    <WholeWrapper padding={size.width < 900 ? `70px 0 0` : `210px 0 0`}>
      <RsWrapper>
        <Wrapper
          dr={size.width < 700 ? `column` : `row`}
          al={`normal`}
          padding={`0 0 40px`}
        >
          <Wrapper
            ju={`flex-start`}
            width={size.width < 700 ? `100%` : `300px`}
            borderLeft={`1px solid #eee`}
            borderRight={`1px solid #eee`}
          >
            <Wrapper isSticky={size.width < 700 ? false : true} top={`0`}>
              <Wrapper
                height={`40px`}
                bgColor={Theme.basicTheme_C}
                color={Theme.white_C}
                fontSize={`14px`}
                al={`flex-start`}
                padding={`0 20px `}
                margin={`0 0 5px`}
                shadow={`0px 1px 5px ${Theme.basicTheme_C}`}
              >
                HOME&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;INSTA
              </Wrapper>

              <Wrapper
                isRelative={true}
                dr={`row`}
                shadow={`0px 1px 10px #eee`}
                padding={`10px 0`}
                fontSize={`14px`}
                fontWeight={`bold`}
                borderBottom={`1px solid #eee`}
              >
                인 스 타 소 개
                <Wrapper
                  isAbsolute={true}
                  right={`30px`}
                  top={`50%`}
                  margin={`-8px 0 0 0`}
                  width={`auto`}
                >
                  <BiDownArrow color={`#767676`} />
                </Wrapper>
              </Wrapper>

              <Wrapper
                padding={`25px 20px`}
                shadow={`0px 1px 10px #eee`}
                borderBottom={`1px solid #eee`}
              >
                {estateData && estateData.name && (
                  <UlWrapper dr={`row`} al={`normal`} margin={`5px 0`}>
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`85px`}
                      fontSize={`14px`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      상호명
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 70px)`}
                      fontSize={`14px`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {estateData.name}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {estateData && estateData.address && (
                  <UlWrapper dr={`row`} al={`normal`} margin={`5px 0`}>
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`85px`}
                      fontSize={`14px`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      주소지
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 70px)`}
                      fontSize={`14px`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {estateData.address}
                      <br />
                      {estateData.detailAddress}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {estateData && estateData.location && (
                  <UlWrapper dr={`row`} al={`normal`} margin={`5px 0`}>
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`85px`}
                      fontSize={`14px`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      찾아오는길
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 70px)`}
                      fontSize={`14px`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {estateData.location}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {estateData && estateData.tel && (
                  <UlWrapper dr={`row`} al={`normal`} margin={`5px 0`}>
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`85px`}
                      fontSize={`14px`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      전화번호
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 70px)`}
                      fontSize={`14px`}
                      color={`#222`}
                    >
                      {estateData.tel}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {estateData && estateData.fax && (
                  <UlWrapper dr={`row`} al={`normal`} margin={`5px 0`}>
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`85px`}
                      fontSize={`14px`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      팩스
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 70px)`}
                      fontSize={`14px`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {estateData.fax}
                    </LiWrapper>
                  </UlWrapper>
                )}
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                shadow={`0px 1px 10px #eee`}
                padding={`20px 15px`}
                borderBottom={`1px solid #eee`}
              >
                <Image
                  src={estateData && estateData.managerThumbnail}
                  width={`55px`}
                  height={`55px`}
                  border={`1px solid #eee`}
                />

                <UlWrapper
                  width={`calc(100% - 100px)`}
                  al={`flex-start`}
                  padding={`0 15px`}
                >
                  <LiWrapper
                    fontSize={`13px`}
                    color={`#333`}
                    lineHeight={`130%`}
                  >
                    {estateData && estateData.managerRank} :&nbsp;
                    {estateData && estateData.managerName}
                  </LiWrapper>

                  <LiWrapper
                    fontSize={`13px`}
                    color={`#333`}
                    lineHeight={`130%`}
                  >
                    {estateData && estateData.managerTel}
                  </LiWrapper>

                  <LiWrapper
                    fontSize={`13px`}
                    color={`#333`}
                    lineHeight={`130%`}
                  >
                    {estateData && estateData.managerEmail}
                  </LiWrapper>
                </UlWrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper
            ref={descriptionRef}
            width={size.width < 700 ? `100%` : `calc(100% - 300px)`}
            padding={`80px 20px`}
            className={`ql-editor editor__view`}
          ></Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default withResizeDetector(MM04Presenter);
