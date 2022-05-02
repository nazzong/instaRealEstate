import React, { useEffect, useMemo, useRef } from "react";
import "swiper/swiper-bundle.min.css";
import styled from "styled-components";
import { Image, Wrapper } from "../../Components/CommonComponents";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ThumbnailSlider = ({
  isImageLoading,
  isImageChange,
  imageIndex,
  datum = [],
}) => {
  const Container = styled.div`
    width: 100%;
    position: relative;
  `;

  const sliderRef = useRef();

  const settings = {
    dots: false,
    fade: true,
    arrows: false,
    infinite: false,
    autoplay: false,
    lazyLoad: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
  };

  useEffect(() => {
    if (sliderRef && sliderRef.current) sliderRef.current.slickGoTo(imageIndex);
  }, [imageIndex]);

  return useMemo(
    () => (
      <Container>
        {!isImageLoading && datum && <Image src={datum[0]} />}

        {isImageLoading && (
          <Slider ref={sliderRef} {...settings}>
            {datum &&
              datum.map((data, idx) => {
                return (
                  <Wrapper key={idx}>
                    <Image src={data} />
                  </Wrapper>
                );
              })}
          </Slider>
        )}
      </Container>
    ),
    [isImageLoading, isImageChange]
  );
};

export default ThumbnailSlider;
