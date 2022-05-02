import React from "react";
import {
  WholeWrapper,
  Wrapper,
  InfoText,
  TextInput,
  CommonButton,
  FileInput,
} from "../../../../Components/AdminCommonComponents";
import dynamic from "next/dynamic";
const Title = dynamic(import("../Components/Title"));
const Tabs = dynamic(import("../Components/Tabs"));
const Fade = dynamic(import("react-reveal/Fade"));
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";
import Editor from "../../../../Components/editor/Editor.jsx";

const tabs = ["부동산정보 관리"];

const ImgBox = styled(Wrapper)`
  background-image: url(${(props) => props.src});
  background-position: center center;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  fileRef,
  //
  currentTab,
  setCurrentTab,
  isLoading,
  //
  name,
  setName,
  address,
  setAddress,
  detailAddress,
  setDetailAddress,
  location,
  setLocation,
  tel,
  setTel,
  fax,
  setFax,
  description,
  setDescription,
  managerRank,
  setManagerRank,
  managerName,
  setManagerName,
  managerTel,
  setManagerTel,
  managerEmail,
  setManagerEmail,
  managerThumbnail,
  setManagerThumbnail,
  //
  fileChangeHandler,
  infoUpdateHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="부동산정보 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      <Wrapper isBorder={true} al={`center`} ju={`center`} padding={`20px`}>
        <Fade left delay={0}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>상호명</InfoText>
            <TextInput
              width={`700px`}
              height={`30px`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={30}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>주소지</InfoText>
            <TextInput
              width={`700px`}
              height={`30px`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={60}>
          <Wrapper
            dr={`row`}
            margin={`5px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}></InfoText>
            <TextInput
              width={`700px`}
              height={`30px`}
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={90}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>찾아오는길</InfoText>
            <TextInput
              width={`700px`}
              height={`30px`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={120}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>전화번호</InfoText>
            <TextInput
              width={`700px`}
              height={`30px`}
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={150}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>팩스</InfoText>
            <TextInput
              width={`700px`}
              height={`30px`}
              value={fax}
              onChange={(e) => setFax(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={180}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>담당자 직급</InfoText>
            <TextInput
              width={`700px`}
              height={`30px`}
              value={managerRank}
              onChange={(e) => setManagerRank(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={210}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>담당자 이름</InfoText>
            <TextInput
              width={`700px`}
              height={`30px`}
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={240}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>담당자 연락처</InfoText>
            <TextInput
              width={`700px`}
              height={`30px`}
              value={managerTel}
              onChange={(e) => setManagerTel(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={270}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>담당자 이메일</InfoText>
            <TextInput
              width={`700px`}
              height={`30px`}
              value={managerEmail}
              onChange={(e) => setManagerEmail(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={300}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>담당자 사진</InfoText>
            <TextInput
              width={`590px`}
              height={`30px`}
              value={managerThumbnail}
              readOnly
            />
            <FileInput
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/gif,image/png"
              onChange={fileChangeHandler}
            />
            <CommonButton
              margin={`0 0 0 10px`}
              onClick={() => fileRef.current.click()}
            >
              업로드
            </CommonButton>
          </Wrapper>
        </Fade>
        <Fade left delay={330}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>내용</InfoText>

            <Wrapper width={`700px`}>
              <Editor
                value={description}
                componentHeight="h-400"
                editorChangeHandler={(html) => setDescription(html)}
              />
            </Wrapper>
          </Wrapper>
        </Fade>

        <Fade left delay={240}>
          <Wrapper al={`flex-end`} ju={`flex-end`} margin={`70px 0px 0px 0px`}>
            <CommonButton kindOf={`update`} onClick={infoUpdateHandler}>
              INFO UPDATE
            </CommonButton>
          </Wrapper>
        </Fade>
      </Wrapper>
    </WholeWrapper>
  );
};
