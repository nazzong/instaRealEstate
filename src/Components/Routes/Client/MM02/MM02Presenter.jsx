import React, { useEffect } from "react";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  CommonSubTitle,
  Image,
  Text,
  UlWrapper,
  LiWrapper,
  SpanText,
  CommonButton,
} from "../../../CommonComponents";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Theme from "../../../../Styles/Theme";
import {
  AiFillTag,
  AiFillStar,
  AiOutlineStar,
  AiOutlineShareAlt,
  AiOutlineMessage,
} from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import ProductDetailSlider from "../../../slider/ProductDetailSlider";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { areaCalculation2, numberWithCommas } from "../../../../commonUtils";
import { BiDownArrow, BiMobileVibration } from "react-icons/bi";
import { KakaoMap, Marker, CustomOverlay } from "react-full-kakao-maps";
import "@4leaf.njm/react-quill/dist/quill.snow.css";
import { MdKeyboardBackspace } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Map = dynamic(import("../../../Map.jsx"));

const MobilePhone = styled(Wrapper)`
  width: 350px !important;
  height: 350px;
  box-shadow: 2px 2px 10px #eee;
  border-radius: 50%;
  border: 1px solid #eee;
  cursor: pointer;
`;

const MM02Presenter = ({
  width,
  router,
  cookies,
  //
  additionalContentRef,
  contentRef,
  mapRef,
  //
  isChange1,
  isChange2,
  setIsChange1,
  setIsChange2,
  currentId,
  isImageView,
  setIsImageView,
  //
  productData,
  estateData,
  //
  moveURLHandler,
  closePageHandler,
  updateProductStarHandler,
  shareProductHandler,
  testtest,
  ...props
}) => {
  return (
    <WholeWrapper
      isRelative={true}
      width={width < 500 ? `100%` : `20vw`}
      minWidth={`350px`}
      al={currentId ? `flex-end` : `center`}
      margin={`0 auto`}
      padding={router.pathname.includes("product-detail") ? `0` : `0 0 60px`}
      index={`1000`}
    >
      <RsWrapper
        isRelative={true}
        maxWidth={
          currentId
            ? `100%`
            : router.pathname.includes("product-detail")
            ? `375px !important`
            : `auto`
        }
        minWidth={`350px`}
        width={`100% !important`}
        padding={`0 !important`}
        bgColor={`rgba(255,255,255,0.9)`}
      >
        <Wrapper dr={width < 700 ? `column` : `row`} al={`normal`}>
          <Wrapper
            ju={`flex-start`}
            width={
              width < 700 ||
              router.pathname.includes("product-detail") ||
              currentId
                ? `100%`
                : `300px`
            }
            borderLeft={`1px solid #eee`}
            borderRight={`1px solid #eee`}
          >
            <Wrapper
              isSticky={
                width < 700 ||
                router.pathname.includes("product-detail") ||
                currentId
                  ? false
                  : true
              }
              top={`0`}
            >
              <Wrapper
                height={`50px`}
                bgColor={Theme.basicTheme_C}
                fontSize={`14px !important`}
                al={`flex-start`}
                padding={`0 20px`}
                shadow={`0px 1px 5px ${Theme.basicTheme_C}`}
              >
                <Wrapper
                  width={`auto`}
                  cursor={`pointer`}
                  onClick={() => {
                    if (isImageView) {
                      setIsImageView(!isImageView);
                    } else {
                      closePageHandler();
                    }
                  }}
                >
                  <MdKeyboardBackspace size={36} color={Theme.white_C} />
                </Wrapper>
              </Wrapper>

              {productData && productData.detailImagePaths.length > 0 && (
                <Wrapper
                  isRelative={true}
                  radius={`8px`}
                  shadow={`2px 2px 10px #eee`}
                  cursor={`pointer`}
                  zIndex={`1000`}
                >
                  <ProductDetailSlider
                    isImageView={isImageView}
                    setIsImageView={setIsImageView}
                    datum={productData.detailImagePaths}
                  />

                  {isImageView && (
                    <Wrapper
                      ju={`flex-start`}
                      isAbsolute={true}
                      left={`0`}
                      top={`0`}
                      zIndex={`1000`}
                      width={`100%`}
                      overflow={`auto`}
                    >
                      <Wrapper
                        ju={`flex-start`}
                        height={
                          router.pathname.includes("product-detail")
                            ? `calc(100% - 112px)`
                            : width < 900
                            ? `calc(100% - 112px)`
                            : `calc(100% - 210px)`
                        }
                        wrap={`nowrap`}
                        bgColor={`#fff`}
                      >
                        {productData &&
                          productData.detailImagePaths.map((data, idx) => {
                            return <Image key={idx} src={data} />;
                          })}
                      </Wrapper>
                    </Wrapper>
                  )}
                </Wrapper>
              )}

              <Wrapper
                padding={`25px 20px`}
                shadow={`0px 1px 10px #eee`}
                borderBottom={`1px solid #eee`}
              >
                {productData && (
                  <Wrapper al={`flex-start`} margin={`0 0 10px`}>
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={`auto`}
                      margin={`0 10px`}
                      border={`1px solid #303538`}
                      radius={`5px`}
                    >
                      <Wrapper
                        width={`auto`}
                        padding={`4px 6px`}
                        bgColor={`#303538`}
                        color={`#fff`}
                        fontSize={`11px`}
                        fontWeight={`700`}
                      >
                        월 고정비
                      </Wrapper>

                      <Wrapper
                        width={`auto`}
                        padding={`4px 6px`}
                        color={`#303538`}
                        fontSize={`11px`}
                        fontWeight={`700`}
                      >
                        {productData
                          ? productData.isMonthly
                            ? `${
                                parseInt(productData.monthlyPrice || 0) +
                                parseInt(productData.managementFee || 0)
                              }${productData.monthlyPriceUnit}`
                            : productData.isManagementFee
                            ? `${productData.managementFee}${productData.managementFeeUnit}`
                            : `없음`
                          : ``}
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                    padding={`0 10px`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      width={`100%`}
                      fontSize={`22px`}
                      fontWeight={`700`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.isMonthly
                        ? `보증금 ${productData.monthlyDeposit}${productData.monthlyDepositUnit} / 월세 ${productData.monthlyPrice}${productData.monthlyPriceUnit}`
                        : productData.isJeonse
                        ? `전세금 ${productData.jeonseDeposit}${productData.jeonseDepositUnit}`
                        : `매매가 ${productData.tradingPrice}${
                            productData.tradingPriceUnit
                          } / 평당매매가 ${numberWithCommas(
                            String(parseInt(productData.pyeongPrice) || 0)
                          )}
                        ${productData.pyeongPriceUnit}`}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`0 0 10px`}
                    padding={`0 10px`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      width={`100%`}
                      fontSize={`22px`}
                      fontWeight={`700`}
                      color={Theme.basicTheme_C}
                      lineHeight={`150%`}
                    >
                      권리금&nbsp;
                      {productData.isRightFee
                        ? `${productData.rightFee}${productData.rightFeeUnit}원`
                        : `없음`}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                    padding={`0 10px`}
                  >
                    <LiWrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={`100%`}
                      fontSize={`14px !important`}
                      color={`#808991`}
                    >
                      <Wrapper margin={`0 4px 0 0`} width={`auto`}>
                        <AiFillTag />
                      </Wrapper>
                      매물번호&nbsp;
                      {productData.productNo}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData &&
                  productData.subwayName &&
                  (productData.subwayTime || productData.subwayCarTime) && (
                    <UlWrapper
                      dr={`row`}
                      al={`normal`}
                      wrap={`nowrap`}
                      margin={`5px 0`}
                      padding={`0 10px`}
                    >
                      <LiWrapper
                        dr={`row`}
                        ju={`flex-start`}
                        al={`flex-start`}
                        width={`100%`}
                        fontSize={`14px !important`}
                        color={`#808991`}
                        lineHeight={`150%`}
                      >
                        <Wrapper
                          isRelative={true}
                          top={`2px`}
                          margin={`0 4px 0 0`}
                          width={`auto`}
                        >
                          <HiLocationMarker />
                        </Wrapper>
                        근처에 가장 가까운 전철역
                        <br />
                        {productData.subwayName}&nbsp;
                        {productData.subwayCarTime
                          ? `차량 ${productData.subwayCarTime}`
                          : `도보 ${productData.subwayTime}`}
                        분거리
                        <br />
                        {productData.subwayName2 &&
                          (productData.subwayTime2 ||
                            productData.subwayCarTime2) &&
                          `${productData.subwayName2}
                          ${
                            productData.subwayCarTime2
                              ? ` 차량 ${productData.subwayCarTime2}`
                              : ` 도보 ${productData.subwayTime2}`
                          }분거리`}
                      </LiWrapper>
                    </UlWrapper>
                  )}

                {productData && (
                  <Wrapper dr={`row`} ju={`flex-end`}>
                    <Wrapper
                      width={`auto`}
                      padding={`5px 8px 5px 5px`}
                      margin={`0 6px 0 0`}
                      border={`1px solid #e2e7ed`}
                      radius={`50%`}
                      cursor={`pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {typeof window !== `undefined` && (
                        <CopyToClipboard
                          text={`${window.location.origin}/product-detail/${productData._id}`}
                          onCopy={shareProductHandler}
                        >
                          <AiOutlineShareAlt size={23} color={`#5d6161`} />
                        </CopyToClipboard>
                      )}
                    </Wrapper>

                    <Wrapper
                      width={`auto`}
                      padding={`5px`}
                      border={`1px solid #e2e7ed`}
                      radius={`50%`}
                      cursor={`pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateProductStarHandler(
                          productData._id,
                          productData.star
                        );
                      }}
                    >
                      {cookies.get(`INSTA_STAR_${productData._id}`) ? (
                        <AiFillStar size={25} color={Theme.basicTheme_C} />
                      ) : (
                        <AiOutlineStar size={25} color={`#5d6161`} />
                      )}
                    </Wrapper>
                  </Wrapper>
                )}
              </Wrapper>

              <Wrapper
                isRelative={true}
                dr={`row`}
                shadow={`0px 1px 10px #eee`}
                padding={`10px 20px`}
                fontSize={`14px !important`}
                fontWeight={`bold`}
                lineHeight={`140%`}
                borderBottom={`1px solid #eee`}
              >
                {productData && productData.title}
              </Wrapper>

              <Wrapper
                padding={`0 20px 20px`}
                shadow={`0px 1px 10px #eee`}
                borderBottom={`1px solid #eee`}
              >
                <Wrapper
                  isRelative={true}
                  dr={`row`}
                  ju={`space-between`}
                  padding={`20px 0`}
                >
                  <SpanText
                    fontSize={`16px !important`}
                    fontWeight={`bold`}
                    color={`#212529`}
                  >
                    매물정보
                  </SpanText>
                </Wrapper>

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    margin={`0 0 15px`}
                    padding={`0 0 20px`}
                    borderBottom={`1px solid #f5f7f7`}
                  >
                    <LiWrapper width={`25%`}>
                      <Image
                        width={`32px`}
                        height={`32px`}
                        src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2FMM02%2Ficon_01.jpg?alt=media&token=1ef52f37-c41e-498a-ade5-608f0ed8704d`}
                      />

                      <SpanText
                        margin={`12px 0 8px`}
                        fontSize={`14px !important`}
                      >
                        건물형태
                      </SpanText>

                      <SpanText
                        fontSize={`16px !important`}
                        fontWeight={`700`}
                        textAlign={`center`}
                      >
                        {productData.buildingUse}
                      </SpanText>
                    </LiWrapper>

                    <LiWrapper width={`25%`}>
                      <Image
                        width={`32px`}
                        height={`32px`}
                        src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2FMM02%2Ficon_02.jpg?alt=media&token=1ef52f37-c41e-498a-ade5-608f0ed8704d`}
                      />

                      <SpanText
                        margin={`12px 0 8px`}
                        fontSize={`14px !important`}
                      >
                        {productData.isTrading ? `대지면적` : `전용면적`}
                      </SpanText>

                      <SpanText
                        fontSize={`16px !important`}
                        fontWeight={`700`}
                        textAlign={`center`}
                      >
                        {productData.isTrading
                          ? areaCalculation2(productData.groundArea)
                          : areaCalculation2(productData.contractArea)}
                        평
                      </SpanText>
                    </LiWrapper>

                    <LiWrapper width={`25%`}>
                      <Image
                        width={`32px`}
                        height={`32px`}
                        src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2FMM02%2Ficon_03.jpg?alt=media&token=1ef52f37-c41e-498a-ade5-608f0ed8704d`}
                      />

                      <SpanText
                        margin={`12px 0 8px`}
                        fontSize={`14px !important`}
                      >
                        층수
                      </SpanText>

                      <SpanText
                        fontSize={`16px !important`}
                        fontWeight={`700`}
                        textAlign={`center`}
                      >
                        {productData.isTrading
                          ? `지하${productData.totalFloor}/${productData.floor}`
                          : `${productData.floor} / ${productData.totalFloor}`}
                      </SpanText>
                    </LiWrapper>

                    <LiWrapper width={`25%`}>
                      <Image
                        width={`32px`}
                        height={`32px`}
                        src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2FMM02%2Ficon_04.jpg?alt=media&token=1ef52f37-c41e-498a-ade5-608f0ed8704d`}
                      />

                      <SpanText
                        margin={`12px 0 8px`}
                        fontSize={`14px !important`}
                      >
                        관리비
                      </SpanText>

                      <SpanText
                        fontSize={`16px !important`}
                        fontWeight={`700`}
                        textAlign={`center`}
                      >
                        {productData.isManagementFee
                          ? `${productData.managementFee}${productData.managementFeeUnit}`
                          : `없음`}
                      </SpanText>
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && productData.isTrading && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 대지면적
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {areaCalculation2(productData.groundArea)}평
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ {productData.isTrading ? `연면적` : `공급면적`}
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {areaCalculation2(productData.dedicatedArea)}평
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && productData.isTrading && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 평당매가
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {numberWithCommas(String(productData.pyeongPrice || 0))}
                      {productData.pyeongPriceUnit}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 주차
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.isParking
                        ? `${productData.parkingNumber}대`
                        : `불가능`}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 엘리베이터
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.isElevator
                        ? `${productData.elevatorNumber}대`
                        : `없음`}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 냉난방기
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.isHeating ? `있음` : `없음`}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && !productData.isTrading && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 난방종류
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.heatingType}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 입주가능일
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.moveInDate}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 주출입구방향
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.entranceDirection}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 사용승인일
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.useApprovalDate}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 화장실
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.restroom}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 용도
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.usage}
                    </LiWrapper>
                  </UlWrapper>
                )}

                {productData && !productData.isTrading && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`110px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      ・ 룸갯수
                    </LiWrapper>
                    <LiWrapper
                      al={`flex-start`}
                      width={`calc(100% - 110px)`}
                      fontSize={`14px !important`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.roomNumber}개
                    </LiWrapper>
                  </UlWrapper>
                )}
              </Wrapper>

              <Wrapper
                padding={`25px 20px`}
                shadow={`0px 1px 10px #eee`}
                borderBottom={`1px solid #eee`}
              >
                {productData && (
                  <UlWrapper
                    dr={`row`}
                    al={`normal`}
                    wrap={`nowrap`}
                    margin={`5px 0`}
                  >
                    <LiWrapper
                      al={`flex-start`}
                      ju={`flex-start`}
                      width={`100%`}
                      fontWeight={`bold`}
                      color={`#222`}
                      lineHeight={`150%`}
                    >
                      {productData.description
                        .split("\n")
                        .map((description, idx) => {
                          return (
                            <SpanText key={idx} fontSize={`16px !important`}>
                              {description}
                              <br />
                            </SpanText>
                          );
                        })}
                    </LiWrapper>
                  </UlWrapper>
                )}
              </Wrapper>

              {productData && (
                <Wrapper
                  padding={`0`}
                  shadow={`0px 1px 10px #eee`}
                  borderBottom={`1px solid #eee`}
                >
                  <Wrapper
                    isRelative={true}
                    dr={`row`}
                    ju={`space-between`}
                    padding={`20px`}
                  >
                    <SpanText
                      fontSize={`16px !important`}
                      fontWeight={`bold`}
                      color={`#212529`}
                    >
                      {!productData.isMap && `인스타부동산 `}위치
                    </SpanText>
                    <SpanText fontSize={`13px !important`} color={`#212529`}>
                      <SpanText
                        isRelative={true}
                        top={`2px`}
                        padding={`0 3px 0 0`}
                      >
                        <HiLocationMarker size={14} />
                      </SpanText>

                      {productData.isMap
                        ? productData.address &&
                          `${productData.address.split(" ")[0]} ${
                            productData.address.split(" ")[1]
                          } ${productData.address.split(" ")[2]}`
                        : `서울특별시 마포구 서교동464-57번지, 1층`}
                    </SpanText>
                  </Wrapper>

                  <UlWrapper dr={`row`} al={`normal`}>
                    <LiWrapper
                      al={`center`}
                      ju={`center`}
                      width={`100%`}
                      padding={`0 20px 20px`}
                      fontSize={`14px !important`}
                      fontWeight={`bold`}
                      color={`#222`}
                    >
                      <Wrapper
                        overflow={`hidden`}
                        radius={`10px`}
                        shadow={`2px 2px 10px #eee`}
                      >
                        <KakaoMap
                          ref={mapRef}
                          apiUrl={`//dapi.kakao.com/v2/maps/sdk.js?appkey=4636f8ed837d49004d53e6b5b83f2c55&autoload=false`}
                          width="100%"
                          height="225px"
                          level={4}
                          lat={
                            productData.isMap
                              ? productData.addressLat
                              : `37.55490583322241`
                          }
                          lng={
                            productData.isMap
                              ? productData.addressLng
                              : `126.91750055990958`
                          }
                          draggable
                          scrollwheel={!productData.isMap}
                          doubleClick
                          doubleClickZoom={!productData.isMap}
                        >
                          {productData.isMap ? (
                            <CustomOverlay
                              content={
                                <Wrapper
                                  width={`150px`}
                                  height={`150px`}
                                  radius={`50%`}
                                  bgColor={`rgba(242, 196, 34, 0.5)`}
                                  shadow={`2px 2px 10px #eee`}
                                ></Wrapper>
                              }
                              lat={
                                productData.isMap
                                  ? productData.addressLat
                                  : `37.55490583322241`
                              }
                              lng={
                                productData.isMap
                                  ? productData.addressLng
                                  : `126.91750055990958`
                              }
                            ></CustomOverlay>
                          ) : (
                            <Marker
                              lat={`37.55490583322241`}
                              lng={`126.91750055990958`}
                            ></Marker>
                          )}
                        </KakaoMap>
                      </Wrapper>
                    </LiWrapper>
                  </UlWrapper>
                </Wrapper>
              )}

              {estateData && (
                <Wrapper
                  ju={`flex-start`}
                  shadow={`0px 1px 10px #eee`}
                  borderBottom={`1px solid #eee`}
                >
                  <Wrapper
                    isRelative={true}
                    dr={`row`}
                    ju={`space-between`}
                    padding={`20px`}
                  >
                    <SpanText
                      fontSize={`16px !important`}
                      fontWeight={`bold`}
                      color={`#212529`}
                    >
                      중개사 소개
                    </SpanText>
                  </Wrapper>

                  <Wrapper>
                    <Image
                      src={estateData.managerThumbnail}
                      width={`120px`}
                      height={`120px`}
                      border={`1px solid #eee`}
                      radius={`50%`}
                    />

                    <UlWrapper margin={`15px 0 20px`}>
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
              )}
            </Wrapper>
          </Wrapper>

          <Wrapper
            isRelative={true}
            zIndex={`-1`}
            ju={`flex-start`}
            shadow={`0px 1px 10px #eee`}
          >
            {width < 700 && typeof window !== `undefined` && (
              <MobilePhone
                margin={`50px 0`}
                onClick={() => (window.location.href = "tel:023321978")}
              >
                <BiMobileVibration size={120} />
                <Wrapper
                  margin={`25px 0 20px`}
                  width={`70%`}
                  fontSize={width < 420 ? `16px !important` : `18px !important`}
                  fontWeight={`bold`}
                >
                  모바일 환경에서 클릭 시<br />
                  <SpanText padding={`15px 0`} fontSize={`1.4em !important`}>
                    바로 전화 연결 됩니다!
                  </SpanText>
                </Wrapper>
              </MobilePhone>
            )}

            {productData && productData.additionalContent && (
              <Wrapper
                ref={additionalContentRef}
                className="ql-editor editor__view"
                margin={`50px 0`}
                display={`block`}
              ></Wrapper>
            )}

            {productData && productData.content && (
              <Wrapper
                ref={contentRef}
                className="ql-editor editor__view"
                margin={`50px 0`}
                ju={`normal`}
                al={`normal`}
              ></Wrapper>
            )}
          </Wrapper>
        </Wrapper>
      </RsWrapper>

      <Wrapper
        isFixed={router.pathname.includes("product-detail") ? false : true}
        right={`0`}
        bottom={`0`}
        zIndex={isImageView ? `-1` : `1000`}
        margin={`0 0 0 0`}
        dr={`row`}
        width={
          width < 500
            ? `100%`
            : router.pathname.includes("product-detail")
            ? `375px`
            : `20vw`
        }
        maxWidth={
          currentId
            ? `100%`
            : router.pathname.includes("product-detail")
            ? `375px !important`
            : `auto`
        }
        minWidth={`350px`}
        borderTop={`1px solid #f4f4f4`}
        padding={`15px`}
        bgColor={`#fff`}
        shadow={`0px 1px 10px #eee`}
      >
        <Wrapper
          dr={`row`}
          margin={`0 4px`}
          padding={`14px 0 12px`}
          width={`calc(50% - 8px)`}
          color={`#252323`}
          fontSize={`16px`}
          cursor={`pointer`}
          radius={`4px`}
          bgColor={`#f3f3f3`}
          onClick={() => moveURLHandler(`https://open.kakao.com/o/sL2raHI`)}
        >
          <Wrapper width={`auto`} margin={`0 5px 0 0`}>
            <AiOutlineMessage size={18} />
          </Wrapper>
          인스타톡
        </Wrapper>

        <Wrapper
          dr={`row`}
          margin={`0 4px`}
          padding={`14px 0 12px`}
          width={`calc(50% - 8px)`}
          color={`#fff`}
          fontSize={`16px`}
          cursor={`pointer`}
          radius={`4px`}
          bgColor={Theme.basicTheme_C}
          onClick={() => (window.location.href = "tel:023321978")}
        >
          <Wrapper width={`auto`} margin={`0 7px 0 0`}>
            <FiPhoneCall size={18} />
          </Wrapper>
          문의하기
        </Wrapper>
      </Wrapper>

      {/* <Map /> */}
    </WholeWrapper>
  );
};

export default MM02Presenter;
