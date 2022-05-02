import React from "react";
import dynamic from "next/dynamic";
import {
  WholeWrapper,
  Wrapper,
  Text,
  Image,
  RsWrapper,
  Product,
  ProductTitle,
  ProductDesc,
  SoldOut,
  SoldOutText,
  SpanText,
  PagenationWrapper,
  PagenationBtn,
  Pagenation,
  UlWrapper,
  LiWrapper,
} from "../../../CommonComponents";
import {
  AiFillPlusCircle,
  AiFillStar,
  AiOutlineStar,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withResizeDetector } from "react-resize-detector";
import Theme from "../../../../Styles/Theme";
import styled from "styled-components";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { FaRegTimesCircle } from "react-icons/fa";
import { areaCalculation2 } from "../../../../commonUtils";
import ImageViewer from "react-images-viewer";
import ThumbnailSlider from "../../../../Components/slider/ThumbnailSlider";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import useWindowSize from "../../../Hooks/useWindowSize";

const Popup = dynamic(import("../../../../Components/popup/Popup.jsx"));
const Map = dynamic(import("../../../../Components/Map.jsx"));

const MM02 = dynamic(import("../../Client/MM02"));

import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";

const SearchInput = styled.input`
  width: calc(100% - 58px);
  height: 100%;
  padding: ${(props) => props.theme.textPadding};
  font-size: 16px;
  background-color: transparent;
  transition: 0.4s;

  &:focus {
    background-color: #fff;
  }

  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const FilterTab = styled(LiWrapper)`
  position: relative;
  margin: 0 20px 0 0;
  height: 100%;
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 1px;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    `
    color: #ecc026;
    text-shadow: 0.2px 0.2px 0px rgba(0, 0, 0, 0.5);

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: ${props.theme.basicTheme_C};
      border-radius: 10px;
    }
  `}
`;

const FilterBox = styled(Wrapper)`
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 1px solid #f5f7f7;

  & .MuiRadio-root {
    padding: 0 4px 0 6px;
  }

  & .MuiCheckbox-root {
    padding: 0 4px 0 6px;
  }

  & .MuiRadio-root.Mui-checked,
  & .MuiCheckbox-root.Mui-checked {
    color: ${(props) => props.theme.basicTheme_C} !important;
  }

  & .MuiSvgIcon-root {
    width: 0.8em;
    height: 0.8em;
  }

  & .MuiTypography-root {
    font-size: 14px;
    color: #212529;
  }

  & .MuiSlider-root {
    color: ${(props) => props.theme.basicTheme_C};
  }

  & .MuiSlider-thumb {
    margin-top: -7px;
    margin-left: -8px;
    width: 16px;
    height: 16px;
    background: #fff;
    border: 1px solid ${(props) => props.theme.basicTheme_C};
  }
`;

const FilterLabel = styled(Wrapper)`
  flex-direction: row;
  margin: 0 0 10px;
  width: auto;
  font-size: 15px;
  color: #212529;
