import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { Image } from "../CommonComponents";

export default () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    centerMode: true,
    pauseOnHover: false,
    autoPlay: true,
    autoplaySpeed: 5000,
    touchMove: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const Container = styled.div`
    width: 100%;

    & img {
      margin: 45px auto 10px;
      opacity: 0.7;
      width: 200px !important;
      height: 250px;
    }

    & .slick-slide {
      text-align: center;
    }

    & .slick-center img {
      transform: scale(1.25);
      height: 100%;
      opacity: 1;
      box-shadow: 0px 5px 10px #eee;
    }
  `;

  return (
    <Container>
      <Slider {...settings}>
        <Image
          alt="신간이미지"
          src={`https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`}
        />

        <Image
          alt="신간이미지"
          src={`https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`}
        />

        <Image
          alt="신간이미지"
          src={`https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`}
        />

        <Image
          alt="신간이미지"
          src={`https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`}
        />

        <Image
          alt="신간이미지"
          src={`https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`}
        />

        <Image
          alt="신간이미지"
          src={`https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`}
        />

        <Image
          alt="신간이미지"
          src={`https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`}
        />
      </Slider>
    </Container>
  );
};
