import React from "react";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
  SubjectTitle,
  CommonSubTitle,
  CommonButton,
  EmptyList,
} from "../../../../Components/CommonComponents";
import dynamic from "next/dynamic";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import Theme from "../../../../Styles/Theme";
import { withResizeDetector } from "react-resize-detector";
import useWindowSize from "../../../Hooks/useWindowSize";

const Map = dynamic(import("../../../../Components/Map.jsx"));

const MM81Presenter = ({
  width,
  //
  currentTab,
  setCurrentTab,
  actionFaqView,
  setActionFaqView,
  //
  faqDatum,
  faqTypeDatum,
  //
  onToggleFaqAnswer,
}) => {
  const size = useWindowSize();

  return (
    <WholeWrapper
      ju={`flex-start`}
      minHeight={`90vh`}
      padding={size.width < 900 ? `70px 0 0` : `210px 0 0`}
    >
      <RsWrapper>
        <Wrapper>
          <SubjectTitle margin={`50px 0px 10px 0px`}>
            자주 묻는 질문
          </SubjectTitle>
          <CommonSubTitle margin={`0px 0px 40px`}>FAQ</CommonSubTitle>
        </Wrapper>
        <Wrapper dr={`row`}>
          {faqTypeDatum ? (
            faqTypeDatum.map((type, idx) => {
              return (
                <Wrapper
                  key={type._id}
                  width={`160px`}
                  padding={`12px 0 10px`}
                  margin={`10px 10px 30px`}
                  cursor={`pointer`}
                  shadow={`5px 5px #e8e8e8`}
                  border={`1px solid #f4f4f4`}
                  bgColor={currentTab === idx ? Theme.basicTheme_C : `#fff`}
                  color={currentTab === idx ? Theme.white_C : Theme.subBlack_C}
                  onClick={() => {
                    idx !== currentTab && setActionFaqView(null);
                    setCurrentTab(idx);
                  }}
                >
                  {type.typeName}
                </Wrapper>
              );
            })
          ) : (
            <CircularIndeterminate />
          )}
        </Wrapper>

        {faqDatum ? (
          faqDatum.length === 0 ? (
            <EmptyList>조회된 FAQ가 없습니다.</EmptyList>
          ) : (
            faqDatum.map((faqData, idx) => {
              return (
                <Wrapper
                  margin={`0px 0px 40px 0px`}
                  cursor={`pointer`}
                  key={faqData._id}
                >
                  <Wrapper
                    ju={`flex-end`}
                    al={`flex-end`}
                    dr={`row`}
                    onClick={() => onToggleFaqAnswer(idx, faqData.answer)}
                  >
                    <Wrapper
                      width={`60px`}
                      height={`60px`}
                      radius={`80px`}
                      bgColor={`#363636`}
                      shadow={`0px 5px 10px rgba(220,220,220,1)`}
                      margin={`10px`}
                      fontSize={`25px`}
                      fontWeight={`700`}
                      color={`#F2C321`}
                    >
                      Q
                    </Wrapper>
                    <Wrapper
                      width={`calc(100% - 100px)`}
                      height={`auto`}
                      padding={`20px 20px`}
                      radius={`10px 10px 10px 0px`}
                      bgColor={`#F2C321`}
                      shadow={`0px 5px 10px rgba(220,220,220,1)`}
                      margin={`10px`}
                      al={`flex-start`}
                      isShadowHover={true}
                    >
                      <Text fontSize={`16px`} color={`#fff`}>
                        {faqData.question}
                      </Text>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    display={
                      actionFaqView && actionFaqView[idx] ? `flex` : `none`
                    }
                    ju={`flex-end`}
                    al={`flex-end`}
                    dr={`row`}
                  >
                    <Wrapper
                      width={`calc(100% - 100px)`}
                      height={`auto`}
                      padding={`20px 20px`}
                      radius={`10px 10px 0px 10px`}
                      bgColor={`#fff`}
                      shadow={`0px 5px 10px rgba(220,220,220,1)`}
                      margin={`10px`}
                      al={`flex-end`}
                    >
                      <Text
                        fontSize={`16px`}
                        color={`#363636`}
                        textAlign={`right`}
                        id={`faq-answer-${idx}`}
                        className="ql-editor"
                      ></Text>
                    </Wrapper>

                    <Wrapper
                      width={`60px`}
                      height={`60px`}
                      radius={`80px`}
                      bgColor={`#F2C321`}
                      shadow={`0px 5px 10px rgba(220,220,220,1)`}
                      margin={`10px`}
                      fontSize={`25px`}
                      fontWeight={`700`}
                      color={`#fff`}
                    >
                      A
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              );
            })
          )
        ) : (
          <CircularIndeterminate />
        )}
      </RsWrapper>
      <Map />
    </WholeWrapper>
  );
};

export default withResizeDetector(MM81Presenter);
