import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

import AppleSDGothicNeo_H_woff from "./fonts/AppleSDGothicNeo/AppleSDGothicNeo_H.woff";
import AppleSDGothicNeo_EB_woff from "./fonts/AppleSDGothicNeo/AppleSDGothicNeo_EB.woff";
import AppleSDGothicNeo_B_woff from "./fonts/AppleSDGothicNeo/AppleSDGothicNeo_B.woff";
import AppleSDGothicNeo_SB_woff from "./fonts/AppleSDGothicNeo/AppleSDGothicNeo_SB.woff";
import AppleSDGothicNeo_M_woff from "./fonts/AppleSDGothicNeo/AppleSDGothicNeo_M.woff";
import AppleSDGothicNeo_R_woff from "./fonts/AppleSDGothicNeo/AppleSDGothicNeo_R.woff";
import AppleSDGothicNeo_L_woff from "./fonts/AppleSDGothicNeo/AppleSDGothicNeo_L.woff";
import AppleSDGothicNeo_UL_woff from "./fonts/AppleSDGothicNeo/AppleSDGothicNeo_UL.woff";
import AppleSDGothicNeo_T_woff from "./fonts/AppleSDGothicNeo/AppleSDGothicNeo_T.woff";

const sliderCss = css`
  /* gallerySlider */
  .image-gallery {
    width: 100%;
    margin-bottom: 50px;
  }
  .image-gallery-slide .image-gallery-description {
    font-size: 22px;
    backdrop-filter: blur(3px);
  }
  @media (max-width: 800px) {
    .container .slick-next:before,
    .container .slick-prev:before {
      font-size: 20px !important;
    }
  }
  @media (max-width: 500px) {
    .container .slick-dots li button:before {
      display: none;
    }
  }
`;

const scrollCss = css`
  .scroll::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  .scroll::-webkit-scrollbar-thumb {
    background-color: #f2c321;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }

  .scroll::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const editorCss = css`
  /* Editor */
  .editor__form {
    width: 100%;
    transition: 0.5s;
    margin-bottom: 50px;
  }
  .editor__form:focus {
    box-shadow: 2px 2px 10px 2px rgba(220, 220, 220, 1);
  }
  .editor__form.h-100 {
    height: calc(100px + 42px);
  }
  .editor__form.h-100 .ql-container {
    height: 100px;
  }
  .editor__form.h-200 {
    height: calc(200px + 42px);
  }
  .editor__form.h-200 .ql-container {
    height: 200px;
  }
  .editor__form.h-300 {
    height: calc(300px + 42px);
  }
  .editor__form.h-300 .ql-container {
    height: 300px;
  }
  .editor__form.h-400 {
    height: calc(400px + 42px);
  }
  .editor__form.h-400 .ql-container {
    height: 400px;
  }
  .editor__form.h-500 {
    height: calc(500px + 42px);
  }
  .editor__form.h-500 .ql-container {
    height: 500px;
  }
  .editor__form.h-600 {
    height: calc(600px + 42px);
  }
  .editor__form.h-600 .ql-container {
    height: 600px;
  }
  .ql-editor img {
    max-width: 100%;
  }
  .editor__view.ql-editor {
    height: auto;
  }

  /* Slick */
  .slick-list {
    outline: none !important;
  }
  .slick-slide:focus {
    outline: none;
  }
  .slick-slide div {
    outline: none;
  }
  .slick-dots li button:before {
    color: #fff !important;
  }
  @media (max-width: 700px) {
    .editor__form.h-500 {
      height: calc(500px + 112px);
    }
  }
`;

const fileDropCss = css`
  .fileDropBox {
    width: 100%;
    height: 100%;
  }

  .fileDropTarget {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .fileDropOver {
    background-color: #ffefb8;
  }
`;

const imageViewerCss = css`
  #viewerBackdrop img {
    border: 10px solid #fff;
  }
