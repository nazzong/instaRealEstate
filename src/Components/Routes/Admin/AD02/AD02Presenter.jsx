import React from "react";
import {
  WholeWrapper,
  Wrapper,
  CommonButton,
  InfoText,
  TextInput,
  Textarea,
  GuideBox,
  GuideContent,
  FileInput,
  FileLabel,
} from "../../../../Components/AdminCommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";

const tabs = [
  "BANNER - 1",
  "BANNER - 2",
  "BANNER - 3",
  "BANNER - 4",
  "BANNER - 5",
];

const ImgBox = styled(Wrapper)`
  background-image: url(${(props) => props.src});
  background-position: center center;
`;

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  title,
  setTitle,
  content,
  setContent,
  link,
  setLink,
  //
  mainBannerDatum,
  //
  infoUpdateHandler,
  fileChangeHandler,
}) => {
  return (
    <WholeWrapper minWidth={`1000px`} al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="메인베너 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Fade bottom>
        <Wrapper minWidth={`1344px`} al={`flex-start`} ju={`flex-start`}>
          <Wrapper>
            <GuideBox margin={`10px 0px`} padding={`10px 0px`}>
              <GuideContent padding={`0px 10px`} margin={`5px 0px`}>
                이미지 사이즈(비율)은 가로 1920px, 세로 500px을 권장합니다.
              </GuideContent>
              <GuideContent padding={`0px 10px`} margin={`5px 0px`}>
                사진 이미지 비율이 상이할 경우 화면에서 출력될 때 올바르게
                출력되지 않을 수 있습니다.
              </GuideContent>
            </GuideBox>
          </Wrapper>

          <Wrapper>
            <ImgBox
              width={`1344px`}
              height={`350px`}
              margin={`0px auto`}
              isBorder={true}
              src={mainBannerDatum && mainBannerDatum[currentTab].imagePath}
            ></ImgBox>

            <Wrapper
              width={`1344px`}
              al={`flex-end`}
              ju={`flex-end`}
              margin={`10px 0px`}
            >
              <FileInput
                id="file-js"
                type="file"
                accept="image/jpeg,image/gif,image/png"
                onChange={fileChangeHandler}
              />

              {isLoading ? (
                <CircularIndeterminate />
              ) : (
                <FileLabel
                  width={`200px`}
                  htmlFor={`file-js`}
                  margin={`10px 0px 0px 0px`}
                >
                  BANNER UPLOAD
                </FileLabel>
              )}
            </Wrapper>
          </Wrapper>
          <Wrapper margin={`10px 0px`}>
            <Wrapper dr={`row`} margin={`10px 0px 0px 0px`}>
              <InfoText width={`160px`}>TITLE</InfoText>
              <TextInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Wrapper>

            <Wrapper
              dr={`row`}
              margin={`10px 0px 0px 0px`}
              al={`flex-start`}
              ju={`flex-start`}
            >
              <InfoText width={`160px`}>CONTENT</InfoText>
              <Textarea
                height={`200px`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Wrapper>

            <Wrapper dr={`row`} margin={`10px 0px 0px 0px`}>
              <InfoText width={`160px`}>MOVE LINK</InfoText>
              <TextInput
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Wrapper>

            <Wrapper
              al={`flex-end`}
              ju={`flex-end`}
              margin={`10px 0px 0px 0px`}
            >
              <CommonButton kindOf={`update`} onClick={infoUpdateHandler}>
                INFO UPDATE
              </CommonButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Fade>
    </WholeWrapper>
  );
};
