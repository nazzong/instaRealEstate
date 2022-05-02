import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { Image, Text, Wrapper } from "../CommonComponents";

export default ({ datum }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 5000,
  };

  const Container = styled.div`
    width: 100%;
    position: relative;
  `;

  const MainBanner = styled.div`
    width: 100%;
    height: 350px;
    position: relative;

    @media (max-width: 700px) {
      height: 150px;
    }
  `;

  const ImgArea = styled.div`
    width: 100%;
    height: 350px;
    overflow: hidden;
    position: relative;

    @media (max-width: 700px) {
      height: 150px;
    }

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
  `;

  return (
    <Container>
      <Slider {...settings}>
        {datum &&
          datum.map((data, idx) => {
            return (
              <MainBanner key={data._id}>
                <ImgArea>
                  <Image height={`100%`} alt="메인베너" src={data.imagePath} />
                </ImgArea>
              </MainBanner>
            );
          })}
      </Slider>
    </Container>
  );
};
