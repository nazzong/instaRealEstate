import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { Image, Text, Wrapper, SpanText } from "../CommonComponents";
import Fade from "react-reveal/Fade";

export default ({
  datum,
  //
  _moveURLHandler,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 4000,
  };

  const Container = styled.div`
    width: 100%;
    position: relative;

    & .slick-next {
      right: 20px !important;
    }

    & .slick-prev {
      left: 8px !important;
      z-index: 1;
    }

    & .slick-next:before,
    & .slick-prev:before {
      font-size: 35px !important;
      opacity: 0.3 !important;

      @media (max-width: 700px) {
        font-size: 25px !important;
      }
    }

    & .slick-dots {
      bottom: 20px !important;
    }

    & .slick-dots li button:before {
      font-size: 10px !important;

      @media (max-width: 700px) {
        display: none;
      }
    }
  `;

  const MainBanner = styled.div`
    width: 100%;
    height: 500px;
    position: relative;
    margin-top: 97px;
    cursor: pointer;

    @media (max-width: 700px) {
      margin-top: 90px;
      height: 300px;
    }
  `;

  const ImgArea = styled.div`
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      background: rgba(0, 0, 0, 0.2);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 2;
    }

    @media (max-width: 700px) {
      height: 300px;
    }
  `;

  const DescArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    color: #fff;
  `;

  const ViewBtn = styled.button`
    padding: 5px 10px;
    border: 1px solid #ff2121;
    color: #ff2121;
    font-size: 16px;
    background: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    transition: 0.5s;

    &:hover {
      background: #ff2121;
      color: #fff;
    }
  `;

  const DescWrapper = styled(Wrapper)`
    width: 80%;
    align-items: flex-start;

    @media (max-width: 700px) {
      width: 100%;
      align-items: center;

      & .title {
        font-size: 25px;
      }

      & p,
      & a {
        text-align: center;
        justify-content: center;
      }
    }
  `;

  return (
    <Container>
      <Slider {...settings}>
        {datum &&
          datum.map((data) => {
            return (
              <MainBanner
                key={data._id}
                onClick={() => (data.link ? _moveURLHandler(data.link) : null)}
              >
                <ImgArea>
                  <Image
                    height={`100%`}
                    alt="메인베너"
                    src={`https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80`}
                  />
                </ImgArea>
                <DescArea>
                  <DescWrapper>
                    <Fade bottom delay={0}>
                      <Text
                        className="title"
                        fontSize={`40px`}
                        margin={`0px 0px 10px`}
                        fontWeight={`700`}
                      >
                        {data.title}
                      </Text>
                    </Fade>
                    <Fade bottom delay={200}>
                      <Text fontSize={`18px`}>
                        {data.content.split("<br />").map((content, idx) => (
                          <SpanText key={idx}>
                            {content}
                            <br />
                          </SpanText>
                        ))}
                      </Text>
                    </Fade>
                  </DescWrapper>
                </DescArea>
              </MainBanner>
            );
          })}
      </Slider>
    </Container>
  );
};
