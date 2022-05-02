import React from "react";
import { Wrapper, Image, UlWrapper, LiWrapper } from "../CommonComponents";
import { GET_POPUP } from "./PopupQueries";
import { useQuery } from "@apollo/react-hooks";
import { withCookies } from "react-cookie";
import { withResizeDetector } from "react-resize-detector";

const Popup = ({ cookies, width }) => {
  // useQuery
  const { data: popupDatum } = useQuery(GET_POPUP);

  // handler
  const _closeTodayPopupHandler = (data) => {
    if (typeof document !== "undefined") {
      const popup = document.getElementById(`popup-${data._id}-js`);

      popup.style.display = "none";

      cookies.set(`popup-${data._id}`, "y", {
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }
  };

  const _closePopupHandler = (data) => {
    if (typeof document !== "undefined") {
      const popup = document.getElementById(`popup-${data._id}-js`);
      popup.style.display = "none";
    }
  };

  return (
    <Wrapper>
      {popupDatum &&
        popupDatum.getPopup.map((data, idx) => {
          if (!data.useYn) return null;

          if (cookies.get(`popup-${data._id}`) === "y") return null;

          return (
            <Wrapper
              key={idx}
              id={`popup-${data._id}-js`}
              isAbsolute={true}
              top={width > 550 ? `50%` : `90px`}
              left={`50%`}
              zIndex={`9999`}
              shadow={`0px 5px 10px #ccc`}
              margin={
                width > 550
                  ? `${-210 - 50 * idx}px 0 0 ${-175 - 50 * idx}px`
                  : `0 0 0 -175px`
              }
              width={`350px`}
            >
              <Wrapper>
                <Image src={data.imagePath} height={`450px`} />
              </Wrapper>
              <UlWrapper dr={`row`}>
                <LiWrapper
                  width={`50%`}
                  height={`50px`}
                  lineHeight={`50px`}
                  color={`#576465`}
                  bgColor={`#fff`}
                  borderRight={`1px solid #f8f8f8`}
                  cursor={`pointer`}
                  isRoboto={true}
                  onClick={() => _closeTodayPopupHandler(data)}
                >
                  1일 동안 보지 않음
                </LiWrapper>
                <LiWrapper
                  isAbsolute={true}
                  width={`50%`}
                  height={`50px`}
                  lineHeight={`50px`}
                  color={`#576465`}
                  bgColor={`#fff`}
                  cursor={`pointer`}
                  borderLeft={`1px solid #ededed`}
                  isRoboto={true}
                  onClick={() => _closePopupHandler(data)}
                >
                  닫기
                </LiWrapper>
              </UlWrapper>
            </Wrapper>
          );
        })}
    </Wrapper>
  );
};

export default withResizeDetector(withCookies(Popup));
