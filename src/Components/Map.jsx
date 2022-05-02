import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  WholeWrapper,
  Wrapper,
  Image,
  Text,
  MapTitle,
} from "../Components/CommonComponents";
import { withResizeDetector } from "react-resize-detector";
import { AiOutlineClose } from "react-icons/ai";
import useWindowSize from "./Hooks/useWindowSize";
import { KakaoMap, Marker } from "react-full-kakao-maps";

const Map = ({ width }) => {
  const size = useWindowSize();

  const mapRef = useRef();

  const [mapOpen, setMapOpen] = useState(false);

  //handler
  const mapOpenToggle = () => {
    setMapOpen(!mapOpen);
  };

  return (
    <WholeWrapper>
      {mapOpen ? (
        <Wrapper
          color={`#fff`}
          fontSize={`25px`}
          al={`flex-end`}
          padding={`10px`}
          cursor={`pointer`}
          bgColor={`#F2C321`}
        >
          <AiOutlineClose onClick={mapOpenToggle} />
        </Wrapper>
      ) : (
        <Wrapper al={`flex-end`} onClick={mapOpenToggle} cursor={`pointer`}>
          <Image
            width={`100px`}
            alt="map icon"
            src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo-map.png?alt=media&token=c5520cf1-17c3-474c-bae1-ad7a1c30b70f`}
          />
        </Wrapper>
      )}
      {mapOpen && (
        <Wrapper
          dr={size.width < 800 ? `column` : `row`}
          height={size.width < 800 ? `400px` : `400px`}
        >
          <Wrapper
            width={size.width < 800 ? `100%` : `50%`}
            height={size.width < 800 ? `50%` : `100%`}
            bgColor={`#ccc`}
          >
            <KakaoMap
              ref={mapRef}
              apiUrl={`//dapi.kakao.com/v2/maps/sdk.js?appkey=4636f8ed837d49004d53e6b5b83f2c55&autoload=false`}
              width="100%"
              height="100%"
              level={7}
              lat={`37.55490583322241`}
              lng={`126.91750055990958`}
              draggable
              scrollwheel
              doubleClick
              doubleClickZoom
            >
              <Marker
                lat={`37.55490583322241`}
                lng={`126.91750055990958`}
              ></Marker>
            </KakaoMap>
          </Wrapper>

          <Wrapper
            width={size.width < 800 ? `100%` : `50%`}
            height={size.width < 800 ? `50%` : `100%`}
            bgColor={`#F2C321`}
            al={`flex-start`}
            padding={`50px`}
          >
            <Image
              width={`80px`}
              margin={`0px 15px 20px 0px`}
              src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo-map.png?alt=media&token=c5520cf1-17c3-474c-bae1-ad7a1c30b70f`}
            />
            <MapTitle>찾아오시는 길</MapTitle>
            <Text fontSize={`18px`}>
              서울특별시 마포구 서교동464-57번지, 1층
            </Text>
            <a href="tel:023321978">
              <Text fontSize={`18px`}>TEL : 02-332-1978</Text>
            </a>
          </Wrapper>
        </Wrapper>
      )}
    </WholeWrapper>
  );
};

export default withResizeDetector(Map);