`;

const photocradleCss = css`
  .photocradle {
    width: 520px;
    height: 340px;
    margin: 170px 0 0 120px;
    float: left;
  }

  .photocradle .photocradle-box {
    background: #1d1d1d;
    border-radius: 4px 4px 4px 4px;
    box-shadow: 0px 0px 4px #fff;
  }

  .photocradle .thumbnails-plane {
    background: transparent;
  }
  .photocradle .thumbnails-slider {
    background: #1d1d1d;
    border-radius: 4px 4px 4px 4px;
  }

  .photocradle .previewControl .control-next {
    background: url(controls.png) no-repeat -262px 0;
    width: 38px;
    height: 48px;
  }
  .photocradle .previewControl .control-prev {
    background: url(controls.png) no-repeat -224px 0;
    width: 38px;
    height: 48px;
  }
  .photocradle .mini .control-next {
    background: url(controls.png) no-repeat -243px -48px;
    width: 19px;
    height: 20px;
  }
  .photocradle .mini .control-prev {
    background: url(controls.png) no-repeat -224px -48px;
    width: 19px;
    height: 20px;
  }
  .photocradle .originalControl .control-next {
    background: url(controls.png) no-repeat -112px 0;
    width: 112px;
    height: 112px;
  }
  .photocradle .originalControl .control-prev {
    background: url(controls.png) no-repeat 0 0;
    width: 112px;
    height: 112px;
  }

  .photocradle .originalLoader .loader {
    background: #1d1d1d url(loader.png) no-repeat center center;
    width: 90px;
    height: 54px;
    border-radius: 9px 9px 9px 9px;
    opacity: 0.9;
  }
`;

const toastCss = css`
  #toast-container {
    z-index: 9999;
  }
`;

export default createGlobalStyle`
    ${reset};
    ${scrollCss};
    ${sliderCss};
    ${editorCss};
    ${fileDropCss};
    ${imageViewerCss};
    ${photocradleCss};
    ${toastCss};

    @font-face {
      font-family: 'AppleSDGothicNeo';
      font-style: normal;
      font-weight: 900;
      src: url(${AppleSDGothicNeo_H_woff}) 
    }

    @font-face {
      font-family: 'AppleSDGothicNeo';
      font-style: normal;
      font-weight: 800;
      src: url(${AppleSDGothicNeo_EB_woff}) 
    }

    @font-face {
      font-family: 'AppleSDGothicNeo';
      font-style: normal;
      font-weight: 700;
      src: url(${AppleSDGothicNeo_B_woff}) 
    }

    @font-face {
      font-family: 'AppleSDGothicNeo';
      font-style: normal;
      font-weight: 600;
      src: url(${AppleSDGothicNeo_SB_woff}) 
    }

    @font-face {
      font-family: 'AppleSDGothicNeo';
      font-style: normal;
      font-weight: 500;
      src: url(${AppleSDGothicNeo_M_woff}) 
    }

    @font-face {
      font-family: 'AppleSDGothicNeo';
      font-style: normal;
      font-weight: 400;
      src: url(${AppleSDGothicNeo_R_woff}) 
    }

    @font-face {
      font-family: 'AppleSDGothicNeo';
      font-style: normal;
      font-weight: 300;
      src: url(${AppleSDGothicNeo_L_woff}) 
    }

    @font-face {
      font-family: 'AppleSDGothicNeo';
      font-style: normal;
      font-weight: 200;
      src: url(${AppleSDGothicNeo_UL_woff}) 
    }

    @font-face {
      font-family: 'AppleSDGothicNeo';
      font-style: normal;
      font-weight: 100;
      src: url(${AppleSDGothicNeo_T_woff}) 
    }

    * {
        font-family: 'AppleSDGothicNeo';
        box-sizing : border-box;
    }
    body {
        font-family: 'AppleSDGothicNeo';
        background-color: ${(props) => props.theme.bgColor};
        color : ${(props) => props.theme.blackColor};
    }
    a {
        color : inherit;
        text-decoration : none;
        display:flex;
        flex-direction:row;
        align-items:center;     
    }
    input, textarea, button {
        outline : none;
        border : none;
    }
    input[type="text"]:read-only {
        background-color : ${(props) => props.theme.grey_C};
        color : #fff;
        cursor : default;
    }
    button, select {
        cursor: pointer;
    }

    /* Dialog */
    .MuiBackdrop-root {
        background-color: rgba(0, 0, 0, 0.2) !important;
        z-index: 999 !important;
    }
    .MuiPaper-root.MuiDialog-paper {
        z-index: 9999 !important;
    }
    .react-confirm-alert-overlay {
        z-index: 99999 !important;
    }
    .react-confirm-alert-body > h1 {
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    .MuiDialogActions-spacing {
      border-top : 1px solid #dcdcdc;
    }

    .MuiDrawer-paper {
      width: 80%;
    }
`;
