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
import Slide from "@material-ui/core/Slide";

const tabs = ["하단정보 관리"];

const ImgBox = styled(Wrapper)`
  background-image: url(${(props) => props.src});
  background-position: center center;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  //
  cheifName,
  setCheifName,
  businessName,
  setBusinessName,
  businessNumber,
  setBusinessNumber,
  tel,
  setTel,
  email,
  setEmail,
  address,
  setAddress,
  privacyOfficer,
  setPrivacyOfficer,
  officeHours,
  setOfficeHours,
  //
  footerInfoData,
  //
  fileChangeHandler,
  infoUpdateHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="하단정보 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      {/* 
      ✅ --- LOGO IMAGE FILE MANAGEMENT SOURCE ---
      <Fade bottom>
        <Wrapper>
          <ImgBox
            width={`300px`}
            height={`300px`}
            margin={`0px auto`}
            isBorder={true}
            src={footerInfoData && footerInfoData[currentTab].logoPath}
          ></ImgBox>

          <Wrapper
            width={`1344px`}
            al={`center`}
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
                LOGO UPLOAD
              </FileLabel>
            )}
          </Wrapper>
        </Wrapper>
      </Fade> */}

      <Wrapper
        isBorder={true}
        al={`center`}
        ju={`center`}
        padding={`20px`}
        height={`500px`}
        isScroll={true}
      >
        <Fade left delay={0}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>CheifName</InfoText>
            <TextInput
              width={`600px`}
              height={`30px`}
              value={cheifName}
              onChange={(e) => setCheifName(e.target.value)}
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
            <InfoText width={`100px`}>BusinessName</InfoText>
            <TextInput
              width={`600px`}
              height={`30px`}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </Wrapper>
        </Fade>
        <Fade left delay={60}>
          <Wrapper
            dr={`row`}
            margin={`10px 0px 0px 0px`}
            al={`center`}
            ju={`center`}
          >
            <InfoText width={`100px`}>BusinessNumber</InfoText>
            <TextInput
              width={`600px`}
              height={`30px`}
              value={businessNumber}
              onChange={(e) => setBusinessNumber(e.target.value)}
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
            <InfoText width={`100px`}>Tel</InfoText>
            <TextInput
              width={`600px`}
              height={`30px`}
              value={tel}
              onChange={(e) => setTel(e.target.value)}
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
            <InfoText width={`100px`}>Email</InfoText>
            <TextInput
              width={`600px`}
              height={`30px`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <InfoText width={`100px`}>Address</InfoText>
            <TextInput
              width={`600px`}
              height={`30px`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            <InfoText width={`100px`}>PrivacyOfficer</InfoText>
            <TextInput
              width={`600px`}
              height={`30px`}
              value={privacyOfficer}
              onChange={(e) => setPrivacyOfficer(e.target.value)}
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
            <InfoText width={`100px`}>OfficeHours</InfoText>
            <TextInput
              width={`600px`}
              height={`30px`}
              value={officeHours}
              onChange={(e) => setOfficeHours(e.target.value)}
            />
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
