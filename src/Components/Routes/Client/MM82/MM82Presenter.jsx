import React from "react";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  SubjectTitle,
  CommonSubTitle,
  EmptyList,
  Image,
  Text,
  PagenationBtn,
  PagenationWrapper,
  Pagenation,
} from "../../../../Components/CommonComponents";
import styled from "styled-components";
import { withResizeDetector } from "react-resize-detector";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { fullWidth } from "../../../../Components/AnimationCommon";
import useWindowSize from "../../../Hooks/useWindowSize";

const Event = styled.div`
  position: relative;
  width: 300px !important;
  height: 250px;
  margin: ${(props) => props.margin || `20px 18px`};
  transition: 0.5s;
  cursor: pointer;

  &:hover img {
    box-shadow: ${(props) => props.theme.boxShadowV2};
  }

  & img {
    width: 300px !important;
    height: 200px;
  }

  &:before {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    border: 1px solid #363636;
    opacity: 0;
  }

  &:hover:before {
    opacity: 1;
    animation: ${fullWidth} 0.8s forwards;
  }

  @media (max-width: 1350px) {
    margin: ${(props) => props.margin || `20px 32px`};
  }

  @media (max-width: 1100px) {
    margin: ${(props) => props.margin || `20px 75px`};
  }

  @media (max-width: 900px) {
    margin: ${(props) => props.margin || `20px 50px`};
  }

  @media (max-width: 800px) {
    margin: ${(props) => props.margin || `20px 15px`};
    width: 200px !important;
    height: 165px;

    & img {
      width: 200px !important;
      height: 165px;
    }
  }

  @media (max-width: 700px) {
    margin: ${(props) => props.margin || `20px 60px`};
  }

  @media (max-width: 660px) {
    margin: ${(props) => props.margin || `20px 25px`};
  }

  @media (max-width: 560px) {
    margin: ${(props) => props.margin || `20px 3px`};
    width: 170px !important;
    height: 180px;

    & img {
      width: 170px !important;
      height: 140px;
    }
  }
`;

const MM82Presenter = ({
  width,
  //
  pages,
  currentPage,
  currentList,
  //
  eventDatum,
  //
  moveLinkHandler,
  prevAndNextPageChangeEventHandler,
  changePageHandler,
}) => {
  const size = useWindowSize();

  return (
    <WholeWrapper
      ju={`flex-start`}
      minHeight={`90vh`}
      padding={size.width < 900 ? `70px 0 40px` : `210px 0 50px`}
    >
      <RsWrapper>
        <Wrapper>
          <SubjectTitle margin={`50px 0px 10px 0px`}>이벤트</SubjectTitle>
          <CommonSubTitle margin={`0px 0px 40px`}>EVENT</CommonSubTitle>
        </Wrapper>

        <Wrapper dr={`row`} ju={`flex-start`}>
          {eventDatum ? (
            eventDatum.length === 0 ? (
              <EmptyList>등록된 이벤트가 없습니다.</EmptyList>
            ) : (
              eventDatum.map((data, idx) => {
                return (
                  <Event
                    key={data._id}
                    width={`calc(100%/4)`}
                    onClick={() => moveLinkHandler(data._id)}
                  >
                    <Wrapper>
                      <Image src={data.thumbnail} />
                    </Wrapper>
                    <Wrapper al={`flex-start`}>
                      <Text>{data.title}</Text>
                      <Text>({data.eventTerm})</Text>
                    </Wrapper>
                  </Event>
                );
              })
            )
          ) : (
            <CircularIndeterminate />
          )}
        </Wrapper>

        {pages && pages.length > 0 && (
          <PagenationWrapper width={`auto`}>
            <PagenationBtn
              onClick={() => prevAndNextPageChangeEventHandler(currentPage - 1)}
            >
              <IoIosArrowBack />
            </PagenationBtn>
            {pages.map((data, idx) => {
              return (
                (currentList + 1) * 5 > idx &&
                currentList * 5 <= idx && (
                  <Pagenation
                    className={data === currentPage ? `active` : ``}
                    key={data}
                    onClick={() => changePageHandler(data)}
                  >
                    {data + 1}
                  </Pagenation>
                )
              );
            })}
            <PagenationBtn
              onClick={() => prevAndNextPageChangeEventHandler(currentPage + 1)}
            >
              <IoIosArrowForward />
            </PagenationBtn>
          </PagenationWrapper>
        )}
      </RsWrapper>
    </WholeWrapper>
  );
};

export default withResizeDetector(MM82Presenter);
