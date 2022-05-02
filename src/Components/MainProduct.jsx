import React, { useMemo } from "react";
import Theme from "../Styles/Theme";
import dynamic from "next/dynamic";
import { areaCalculation2 } from "../commonUtils";
import {
  AiFillPlusCircle,
  AiFillStar,
  AiOutlineStar,
  AiOutlineShareAlt,
  AiOutlineDown,
} from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
const ThumbnailSlider = dynamic(import("./slider/ThumbnailSlider.jsx"));
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
} from "./CommonComponents";
import CircularIndeterminate from "../Components/loading/CircularIndeterminate";

const MainProduct = ({
  cookies,
  width,
  isImageLoading,
  isImageChange,
  moreCategory,
  moreLoading,
  title,
  datum,
  imageIndex,
  setCurrentId,
  updateProductStarHandler,
  shareProductHandler,
  moreCategoryHandler,
}) => {
  if (moreCategory && moreCategory !== title) return null;

  return useMemo(
    () => (
      <Wrapper
        isRelative={true}
        dr={width < 900 ? `column` : `row`}
        ju={`flex-start`}
        margin={width < 900 ? `0` : `0 0 50px`}
      >
        {width < 900 ? null : (
          <Wrapper
            width={`auto`}
            isAbsolute={true}
            left={`-110px`}
            top={`20px`}
          >
            {/* <Wrapper
            margin={`10px 0`}
            padding={`12px 20px 10px`}
            width={`auto`}
            bgColor={`#404040`}
            color={Theme.white_C}
            shadow={`2px 2px 10px #696565`}
            fontSize={`15px`}
            fontWeight={`bold`}
            border={`3px solid #5A5757`}
            wordBreak={`break-word`}
          >
            {title}
          </Wrapper> */}
            <Wrapper
              width={`110px`}
              height={`90px`}
              padding={`10px`}
              shadow={`2px 2px 10px #696565`}
              textAlign={`center`}
              lineHeight={`90px`}
              fontSize={`18px`}
              fontWeight={`bold`}
              bgColor={`#404040`}
              color={Theme.white_C}
              border={`3px solid #5A5757`}
              wordBreak={`break-word`}
            >
              {title.split(" ").map((value, idx) => {
                return (
                  <SpanText key={idx}>
                    {value}
                    <br />
                  </SpanText>
                );
              })}
            </Wrapper>

            {!moreCategory && (
              <Wrapper
                margin={`15px 0 0`}
                width={`auto`}
                fontSize={`16px`}
                color={`#e59916`}
                cursor={`pointer`}
                onClick={() => moreCategoryHandler(title)}
              >
                전체매물보기
              </Wrapper>
            )}
          </Wrapper>
        )}

        <Wrapper
          dr={`row`}
          ju={width < 900 ? `center` : `flex-start`}
          maxHeight={
            moreCategory
              ? `auto`
              : width < 560
              ? `660px`
              : width < 900
              ? `500px`
              : `610px`
          }
          overflow={`hidden`}
        >
          {datum.map((data2, idx) => {
            return (
              <Wrapper width={`auto`} key={idx}>
                <Product
                  // onClick={(e) =>
                  //   imageViewerHandler(
                  //     e,
                  //     data2.detailImagePaths,
                  //     `/product-detail/${data2._id}`
                  //   )
                  // }
                  onClick={
                    () => setCurrentId(data2._id)
                    // _moveLinkHandler(`/product-detail/${data2._id}`)
                  }
                >
                  <ThumbnailSlider
                    isImageLoading={isImageLoading}
                    isImageChange={isImageChange}
                    imageIndex={imageIndex}
                    datum={data2.detailImagePaths.slice(0, 4)}
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
                      {data2.viewAddress}
                    </Text>
                    |
                    <Text
                      lineHeight={width < 900 ? `1.2` : `1.6`}
                      color={`#F2C321`}
                      padding={`0px 5px`}
                    >
                      실{areaCalculation2(data2.contractArea)}평
                    </Text>
                    |
                    <Text
                      lineHeight={width < 900 ? `1.2` : `1.6`}
                      color={`#fff`}
                      padding={`0px 5px`}
                    >
                      {data2.isMonthly
                        ? `[월] ${data2.monthlyDeposit}${data2.monthlyDepositUnit}/${data2.monthlyPrice}${data2.monthlyPriceUnit}`
                        : data2.isJeonse
                        ? `[전] ${data2.jeonseDeposit}${data2.jeonseDepositUnit}`
                        : `[매] ${data2.tradingPrice}${data2.tradingPriceUnit}`}
                    </Text>
                  </Wrapper>

                  <ProductDesc>
                    <AiFillPlusCircle />
                  </ProductDesc>

                  {data2.isComplete && (
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
                    {typeof window !== "undefined" && (
                      <CopyToClipboard
                        text={`${window.location.origin}/product-detail/${data2._id}`}
                        onCopy={shareProductHandler}
                      >
                        <AiOutlineShareAlt size={32} color={`#FAF7F8`} />
                      </CopyToClipboard>
                    )}
                  </Wrapper>

                  {!data2.isComplete && (
                    <Wrapper
                      isAbsolute={true}
                      right={`10px`}
                      top={`10px`}
                      width={`auto`}
                      cursor={`pointer`}
                      zIndex={`100`}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateProductStarHandler(data2._id, data2.star);
                      }}
                    >
                      {cookies.get(`INSTA_STAR_${data2._id}`) ? (
                        <AiFillStar size={34} color={Theme.basicTheme_C} />
                      ) : (
                        <AiOutlineStar size={34} color={`#FAF7F8`} />
                      )}
                    </Wrapper>
                  )}
                </Product>
                <ProductTitle
                  onClick={
                    () => setCurrentId(data2._id)
                    // _moveLinkHandler(`/product-detail/${data2._id}`)
                  }
                >
                  ┖ {data2.listTitle}&nbsp;
                  <SpanText color={`#999`} mediaFontSize={`14px`}>
                    | {data2.listSubTitle}
                  </SpanText>
                </ProductTitle>
              </Wrapper>
            );
          })}
        </Wrapper>

        {moreLoading && (
          <Wrapper margin={`80px 0 30px`}>
            <CircularIndeterminate />
          </Wrapper>
        )}

        {moreCategory && (
          <Wrapper>
            <Wrapper
              margin={`50px 0 0`}
              width={`auto`}
              padding={`25px 15px 13px`}
              fontSize={`20px`}
              color={`#e59916`}
              border={`6px double #e59916`}
              radius={`50%`}
              cursor={`pointer`}
              onClick={() => moreCategoryHandler(title)}
            >
              더보기
              <AiOutlineDown size={22} />
            </Wrapper>
          </Wrapper>
        )}
      </Wrapper>
    ),
    [
      width,
      Object.keys(cookies.cookies).length,
      isImageLoading,
      imageIndex,
      datum,
      moreCategory,
      moreLoading,
    ]
  );
};

// export default React.memo(MainProduct, (prevProps, nextProps) => {
//   if (prevProps.datum && nextProps.datum) {
//     if (prevProps.isImageLoading !== nextProps.isImageLoading) {
//       return false;
//     } else if (prevProps.width !== nextProps.width) {
//       return false;
//     } else if (prevProps.cookies !== nextProps.cookies) {
//       return false;
//     } else if (prevProps.datum === nextProps.datum) {
//       return true;
//     } else {
//       return false;
//     }
//   } else {
//     return false;
//   }
// });

export default MainProduct;
