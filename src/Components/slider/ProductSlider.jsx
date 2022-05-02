import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Image, Text, Wrapper } from "../CommonComponents";
import InfiniteCarousel from "react-leaf-carousel";

const Container = styled.div`
  width: 100%;
  position: relative;
  margin: 80px 0px;

  & .InfiniteCarouselArrowIcon:hover {
    border: solid #888;
    border-width: 0 5px 5px 0;
  }
`;

const MainBanner = styled.div`
  width: 400px !important;
  height: 550px;
  position: relative;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.16);
  cursor: pointer;

  @media (max-width: 1350px) {
    width: 350px !important;
    margin: 10px auto;
  }
`;

const ImgArea = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & img.productImg {
    height: 250px;

    @media (max-width: 1350px) {
      height: 200px;
    }
  }
`;

const CreatorImg = styled.img`
  width: 100px !important;
  height: 100px;
  border-radius: 100%;
`;

const ProductDesc = styled.div`
  width: calc(100% - 120px);
  margin-left: 20px;
`;

const ProductSlider = ({
  datum,
  //
  _moveLinkHandler,
}) => {
  return (
    <Container>
      {datum && (
        <InfiniteCarousel
          dots={false}
          infinite={true}
          speed={1000}
          slidesToShow={3}
          slidesToScroll={1}
          autoplay={true}
          pauseOnHover={false}
          autoplaySpeed={5000}
          breakpoints={[
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 1280,
              settings: {
                slidesToShow: 2,
              },
            },
          ]}
        >
          {datum.map((data) => {
            return (
              <MainBanner
                key={data._id}
                onClick={() => _moveLinkHandler(`/product-detail/${data._id}`)}
              >
                <ImgArea>
                  <Image
                    className="productImg"
                    alt={data.name}
                    src={data.thumbnailPath}
                  />
                  <Text width={`100%`} margin={`10px 0px`}>
                    {data.name}
                  </Text>
                  <Wrapper dr={`row`}>
                    <CreatorImg
                      alt="크리에이터"
                      src={data.creator.thumbnailPath}
                    />
                    <ProductDesc>
                      <Text>{data.exp1}</Text>
                    </ProductDesc>
                  </Wrapper>
                </ImgArea>
              </MainBanner>
            );
          })}
        </InfiniteCarousel>
      )}
    </Container>
  );
};

export default ProductSlider;
