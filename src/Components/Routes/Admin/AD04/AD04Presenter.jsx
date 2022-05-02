import React from "react";
import {
  WholeWrapper,
  Wrapper,
  GuideBox,
  GuideContent,
  FileInput,
  FileLabel,
  CommonButton,
} from "../../../../Components/AdminCommonComponents";
import dynamic from "next/dynamic";
const Title = dynamic(import("../Components/Title"));
const Tabs = dynamic(import("../Components/Tabs"));
const Fade = dynamic(import("react-reveal/Fade"));
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";

const tabs = ["POPUP - 1", "POPUP - 2", "POPUP - 3"];

const ImageBox = styled(Wrapper)`
  width: 330px;
  height: 450px;
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.src});
`;

const StatusText = styled.div`
  width: 330px;
  margin: 10px 0px;

  text-align: center;
  color: ${(props) =>
    props.status ? props.theme.create_B_C : props.theme.delete_B_C};
`;

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  //
  popupDatum,
  //
  fileChangeHandler,
  modifyPopupStatus,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="팝업 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper>
        <GuideBox padding={`10px`}>
          <GuideContent margin={`0px 0px 5px 0px`}>
            팝업의 이미지 크기는 가로 330px 새로 450px 입니다.
          </GuideContent>
          <GuideContent margin={`0px 0px 5px 0px`}>
            사이즈(비율)이 상이할 경우 이미지가 비정상으로 보일 수 있습니다.
          </GuideContent>
          <GuideContent>
            동일한 파일을 연속해서 업로드 하는 경우 중복방지를 위해 작동이
            중단될 수 있습니다.
          </GuideContent>
        </GuideBox>

        <Wrapper margin={`40px 40px`}>
          <ImageBox
            isBorder={true}
            margin={`0px 0px 10px 0px`}
            src={popupDatum && popupDatum[currentTab].imagePath}
          />

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
              width={`330px`}
              htmlFor={`file-js`}
              margin={`10px 0px 10px 0px`}
            >
              POPUP IMAGE UPLOAD
            </FileLabel>
          )}

          <StatusText status={popupDatum && popupDatum[currentTab].useYn}>
            {popupDatum && popupDatum[currentTab].useYn
              ? `해당 팝업은 사용 상태 입니다.`
              : `해당 팝업은 미사용 상태 입니다.`}
          </StatusText>
          <CommonButton
            kindOf={
              popupDatum && popupDatum[currentTab].useYn ? `delete` : `update`
            }
            width={`330px`}
            onClick={modifyPopupStatus}
          >
            {popupDatum && popupDatum[currentTab].useYn
              ? `사용 중단하기`
              : `사용 활성화 하기`}
          </CommonButton>
        </Wrapper>
      </Wrapper>
    </WholeWrapper>
  );
};
