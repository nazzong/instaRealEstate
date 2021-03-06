import React, { useEffect, useState } from "react";
import {
  CommonSubTitle,
  SubjectTitle,
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
  LiWrapper,
  UlWrapper,
  PagenationWrapper,
  PagenationBtn,
  Pagenation,
  EmptyList,
} from "../../../CommonComponents";
import dynamic from "next/dynamic";
import { withResizeDetector } from "react-resize-detector";
import Theme from "../../../../Styles/Theme";
import styled from "styled-components";
import ImageViewer from "react-images-viewer";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BiRefresh } from "react-icons/bi";
import { IoMdRefresh } from "react-icons/io";
import { areaCalculation2 } from "../../../../commonUtils";
import {
  AiFillPlusCircle,
  AiFillStar,
  AiOutlineStar,
  AiOutlineShareAlt,
  AiOutlineClose,
  AiFillFilter,
} from "react-icons/ai";
import { MdMoodBad } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ThumbnailSlider = dynamic(import("../../../slider/ThumbnailSlider.jsx"));

const Fade = dynamic(import("react-reveal/Fade"));

const Popup = dynamic(import("../../../popup/Popup.jsx"));
const Map = dynamic(import("../../../Map.jsx"));
const MM02 = dynamic(import("../../Client/MM02"));
const MainProduct = dynamic(import("../../../MainProduct"));

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

  & .MuiSlider-valueLabel {
    top: -36px;
    left: calc(-50% - 9px);
  }

  & .MuiSlider-valueLabel > span {
    width: 45px;
    height: 45px;
  }
`;

const FilterLabel = styled(Wrapper)`
  flex-direction: row !important;
  margin: 0 0 10px !important;
  width: auto !important;
  font-size: 15px !important;
  color: #212529 !important;
