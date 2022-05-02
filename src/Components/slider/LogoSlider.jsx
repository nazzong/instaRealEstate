import React, { useEffect, useState, useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { Image, Wrapper } from "../CommonComponents";
import Theme from "../../Styles/Theme";
import Link from "next/link";
import { useRouter } from "next/router";
import useWindowSize from "../Hooks/useWindowSize";

const LogoSlider = ({ datum }) => {
  const router = useRouter();

  const { width } = useWindowSize();

  const Container = styled.div`
    width: 200px;

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

  const initSlidesToShow = 1;
  const initSettings = {
    dots: false,
    infinite: true,
    slidesToShow: initSlidesToShow,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 4000,
    touchMove: false,
    arrows: false,
    fade: true,
    responsive: [],
  };

  const [slidesToShow, setSlidesToShow] = useState(initSlidesToShow);
  const [settings, setSettings] = useState(initSettings);

  useEffect(() => {
    if (width) {
      let slidesToShow;

      if (width < 800) {
        slidesToShow = 1;
      } else if (width < 1000) {
        slidesToShow = 1;
      } else if (width < 1350) {
        slidesToShow = 1;
      } else {
        slidesToShow = initSlidesToShow;
      }

      setSettings({
        ...settings,
        slidesToShow,
      });
      setSlidesToShow(slidesToShow);
    }
  }, [width]);

  return useMemo(
    () => (
      <Container>
        <Slider {...settings}>
          <Wrapper ju={`flex-end`} cursor={`pointer`}>
            <Link href={router.pathname === `/` ? `/?reset=true` : `/`}>
              <Image
                alt="로고"
                src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo_01.png?alt=media&token=b1406d14-1cc9-4368-936d-f248e87b76fd`}
                height={
                  width < 900 || router.pathname.includes("product-detail")
                    ? `90px`
                    : `140px`
                }
                objectFit={`contain`}
              />
            </Link>
          </Wrapper>

          <Wrapper ju={`flex-end`} cursor={`pointer`}>
            <Link href={router.pathname === `/` ? `/?reset=true` : `/`}>
              <Image
                alt="로고"
                src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo_02.png?alt=media&token=8cd9f4f7-3158-45d0-800b-897d05245694`}
                height={
                  width < 900 || router.pathname.includes("product-detail")
                    ? `90px`
                    : `140px`
                }
                objectFit={`contain`}
              />
            </Link>
          </Wrapper>
        </Slider>
      </Container>
    ),
    [datum.length, width]
  );
};

export default LogoSlider;