`;

const MM05Presenter = ({
  width,
  //
  cookies,
  //
  currentPage,
  currentList,
  limit,
  pages,
  isInfiniteLoading,
  isLoading,
  setIsLoading,
  isImageLoading,
  imageIndex,
  inputSearch,
  currentImage,
  isViewerOpen,
  images,
  currentId,
  setCurrentId,
  //
  productDatum,
  viewProductDatum,
  //
  _moveLinkHandler,
  infiniteScrollHandler,
  searchProductHandler,
  imageViewerHandler,
  imageViewerPrevHandler,
  imageViewerNextHandler,
  imageViewerGotoHandler,
  imageViewerClickHandler,
  updateProductStarHandler,
  prevAndNextPageChangeHandler,
  changePageHandler,
  closePageHandler,
  shareProductHandler,
}) => {
  const infiniteRef = useInfiniteScroll({
    loading: isInfiniteLoading,
    hasNextPage: productDatum && productDatum.length > limit ? true : false,
    onLoadMore: infiniteScrollHandler,
  });

  const size = useWindowSize();

  return (
    <>
      <WholeWrapper
        isRelative={true}
        padding={size.width < 900 ? `70px 0 0` : `210px 0 0`}
        minHeight={`100vh`}
        index={`999`}
      >
        {/*  <Wrapper bgColor={Theme.basicTheme_C}>
          <RsWrapper margin={`50px 0px`}>
            <SubjectTitle margin={`0px 0px 15px`} color={Theme.white_C}>
              찾으면 다 나온다! 원하는 매물을 검색해보세요
            </SubjectTitle>

            <Wrapper
              width={size.width < 700 ? `350px` : `600px`}
              border={`2px solid ${Theme.basicTheme_C}`}
              height={`60px`}
              shadow={Theme.boxShadowV3}
              bgColor={`rgba(255, 255, 255)`}
              dr={`row`}
              ju={`space-between`}
              radius={`60px`}
              overflow={`hidden`}
            >
              <SearchInput
                placeholder="검색어를 입력해주세요."
                type="text"
                value={inputSearch.value}
                onChange={(e) => inputSearch.setValue(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 && searchProductHandler()}
              />

              <Wrapper
                width={`58px`}
                height={`58px`}
                fontSize={`30px`}
                color={Theme.basicTheme_C}
                onClick={searchProductHandler}
              >
                <AiOutlineSearch />
              </Wrapper>
            </Wrapper>
          </RsWrapper>
        </Wrapper> */}
        <RsWrapper>
          <Wrapper ref={infiniteRef} padding={`80px 0 200px 0`}>
            <RsWrapper dr={`row`} ju={`flex-start`}>
              {productDatum ? (
                productDatum.length === 0 ? (
                  <Wrapper padding={`200px 0`} fontSize={`20px`}>
                    <Wrapper
                      width={`auto`}
                      fontSize={`60px`}
                      margin={`0 0 20px`}
                    >
                      <FaRegTimesCircle />
                    </Wrapper>
                    조회된 매물이 없습니다.
                  </Wrapper>
                ) : (
                  productDatum.map((data) => {
                    return (
                      <Wrapper width={`auto`} key={data._id}>
                        <Product
                          // onClick={(e) =>
                          //   imageViewerHandler(
                          //     e,
                          //     data.detailImagePaths,
                          //     `/product-detail/${data._id}`
                          //   )
                          // }
                          onClick={
                            () => setCurrentId(data._id)
                            // _moveLinkHandler(`/product-detail/${data._id}`)
                          }
                        >
                          <ThumbnailSlider
                            isImageLoading={isImageLoading}
                            imageIndex={imageIndex}
                            datum={data.detailImagePaths.slice(0, 4)}
                          />

                          <Wrapper
                            dr={`row`}
                            height={size.width < 700 ? `auto` : `50px`}
                            padding={size.width < 700 && `5px`}
                            bgColor={`#363636`}
                            color={`#fff`}
                            isAbsolute={true}
                            bottom={`0`}
                            left={`0`}
                          >
                            <Text
                              lineHeight={size.width < 500 ? `1.2` : `1.6`}
                              color={`#fff`}
                              padding={`0px 5px`}
                            >
                              {data.viewAddress}
                            </Text>
                            |
                            <Text
                              lineHeight={size.width < 500 ? `1.2` : `1.6`}
                              color={`#F2C321`}
                              padding={`0px 5px`}
                            >
                              실{areaCalculation2(data.contractArea)}평
                            </Text>
                            |
                            <Text
                              lineHeight={size.width < 500 ? `1.2` : `1.6`}
                              color={`#fff`}
                              padding={`0px 5px`}
                            >
                              {data.isMonthly
                                ? `[월] ${data.monthlyDeposit}${data.monthlyDepositUnit}/${data.monthlyPrice}${data.monthlyPriceUnit}`
                                : data.isDeposit
                                ? `[전] ${data.DepositDeposit}${data.DepositDepositUnit}`
                                : `[매] ${data.tradingPrice}${data.tradingPriceUnit}`}
                            </Text>
                          </Wrapper>

                          <ProductDesc>
                            <AiFillPlusCircle />
                          </ProductDesc>

                          {data.isComplete && (
                            <SoldOut>
                              <SoldOutText>중개완료</SoldOutText>
                            </SoldOut>
                          )}

                          <Wrapper
                            isAbsolute={true}
                            right={`50px`}
                            top={`11px`}
                            width={`auto`}
                            cursor={`pointer`}
                            zIndex={`100`}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {typeof window !== `undefined` && (
                              <CopyToClipboard
                                text={`${window.location.origin}/product-detail/${data._id}`}
                                onCopy={shareProductHandler}
                              >
                                <AiOutlineShareAlt
                                  size={32}
                                  color={`#FAF7F8`}
                                />
                              </CopyToClipboard>
                            )}
                          </Wrapper>

                          {!data.isComplete && (
                            <Wrapper
                              isAbsolute={true}
                              right={`10px`}
                              top={`10px`}
                              width={`auto`}
                              cursor={`pointer`}
                              zIndex={`100`}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateProductStarHandler(data._id, data.star);
                              }}
                            >
                              {cookies.get(`INSTA_STAR_${data._id}`) ? (
                                <AiFillStar
                                  size={34}
                                  color={Theme.basicTheme_C}
                                />
                              ) : (
                                <AiOutlineStar size={34} color={`#FAF7F8`} />
                              )}
                            </Wrapper>
                          )}
                        </Product>
                        <ProductTitle
                          onClick={
                            () => setCurrentId(data._id)
                            // _moveLinkHandler(`/product-detail/${data._id}`)
                          }
                        >
                          ┖ {data.listTitle}&nbsp;
                          <SpanText color={`#999`} mediaFontSize={`14px`}>
                            | {data.listSubTitle}
                          </SpanText>
                        </ProductTitle>
                      </Wrapper>
                    );
                  })
                )
              ) : (
                <Wrapper margin={`30px 0`}>
                  <CircularIndeterminate />
                </Wrapper>
              )}

              {pages && pages.length > 0 && (
                <Wrapper margin={`40px 0 20px`}>
                  <PagenationWrapper width={`auto`}>
                    <PagenationBtn
                      onClick={() =>
                        prevAndNextPageChangeHandler(currentPage - 1)
                      }
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
                      onClick={() =>
                        prevAndNextPageChangeHandler(currentPage + 1)
                      }
                    >
                      <IoIosArrowForward />
                    </PagenationBtn>
                  </PagenationWrapper>
                </Wrapper>
              )}

              {/* {isInfiniteLoading && (
                <Wrapper margin={`100px 0 0`}>
                  <CircularIndeterminate />
                </Wrapper>
              )} */}
            </RsWrapper>
          </Wrapper>
          <Popup />
        </RsWrapper>
        <Map />

        {currentId && (
          <Wrapper
            isFixed={true}
            top={size.width < 900 ? `112px` : `210px`}
            right={`0`}
            width={size.width < 500 ? `100%` : `auto`}
            height={
              size.width < 900 ? `calc(100% - 112px)` : `calc(100% - 210px)`
            }
            ju={`flex-start`}
            al={`flex-end`}
            bgColor={`#fff`}
            isOverflow={true}
          >
            <MM02
              currentId={currentId}
              //
              closePageHandler={closePageHandler}
            />
          </Wrapper>
        )}
      </WholeWrapper>

      <ImageViewer
        backdropCloseable
        isOpen={isViewerOpen}
        imgs={images}
        currImg={currentImage}
        onClickImg={imageViewerClickHandler}
        onClickNext={imageViewerNextHandler}
        onClickPrev={imageViewerPrevHandler}
        onClose={imageViewerHandler}
      />

      <Backdrop open={isLoading} onClick={() => setIsLoading(false)}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default withResizeDetector(MM05Presenter);