`;

const MM00Presenter = ({
  width,
  //
  cookies,
  //
  currentList,
  currentPage,
  pages,
  limit,
  isLoading,
  isImageLoading,
  isImageChange,
  setIsLoading,
  imageIndex,
  currentImage,
  isViewerOpen,
  images,
  slidesToShow,
  currentId,
  setCurrentId,
  moreCategory,
  moreLoading,
  isFilter,
  isFilterOpen,
  setIsFilterOpen,
  currentFilterTab,
  contractAreaMode,
  setContractAreaMode,
  inputType,
  inputMonthText,
  inputMonthStart,
  inputMonthEnd,
  inputMonthLimit,
  inputDepositText,
  inputDepositStart,
  inputDepositEnd,
  inputDepositLimit,
  inputTradingText,
  inputTradingStart,
  inputTradingEnd,
  inputTradingLimit,
  inputRightFeeText,
  inputRightFeeStart,
  inputRightFeeEnd,
  inputRightFeeLimit,
  inputIsRightFee,
  inputContractAreaText,
  inputContractAreaStart,
  inputContractAreaEnd,
  inputContractAreaLimit,
  inputFloor,
  inputIsParking,
  inputIsElevator,
  inputRestroom1,
  inputRestroom2,
  inputIsCeiling,
  inputBuildingUse,
  inputProductType,
  //
  bestProductDatum,
  productDatum00,
  productDatum01,
  productDatum02,
  productDatum03,
  productDatum04,
  productDatum05,
  productDatum06,
  //
  _moveLinkHandler,
  imageViewerHandler,
  imageViewerPrevHandler,
  imageViewerNextHandler,
  imageViewerGotoHandler,
  imageViewerClickHandler,
  updateProductStarHandler,
  closePageHandler,
  shareProductHandler,
  changeFilterTabHandler,
  changeValueHandler,
  changeSliderHandler,
  startFilterHandler,
  resetFilterHandler,
  prevAndNextPageChangeHandler,
  changePageHandler,
  moreCategoryHandler,
}) => {
  return (
    <>
      <WholeWrapper
        isRelative={true}
        al={`flex-start`}
        padding={width < 900 ? `120px 0 0 0` : `210px 0 0 0`}
        margin={width < 900 ? `0` : `0 0 0 360px`}
        width={width < 900 ? `100%` : `calc(100% - 360px)`}
        minWidth={width < 900 ? `100%` : `calc(100% - 360px)`}
        index={`999`}
      >
        <Wrapper
          al={`flex-start`}
          width={width < 900 ? `100%` : `calc(100% - 160px)`}
        >
          {/* {bestProductDatum && bestProductDatum.length > 0 && (
            <Wrapper>
              <SubjectTitle margin={`100px 0px 10px 0px`}>
              ?????? ?????? ?????? ????????? ???????????????!
              </SubjectTitle>
              <CommonSubTitle margin={`10px 0 0`}>????????????</CommonSubTitle>
            </Wrapper>
          )} */}

          {/* <Wrapper al={`flex-start`} margin={`0px 0px 50px`}>
            <PopularSlider
              width={width}
              //
              cookies={cookies}
              //
              slidesToShow={slidesToShow}
              //
              datum={bestProductDatum}
              //
              _moveLinkHandler={_moveLinkHandler}
              imageViewerHandler={imageViewerHandler}
              updateProductStarHandler={updateProductStarHandler}
            />
          </Wrapper> */}

          <Wrapper
            margin={width < 900 ? `0` : `0px 0px 0px 130px`}
            padding={`0 0 100px 0`}
            width={currentId ? `calc(100% - 20vw)` : `100%`}
          >
            {isFilter ? (
              <>
                <Wrapper
                  dr={`row`}
                  ju={width < 900 ? `center` : `flex-start`}
                  overflow={`hidden`}
                >
                  {productDatum00 ? (
                    productDatum00.length === 0 ? (
                      <Wrapper
                        height={`500px`}
                        margin={`20px 0`}
                        width={`92%`}
                        border={`1px solid #f2f2f2`}
                        fontSize={`24px`}
                        fontWeight={`700`}
                        color={`#333333`}
                        shadow={`2px 2px 10px #eee`}
                      >
                        <Wrapper width={`auto`} margin={`20px 0`}>
                          <MdMoodBad size={120} />
                        </Wrapper>
                        ????????? ????????? ????????????.
                      </Wrapper>
                    ) : (
                      productDatum00.map((data, idx) => {
                        return (
                          <Wrapper width={`auto`} key={idx}>
                            <Product onClick={() => setCurrentId(data._id)}>
                              <ThumbnailSlider
                                imageIndex={imageIndex}
                                isImageLoading={isImageLoading}
                                isImageChange={isImageChange}
                                datum={data.detailImagePaths.slice(0, 4)}
                              />

                              <Wrapper
                                dr={`row`}
                                height={width < 700 ? `auto` : `50px`}
                                padding={width < 700 ? `5px` : `0`}
                                bgColor={`#363636`}
                                color={`#fff`}
                                isAbsolute={true}
                                bottom={`0`}
                                left={`0`}
                              >
                                <Text
                                  lineHeight={width < 900 ? `1.2` : `1.6`}
                                  color={`#fff`}
                                  padding={`0px 5px`}
                                >
                                  {data.viewAddress}
                                </Text>
                                |
                                <Text
                                  lineHeight={width < 900 ? `1.2` : `1.6`}
                                  color={`#F2C321`}
                                  padding={`0px 5px`}
                                >
                                  ???{areaCalculation2(data.contractArea)}???
                                </Text>
                                |
                                <Text
                                  lineHeight={width < 900 ? `1.2` : `1.6`}
                                  color={`#fff`}
                                  padding={`0px 5px`}
                                >
                                  {data.isMonthly
                                    ? `[???] ${data.monthlyDeposit}${data.monthlyDepositUnit}/${data.monthlyPrice}${data.monthlyPriceUnit}`
                                    : data.isJeonse
                                    ? `[???] ${data.jeonseDeposit}${data.jeonseDepositUnit}`
                                    : `[???] ${data.tradingPrice}${data.tradingPriceUnit}`}
                                </Text>
                              </Wrapper>

                              <ProductDesc>
                                <AiFillPlusCircle />
                              </ProductDesc>

                              {data.isComplete && (
                                <SoldOut>
                                  <SoldOutText>????????????</SoldOutText>
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
                                    updateProductStarHandler(
                                      data._id,
                                      data.star
                                    );
                                  }}
                                >
                                  {cookies.get(`INSTA_STAR_${data._id}`) ? (
                                    <AiFillStar
                                      size={34}
                                      color={Theme.basicTheme_C}
                                    />
                                  ) : (
                                    <AiOutlineStar
                                      size={34}
                                      color={`#FAF7F8`}
                                    />
                                  )}
                                </Wrapper>
                              )}
                            </Product>
                            <ProductTitle
                              onClick={() => setCurrentId(data._id)}
                            >
                              ??? {data.listTitle}&nbsp;
                              <SpanText color={`#999`} mediaFontSize={`14px`}>
                                | {data.listSubTitle}
                              </SpanText>
                            </ProductTitle>
                          </Wrapper>
                        );
                      })
                    )
                  ) : (
                    <Wrapper height={`500px`}></Wrapper>
                  )}
                </Wrapper>

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
              </>
            ) : (
              <>
                {productDatum01 && productDatum01.length > 0 && (
                  <MainProduct
                    cookies={cookies}
                    width={width}
                    isImageLoading={isImageLoading}
                    isImageChange={isImageChange}
                    moreCategory={moreCategory}
                    moreLoading={moreLoading}
                    title={`?????????`}
                    datum={productDatum01}
                    imageIndex={imageIndex}
                    setCurrentId={setCurrentId}
                    updateProductStarHandler={updateProductStarHandler}
                    shareProductHandler={shareProductHandler}
                    moreCategoryHandler={moreCategoryHandler}
                  />
                )}

                {productDatum02 && productDatum02.length > 0 && (
                  <MainProduct
                    cookies={cookies}
                    width={width}
                    isImageLoading={isImageLoading}
                    moreCategory={moreCategory}
                    moreLoading={moreLoading}
                    title={`??????`}
                    datum={productDatum02}
                    imageIndex={imageIndex}
                    setCurrentId={setCurrentId}
                    updateProductStarHandler={updateProductStarHandler}
                    shareProductHandler={shareProductHandler}
                    moreCategoryHandler={moreCategoryHandler}
                  />
                )}

                {productDatum03 && productDatum03.length > 0 && (
                  <MainProduct
                    cookies={cookies}
                    width={width}
                    isImageLoading={isImageLoading}
                    isImageChange={isImageChange}
                    moreCategory={moreCategory}
                    moreLoading={moreLoading}
                    title={`??????`}
                    datum={productDatum03}
                    imageIndex={imageIndex}
                    setCurrentId={setCurrentId}
                    updateProductStarHandler={updateProductStarHandler}
                    shareProductHandler={shareProductHandler}
                    moreCategoryHandler={moreCategoryHandler}
                  />
                )}

                {productDatum04 && productDatum04.length > 0 && (
                  <MainProduct
                    cookies={cookies}
                    width={width}
                    isImageLoading={isImageLoading}
                    isImageChange={isImageChange}
                    moreCategory={moreCategory}
                    moreLoading={moreLoading}
                    title={`??????`}
                    datum={productDatum04}
                    imageIndex={imageIndex}
                    setCurrentId={setCurrentId}
                    updateProductStarHandler={updateProductStarHandler}
                    shareProductHandler={shareProductHandler}
                    moreCategoryHandler={moreCategoryHandler}
                  />
                )}
              </>
            )}
          </Wrapper>
          <Popup />
        </Wrapper>
        <Map />

        {currentId && (
          <Wrapper
            isFixed={true}
            top={width < 900 ? `112px` : `210px`}
            right={`0`}
            width={width < 500 ? `100%` : `auto`}
            height={width < 900 ? `calc(100% - 112px)` : `calc(100% - 210px)`}
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

        {isFilterOpen && (
          <Wrapper
            isFixed={true}
            // top={width < 900 ? `calc(112px + 40px)` : `calc(210px + 40px)`}
            top={width < 900 ? `calc(112px + 5px)` : `calc(210px + 15px)`}
            left={`10px`}
            width={width < 500 ? `calc(100% - 20px)` : `360px`}
            height={
              width < 900
                ? `calc(100% - 112px - 10px)`
                : `calc(100% - 210px - 30px)`
            }
            // height={
            //   width < 900
            //     ? `calc(100vh - 112px - 50px)`
            //     : `calc(100vh - 210px - 100px)`
            // }
            padding={`0 0 40px`}
            ju={`flex-start`}
            al={`flex-start`}
            wrap={`nowrap`}
            bgColor={`#fff`}
            isOverflow={true}
            border={`1px solid #ededed`}
            radius={`10px`}
            shadow={`1px 1px 5px #d2d2d2`}
          >
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`0 15px`}
              height={`50px`}
            >
              <Wrapper dr={`row`} width={`auto`}>
                <Wrapper
                  dr={`row`}
                  width={`auto`}
                  height={`35px`}
                  lineHeight={`37px`}
                  margin={`0 10px 0 0`}
                  padding={`0 12px`}
                  fontSize={`16px !important`}
                  fontWeight={`700`}
                  color={`#fff`}
                  bgColor={`#201e1e`}
                  radius={`5px`}
                  textShadow={`1px 1px 1px rgba(0, 0, 0, 0.4)`}
                  cursor={`pointer`}
                  onClick={startFilterHandler}
                >
                  <Wrapper margin={`0 4px 0 0`} width={`auto`}>
                    <AiFillFilter size={18} color={`#f6ce47`} />
                  </Wrapper>
                  ?????? ??????
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  width={`auto`}
                  height={`35px`}
                  lineHeight={`37px`}
                  padding={`0 12px`}
                  fontSize={`16px !important`}
                  fontWeight={`700`}
                  color={`#fff`}
                  bgColor={`#201e1e`}
                  radius={`5px`}
                  textShadow={`1px 1px 1px rgba(0, 0, 0, 0.4)`}
                  cursor={`pointer`}
                  onClick={resetFilterHandler}
                >
                  <Wrapper margin={`0 4px 0 0`} width={`auto`}>
                    <IoMdRefresh size={20} color={`#f6ce47`} />
                  </Wrapper>
                  ?????? ?????????
                </Wrapper>
              </Wrapper>

              {width < 900 && (
                <Wrapper
                  width={`auto`}
                  fontSize={`14px`}
                  color={`#201e1e`}
                  cursor={`pointer`}
                  onClick={() => setIsFilterOpen(false)}
                >
                  <AiOutlineClose size={22} />
                </Wrapper>
              )}
            </Wrapper>

            <Wrapper height={`50px`} borderBottom={`1px solid #f5f7f7`}>
              <UlWrapper
                dr={`row`}
                ju={`flex-start`}
                padding={`0 20px`}
                height={`100%`}
              >
                <FilterTab
                  isActive={currentFilterTab === 0}
                  onClick={() => changeFilterTabHandler(0)}
                >
                  ?????????
                </FilterTab>
                <FilterTab
                  isActive={currentFilterTab === 1}
                  onClick={() => changeFilterTabHandler(1)}
                >
                  ??????
                </FilterTab>
                <FilterTab
                  isActive={currentFilterTab === 2}
                  onClick={() => changeFilterTabHandler(2)}
                >
                  ??????
                </FilterTab>
                <FilterTab
                  isActive={currentFilterTab === 3}
                  onClick={() => changeFilterTabHandler(3)}
                >
                  ????????????
                </FilterTab>
              </UlWrapper>
            </Wrapper>

            <Wrapper
              ju={`flex-start`}
              padding={`5px 30px 5px 25px`}
              height={`calc(100% - 100px)`}
              isOverflow={true}
              wrap={`nowrap`}
            >
              {(currentFilterTab === 0 ||
                currentFilterTab === 1 ||
                currentFilterTab === 3) && (
                <FilterBox>
                  <FilterLabel>????????????</FilterLabel>

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    {...inputType}
                    onChange={(e) =>
                      changeValueHandler(inputType, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value="??????"
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value="??????"
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value="??????"
                      control={<Radio />}
                      label="??????"
                    />
                  </RadioGroup>
                </FilterBox>
              )}

              {(currentFilterTab === 2 || currentFilterTab === 3) && (
                <FilterBox>
                  <FilterLabel>????????????</FilterLabel>

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    {...inputProductType}
                    onChange={(e) =>
                      changeValueHandler(inputProductType, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value="??????"
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value="??????"
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value="?????????"
                      control={<Radio />}
                      label="?????????"
                    />

                    <FormControlLabel
                      value="??????+"
                      control={<Radio />}
                      label="??????+"
                    />

                    {currentFilterTab === 3 && (
                      <FormControlLabel
                        value="??????"
                        control={<Radio />}
                        label="??????"
                      />
                    )}

                    {currentFilterTab === 3 && (
                      <FormControlLabel
                        value="?????????"
                        control={<Radio />}
                        label="?????????"
                      />
                    )}
                  </RadioGroup>
                </FilterBox>
              )}

              {(currentFilterTab === 0 ||
                currentFilterTab === 1 ||
                currentFilterTab === 2 ||
                currentFilterTab === 3) &&
                (inputType.value === "" || inputType.value === "??????") && (
                  <FilterBox>
                    <FilterLabel>??? ?????????</FilterLabel>

                    <Wrapper al={`flex-end`}>
                      <Wrapper
                        isRelative={true}
                        left={`8px`}
                        width={`auto`}
                        fontSize={`15px`}
                        fontWeight={`700`}
                        color={Theme.basicTheme_C}
                      >
                        {inputMonthText.value}
                      </Wrapper>

                      <Wrapper dr={`row`}>
                        <Wrapper width={`calc(100% - 50px)`}>
                          <Range
                            allowCross={false}
                            value={[inputMonthStart.value, inputMonthEnd.value]}
                            valueLabelDisplay="auto"
                            max={1000}
                            step={50}
                            marks={{
                              0: "??????",
                              200: "200???",
                              400: "400???",
                              600: "600???",
                              800: "800???",
                              1000: (
                                <SpanText
                                  display={`block`}
                                  width={`40px`}
                                  fontSize={`inherit !important`}
                                >
                                  1000???
                                </SpanText>
                              ),
                            }}
                            handleStyle={[
                              { borderColor: Theme.basicTheme_C },
                              { borderColor: Theme.basicTheme_C },
                            ]}
                            trackStyle={[
                              { backgroundColor: Theme.basicTheme_C },
                            ]}
                            activeDotStyle={{ borderColor: Theme.basicTheme_C }}
                            onChange={(newValue) => {
                              changeSliderHandler(
                                "????????????",
                                inputMonthText,
                                inputMonthStart,
                                inputMonthEnd,
                                inputMonthLimit.value,
                                inputMonthLimit.setValue,
                                newValue,
                                1000
                              );
                            }}
                          />
                        </Wrapper>

                        <Wrapper
                          al={`flex-end`}
                          isRelative={true}
                          left={`15px`}
                          top={`10px`}
                          width={`50px`}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={inputMonthLimit.value}
                                onChange={async () => {
                                  const inputLimit = inputMonthLimit.value;

                                  if (!inputLimit) {
                                    changeValueHandler(inputMonthEnd, 1000);
                                  }

                                  changeValueHandler(
                                    inputMonthLimit,
                                    !inputLimit
                                  );
                                  changeSliderHandler(
                                    "????????????",
                                    inputMonthText,
                                    inputMonthStart,
                                    inputMonthEnd,
                                    !inputLimit,
                                    inputMonthLimit.setValue,
                                    [
                                      inputMonthStart.value,
                                      !inputLimit ? 1000 : inputMonthEnd.value,
                                    ],
                                    1000
                                  );
                                }}
                              />
                            }
                            label="??????"
                            labelPlacement="bottom"
                          />
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </FilterBox>
                )}

              {(currentFilterTab === 0 ||
                currentFilterTab === 1 ||
                currentFilterTab === 2 ||
                currentFilterTab === 3) &&
                (inputType.value === "" ||
                  inputType.value === "??????" ||
                  inputType.value === "??????") && (
                  <FilterBox>
                    <FilterLabel>?????????</FilterLabel>

                    <Wrapper al={`flex-end`}>
                      <Wrapper
                        isRelative={true}
                        left={`8px`}
                        width={`auto`}
                        fontSize={`15px`}
                        fontWeight={`700`}
                        color={Theme.basicTheme_C}
                      >
                        {inputDepositText.value}
                      </Wrapper>

                      <Wrapper dr={`row`}>
                        <Wrapper width={`calc(100% - 50px)`}>
                          <Range
                            allowCross={false}
                            value={[
                              inputDepositStart.value,
                              inputDepositEnd.value,
                            ]}
                            valueLabelDisplay="auto"
                            max={20000}
                            step={
                              inputDepositStart.value < 20000 &&
                              inputDepositEnd.value < 20000
                                ? 1000
                                : inputDepositStart.value >= 20000 &&
                                  inputDepositEnd.value >= 20000
                                ? 10000
                                : 1000
                            }
                            marks={{
                              0: "??????",
                              10000: "1???",
                              20000: (
                                <SpanText
                                  display={`block`}
                                  width={`35px`}
                                  fontSize={`inherit !important`}
                                >
                                  2???
                                </SpanText>
                              ),
                            }}
                            handleStyle={[
                              { borderColor: Theme.basicTheme_C },
                              { borderColor: Theme.basicTheme_C },
                            ]}
                            trackStyle={[
                              { backgroundColor: Theme.basicTheme_C },
                            ]}
                            activeDotStyle={{ borderColor: Theme.basicTheme_C }}
                            onChange={(newValue) => {
                              changeSliderHandler(
                                "?????????",
                                inputDepositText,
                                inputDepositStart,
                                inputDepositEnd,
                                inputDepositLimit.value,
                                inputDepositLimit.setValue,
                                newValue,
                                20000
                              );
                            }}
                          />
                        </Wrapper>

                        <Wrapper
                          al={`flex-end`}
                          isRelative={true}
                          left={`15px`}
                          top={`10px`}
                          width={`50px`}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={inputDepositLimit.value}
                                onChange={() => {
                                  const inputLimit = inputDepositLimit.value;

                                  if (!inputLimit) {
                                    changeValueHandler(inputDepositEnd, 20000);
                                  }

                                  changeValueHandler(
                                    inputDepositLimit,
                                    !inputLimit
                                  );
                                  changeSliderHandler(
                                    "?????????",
                                    inputDepositText,
                                    inputDepositStart,
                                    inputDepositEnd,
                                    !inputLimit,
                                    inputDepositLimit.setValue,
                                    [
                                      inputDepositStart.value,
                                      !inputLimit
                                        ? 20000
                                        : inputDepositEnd.value,
                                    ],
                                    20000
                                  );
                                }}
                              />
                            }
                            label="??????"
                            labelPlacement="bottom"
                          />
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </FilterBox>
                )}

              {(currentFilterTab === 0 ||
                currentFilterTab === 1 ||
                currentFilterTab === 2 ||
                currentFilterTab === 3) &&
                (inputType.value === "" || inputType.value === "??????") && (
                  <FilterBox>
                    <FilterLabel>?????????</FilterLabel>

                    <Wrapper al={`flex-end`}>
                      <Wrapper
                        isRelative={true}
                        left={`8px`}
                        width={`auto`}
                        fontSize={`15px`}
                        fontWeight={`700`}
                        color={Theme.basicTheme_C}
                      >
                        {inputTradingText.value}
                      </Wrapper>

                      <Wrapper dr={`row`}>
                        <Wrapper width={`calc(100% - 50px)`}>
                          <Range
                            allowCross={false}
                            value={[
                              inputTradingStart.value,
                              inputTradingEnd.value,
                            ]}
                            valueLabelDisplay="auto"
                            max={300000}
                            step={10000}
                            marks={{
                              0: "??????",
                              100000: "10???",
                              200000: "20???",
                              300000: (
                                <SpanText
                                  display={`block`}
                                  width={`35px`}
                                  fontSize={`inherit !important`}
                                >
                                  30???
                                </SpanText>
                              ),
                            }}
                            handleStyle={[
                              { borderColor: Theme.basicTheme_C },
                              { borderColor: Theme.basicTheme_C },
                            ]}
                            trackStyle={[
                              { backgroundColor: Theme.basicTheme_C },
                            ]}
                            activeDotStyle={{ borderColor: Theme.basicTheme_C }}
                            onChange={(newValue) => {
                              changeSliderHandler(
                                "?????????",
                                inputTradingText,
                                inputTradingStart,
                                inputTradingEnd,
                                inputTradingLimit.value,
                                inputTradingLimit.setValue,
                                newValue,
                                300000
                              );
                            }}
                          />
                        </Wrapper>

                        <Wrapper
                          al={`flex-end`}
                          isRelative={true}
                          left={`15px`}
                          top={`10px`}
                          width={`50px`}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={inputTradingLimit.value}
                                onChange={() => {
                                  const inputLimit = inputTradingLimit.value;

                                  if (!inputLimit) {
                                    changeValueHandler(inputTradingEnd, 300000);
                                  }

                                  changeValueHandler(
                                    inputTradingLimit,
                                    !inputLimit
                                  );
                                  changeSliderHandler(
                                    "?????????",
                                    inputTradingText,
                                    inputTradingStart,
                                    inputTradingEnd,
                                    !inputLimit,
                                    inputTradingLimit.setValue,
                                    [
                                      inputTradingStart.value,
                                      !inputLimit
                                        ? 300000
                                        : inputTradingEnd.value,
                                    ],
                                    300000
                                  );
                                }}
                              />
                            }
                            label="??????"
                            labelPlacement="bottom"
                          />
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </FilterBox>
                )}

              {(currentFilterTab === 1 || currentFilterTab === 3) && (
                <FilterBox>
                  <FilterLabel>?????????</FilterLabel>

                  <Wrapper al={`flex-end`}>
                    <Wrapper
                      isRelative={true}
                      left={`8px`}
                      width={`auto`}
                      fontSize={`15px`}
                      fontWeight={`700`}
                      color={Theme.basicTheme_C}
                    >
                      {inputRightFeeText.value}
                    </Wrapper>

                    <Wrapper dr={`row`}>
                      <Wrapper width={`calc(100% - 50px)`}>
                        <Range
                          allowCross={false}
                          value={[
                            inputRightFeeStart.value,
                            inputRightFeeEnd.value,
                          ]}
                          valueLabelDisplay="auto"
                          max={20000}
                          step={1000}
                          marks={{
                            0: "??????",
                            10000: "1???",
                            20000: (
                              <SpanText
                                display={`block`}
                                width={`35px`}
                                fontSize={`inherit !important`}
                              >
                                2???
                              </SpanText>
                            ),
                          }}
                          handleStyle={[
                            { borderColor: Theme.basicTheme_C },
                            { borderColor: Theme.basicTheme_C },
                          ]}
                          trackStyle={[{ backgroundColor: Theme.basicTheme_C }]}
                          activeDotStyle={{ borderColor: Theme.basicTheme_C }}
                          onChange={(newValue) => {
                            changeSliderHandler(
                              "?????????",
                              inputRightFeeText,
                              inputRightFeeStart,
                              inputRightFeeEnd,
                              inputRightFeeLimit.value,
                              inputRightFeeLimit.setValue,
                              newValue,
                              20000
                            );
                          }}
                        />
                      </Wrapper>

                      <Wrapper
                        al={`flex-end`}
                        isRelative={true}
                        left={`15px`}
                        top={`10px`}
                        width={`50px`}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={inputRightFeeLimit.value}
                              onChange={() => {
                                const inputLimit = inputRightFeeLimit.value;

                                if (!inputLimit) {
                                  changeValueHandler(inputRightFeeEnd, 20000);
                                }

                                changeValueHandler(
                                  inputRightFeeLimit,
                                  !inputLimit
                                );
                                changeSliderHandler(
                                  "?????????",
                                  inputRightFeeText,
                                  inputRightFeeStart,
                                  inputRightFeeEnd,
                                  !inputLimit,
                                  inputRightFeeLimit.setValue,
                                  [
                                    inputRightFeeStart.value,
                                    !inputLimit
                                      ? 20000
                                      : inputRightFeeEnd.value,
                                  ],
                                  20000
                                );
                              }}
                            />
                          }
                          label="??????"
                          labelPlacement="bottom"
                        />
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper al={`flex-start`} margin={`5px 0 0`}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={inputIsRightFee.value}
                          onChange={() =>
                            changeValueHandler(
                              inputIsRightFee,
                              !inputIsRightFee.value
                            )
                          }
                        />
                      }
                      label="????????? ?????? ?????????"
                      labelPlacement="end"
                    />
                  </Wrapper>
                </FilterBox>
              )}

              {(currentFilterTab === 0 ||
                currentFilterTab === 1 ||
                currentFilterTab === 2 ||
                currentFilterTab === 3) && (
                <FilterBox>
                  <FilterLabel>
                    ????????????
                    <Wrapper
                      dr={`row`}
                      margin={`0 0 0 6px`}
                      padding={`3px 4px 1px 2px`}
                      width={`auto`}
                      fontSize={`12px`}
                      border={`1px solid #dedede`}
                      radius={`4px`}
                      cursor={`pointer`}
                      onClick={() =>
                        setContractAreaMode(contractAreaMode === 1 ? 2 : 1)
                      }
                    >
                      <BiRefresh size={14} />
                      ??????
                    </Wrapper>
                  </FilterLabel>

                  <Wrapper al={`flex-end`}>
                    <Wrapper
                      isRelative={true}
                      left={`8px`}
                      width={`auto`}
                      fontSize={`15px`}
                      fontWeight={`700`}
                      color={Theme.basicTheme_C}
                    >
                      {inputContractAreaText.value}
                    </Wrapper>

                    <Wrapper dr={`row`}>
                      <Wrapper width={`calc(100% - 50px)`}>
                        <Range
                          allowCross={false}
                          value={[
                            inputContractAreaStart.value,
                            inputContractAreaEnd.value,
                          ]}
                          valueLabelDisplay="auto"
                          max={150}
                          step={10}
                          marks={
                            contractAreaMode === 1
                              ? {
                                  0: "??????",
                                  30: "99???",
                                  60: "198???",
                                  90: "298???",
                                  120: "397???",
                                  150: (
                                    <SpanText
                                      display={`block`}
                                      width={`35px`}
                                      fontSize={`inherit !important`}
                                    >
                                      496???
                                    </SpanText>
                                  ),
                                }
                              : contractAreaMode === 2
                              ? {
                                  0: "??????",
                                  30: "30???",
                                  60: "60???",
                                  90: "90???",
                                  120: "120???",
                                  150: (
                                    <SpanText
                                      display={`block`}
                                      width={`35px`}
                                      fontSize={`inherit !important`}
                                    >
                                      150???
                                    </SpanText>
                                  ),
                                }
                              : {}
                          }
                          handleStyle={[
                            { borderColor: Theme.basicTheme_C },
                            { borderColor: Theme.basicTheme_C },
                          ]}
                          trackStyle={[{ backgroundColor: Theme.basicTheme_C }]}
                          activeDotStyle={{ borderColor: Theme.basicTheme_C }}
                          onChange={(newValue) => {
                            changeSliderHandler(
                              "????????????",
                              inputContractAreaText,
                              inputContractAreaStart,
                              inputContractAreaEnd,
                              inputContractAreaLimit.value,
                              inputContractAreaLimit.setValue,
                              newValue,
                              150
                            );
                          }}
                        />
                      </Wrapper>

                      <Wrapper
                        al={`flex-end`}
                        isRelative={true}
                        left={`15px`}
                        top={`10px`}
                        width={`50px`}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={inputContractAreaLimit.value}
                              onChange={() => {
                                const inputLimit = inputContractAreaLimit.value;

                                if (!inputLimit) {
                                  changeValueHandler(inputContractAreaEnd, 150);
                                }

                                changeValueHandler(
                                  inputContractAreaLimit,
                                  !inputLimit
                                );
                                changeSliderHandler(
                                  "????????????",
                                  inputContractAreaText,
                                  inputContractAreaStart,
                                  inputContractAreaEnd,
                                  !inputLimit,
                                  inputContractAreaLimit.setValue,
                                  [
                                    inputContractAreaStart.value,
                                    !inputLimit
                                      ? 150
                                      : inputContractAreaEnd.value,
                                  ],
                                  150
                                );
                              }}
                            />
                          }
                          label="??????"
                          labelPlacement="bottom"
                        />
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </FilterBox>
              )}

              {(currentFilterTab === 0 ||
                currentFilterTab === 1 ||
                currentFilterTab === 3) && (
                <FilterBox>
                  <FilterLabel>??????</FilterLabel>

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    {...inputFloor}
                    onChange={(e) =>
                      changeValueHandler(inputFloor, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value="1???"
                      control={<Radio />}
                      label="1??????"
                    />

                    <FormControlLabel
                      value="2???"
                      control={<Radio />}
                      label="2??????"
                    />

                    <FormControlLabel
                      value="?????????"
                      control={<Radio />}
                      label="?????????"
                    />
                  </RadioGroup>

                  {(currentFilterTab === 0 || currentFilterTab === 3) && (
                    <Wrapper al={`flex-start`} margin={`10px 0 0`}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={inputIsCeiling.value}
                            onChange={() =>
                              changeValueHandler(
                                inputIsCeiling,
                                !inputIsCeiling.value
                              )
                            }
                          />
                        }
                        label="???????????? ?????? ?????????"
                        labelPlacement="end"
                      />
                    </Wrapper>
                  )}
                </FilterBox>
              )}

              {(currentFilterTab === 0 || currentFilterTab === 3) && (
                <FilterBox>
                  <FilterLabel>?????? ??????</FilterLabel>

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    {...inputBuildingUse}
                    onChange={(e) =>
                      changeValueHandler(inputBuildingUse, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value={""}
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value={"?????????"}
                      control={<Radio />}
                      label="?????????"
                    />

                    <FormControlLabel
                      value={"?????????"}
                      control={<Radio />}
                      label="?????????"
                    />

                    <FormControlLabel
                      value={"?????????"}
                      control={<Radio />}
                      label="?????????"
                    />
                  </RadioGroup>
                </FilterBox>
              )}

              {(currentFilterTab === 0 ||
                currentFilterTab === 1 ||
                currentFilterTab === 2 ||
                currentFilterTab === 3) && (
                <FilterBox>
                  <FilterLabel>???????????? ??????</FilterLabel>

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    {...inputIsParking}
                    onChange={(e) =>
                      changeValueHandler(inputIsParking, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value={""}
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value={"true"}
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value={"false"}
                      control={<Radio />}
                      label="?????????"
                    />
                  </RadioGroup>
                </FilterBox>
              )}

              {(currentFilterTab === 0 ||
                currentFilterTab === 1 ||
                currentFilterTab === 2 ||
                currentFilterTab === 3) && (
                <FilterBox>
                  <FilterLabel>??????????????? ???????????? ??????</FilterLabel>

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    {...inputIsElevator}
                    onChange={(e) =>
                      changeValueHandler(inputIsElevator, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value={""}
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value={"true"}
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value={"false"}
                      control={<Radio />}
                      label="?????????"
                    />
                  </RadioGroup>
                </FilterBox>
              )}

              {(currentFilterTab === 0 ||
                currentFilterTab === 1 ||
                currentFilterTab === 2 ||
                currentFilterTab === 3) && (
                <FilterBox>
                  <FilterLabel>????????? ????????????</FilterLabel>

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    {...inputRestroom1}
                    onChange={(e) =>
                      changeValueHandler(inputRestroom1, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value={""}
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value={"??????"}
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value={"??????"}
                      control={<Radio />}
                      label="??????"
                    />
                  </RadioGroup>
                </FilterBox>
              )}

              {(currentFilterTab === 0 ||
                currentFilterTab === 1 ||
                currentFilterTab === 2 ||
                currentFilterTab === 3) && (
                <FilterBox>
                  <FilterLabel>????????? ????????????</FilterLabel>

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    {...inputRestroom2}
                    onChange={(e) =>
                      changeValueHandler(inputRestroom2, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value={""}
                      control={<Radio />}
                      label="??????"
                    />

                    <FormControlLabel
                      value={"????????????"}
                      control={<Radio />}
                      label="????????????"
                    />

                    <FormControlLabel
                      value={"????????????"}
                      control={<Radio />}
                      label="????????????"
                    />
                  </RadioGroup>
                </FilterBox>
              )}
            </Wrapper>
          </Wrapper>
        )}
      </WholeWrapper>

      {width < 900 && !isFilterOpen && !currentId && (
        <Wrapper
          isFixed={true}
          left={`0`}
          bottom={`0`}
          height={`60px`}
          bgColor={Theme.basicTheme_C}
          color={`#fff`}
          fontSize={`20px !important`}
          fontWeight={`700`}
          cursor={`pointer`}
          zIndex={`999`}
          onClick={() => setIsFilterOpen(true)}
        >
          ?????? ??????
        </Wrapper>
      )}

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

export default MM00Presenter;
