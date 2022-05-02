import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import dynamic from "next/dynamic";
import {
  Image,
  Wrapper,
  Text,
  SoldOut,
  SoldOutText,
  SpanText,
  ProductTitle,
} from "../CommonComponents";
import { AiFillPlusCircle, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Theme from "../../Styles/Theme";
const Fade = dynamic(import("react-reveal/Fade"));
import { areaCalculation2 } from "../../commonUtils";

const PopularSlider = ({
  width,
  //
  cookies,
  //
  slidesToShow,
  //
  datum,
  //
  _moveLinkHandler,
  imageViewerHandler,
  updateProductStarHandler,
}) => {
  const Container = styled.div`
    width: 100%;

    & .slick-slide {
      text-align: center;
    }

    & .slick-prev,
    & .slick-next {
      width: 40px;
      height: 100px;
      background: ${Theme.basicTheme_C};
      transition: ${Theme.transition};
      border-radius: 5px;

      &:hover {
        border: 1px solid ${Theme.basicTheme_C};
        background: ${Theme.white_C};

        &:before,
        &:before {
          color: ${Theme.basicTheme_C};
        }
      }
    }

    & .slick-prev:before,
    & .slick-next:before {
      color: #fff;
      font-size: 20px;
    }

    & .slick-next:before {
      content: "▶︎";
    }

    & .slick-prev:before {
      content: "◀︎";
    }
  `;

  const ProductDesc = styled.h5`
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 250px;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.5s;
    line-height: 150%;
    opacity: 0;
    cursor: pointer;
    visibility: hidden;

    & svg {
      font-size: 50px;
    }
  `;

  const Product = styled.div`
    position: relative;
    width: 300px !important;
    height: ${(props) => props.height || `250px`};
    margin: 0px auto;
    margin-top: ${(props) => props.marginTop || `40px`};
    padding: ${(props) => props.padding};
    font-size: ${(props) => props.fontSize};
    display: ${(props) => props.display};
    justify-content: ${(props) => props.ju};

    transition: 0.5s;

    & img {
      width: 300px !important;
      height: 200px;
    }

    &:hover ${ProductDesc} {
      opacity: 1;
      visibility: visible;
      transition: 0.5s;
    }

    & .marker {
      width: 30px !important;
      height: auto !important;
      position: absolute;
      top: 0;
      left: 0;
    }
  `;

  const initSettings = {
    dots: false,
    infinite: true,
    slidesToShow: slidesToShow,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 5000,
    touchMove: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          arrows: true,
        },
      },
    ],
  };

  const [settings, setSettings] = useState(initSettings);

  useEffect(() => {
    setSettings({
      ...initSettings,
      slidesToShow,
    });
  }, [slidesToShow]);

  return datum ? (
    datum.length >= slidesToShow ? (
      <Container>
        <Slider {...settings}>
          {datum.map((data) => {
            return (
              <Fade key={data._id}>
                <Product
                  marginTop={`0`}
                  // onClick={() =>
                  //   imageViewerHandler(
                  //     data.detailImagePaths,
                  //     `/product-detail/${data._id}`
                  //   )
                  // }
                  onClick={() =>
                    _moveLinkHandler(`/product-detail/${data._id}`)
                  }
                >
                  <Image alt="인기 매몰" src={data.detailImagePaths[0]} />
                  <Wrapper
                    dr={`row`}
                    height={`50px`}
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
                      실{areaCalculation2(data.contractArea)}평
                    </Text>
                    |
                    <Text
                      lineHeight={width < 900 ? `1.2` : `1.6`}
                      color={`#fff`}
                      padding={`0px 5px`}
                    >
                      {data.isMonthly
                        ? `[월] ${data.monthlyDeposit}${data.monthlyDepositUnit}/${data.monthlyPrice}${data.monthlyPriceUnit}`
                        : data.isJeonse
                        ? `[전] ${data.jeonseDeposit}${data.jeonseDepositUnit}`
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

                  {/* {!data.isComplete && (
                    <Wrapper
                      isAbsolute={true}
                      right={`10px`}
                      top={`10px`}
                      width={`auto`}
                      cursor={`pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateProductStarHandler(data._id, data.star);
                      }}
                    >
                      {cookies.get(`INSTA_STAR_${data._id}`) ? (
                        <AiFillHeart size={34} color={Theme.basicTheme_C} />
                      ) : (
                        <AiOutlineHeart size={34} color={`#FAF7F8`} />
                      )}
                    </Wrapper>
                  )} */}

                  <Image
                    className="marker"
                    alt="icon"
                    src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo-mark.png?alt=media&token=607445e2-cde2-4ff2-a90b-845d960749f6`}
                  />
                </Product>
              </Fade>
            );
          })}
        </Slider>
      </Container>
    ) : (
      <Wrapper dr={`row`} ju={`flex-start`}>
        {datum.map((data) => {
          return (
            <Wrapper key={data._id} margin={`0 18px`} width={`auto`}>
              <Product
                // onClick={() =>
                //   imageViewerHandler(
                //     data.detailImagePaths,
                //     `/product-detail/${data._id}`
                //   )
                // }
                onClick={() => _moveLinkHandler(`/product-detail/${data._id}`)}
              >
                <Image alt="인기 매몰" src={data.detailImagePaths[0]} />
                <Wrapper
                  dr={`row`}
                  height={`50px`}
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
                    실{areaCalculation2(data.contractArea)}평
                  </Text>
                  |
                  <Text
                    lineHeight={width < 900 ? `1.2` : `1.6`}
                    color={`#fff`}
                    padding={`0px 5px`}
                  >
                    {data.isMonthly
                      ? `[월] ${data.monthlyDeposit}${data.monthlyDepositUnit}/${data.monthlyPrice}${data.monthlyPriceUnit}`
                      : data.isJeonse
                      ? `[전] ${data.jeonseDeposit}${data.jeonseDepositUnit}`
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

                {/* {!data.isComplete && (
                  <Wrapper
                    isAbsolute={true}
                    right={`10px`}
                    top={`10px`}
                    width={`auto`}
                    cursor={`pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateProductStarHandler(data._id, data.star);
                    }}
                  >
                    {cookies.get(`INSTA_STAR_${data._id}`) ? (
                      <AiFillHeart size={34} color={Theme.basicTheme_C} />
                    ) : (
                      <AiOutlineHeart size={34} color={`#FAF7F8`} />
                    )}
                  </Wrapper>
                )} */}

                <Image
                  className="marker"
                  alt="icon"
                  src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo-mark.png?alt=media&token=607445e2-cde2-4ff2-a90b-845d960749f6`}
                />
              </Product>
              <ProductTitle
                onClick={() => _moveLinkHandler(`/product-detail/${data._id}`)}
              >
                ┖ {data.listTitle}&nbsp;
                <SpanText color={`#999`} mediaFontSize={`14px`}>
                  | {data.listSubTitle}
                </SpanText>
              </ProductTitle>
            </Wrapper>
          );
        })}
      </Wrapper>
    )
  ) : null;
};

export default React.memo(
  PopularSlider,
  (prevProps, nextProps) =>
    prevProps.datum === nextProps.datum ||
    prevProps.slidesToShow === nextProps.slidesToShow
);
