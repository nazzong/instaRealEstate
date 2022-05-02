import styled from "styled-components";
import { appearAnimation } from "./AnimationCommon";

////////////////////////////////////////////////Wrapper////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

/** Props List **
 * width        : width
 * height       : height
 * dr           : flex-direction
 * al           : align-items
 * ju           : justify-content
 * bgColor      : background
 * color        : color
 * index        : z-index
 *  */
export const WholeWrapper = styled.div`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth || `100%`};
  max-width: ${(props) => props.maxWidth || `100%`};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  color: ${(props) => props.color};
  display: flex;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background-image: ${(props) => props.bgImg};
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  box-shadow: ${(props) => props.boxShadow};
  z-index: ${(props) => props.index};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  position: ${(props) => (props.isFixed ? `fixed` : ``)};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  visibility: ${(props) => props.visibility};
  animation: ${appearAnimation} 1s forwards;

  & .MuiCheckbox-root,
  & .MuiCheckbox-colorSecondary.Mui-checked {
    color: ${(props) => props.theme.black_C} !important;
  }
`;

/** Props List **
 * width        : width
 * height       : height
 * dr           : flex-direction
 * al           : align-items
 * ju           : justify-content
 * bgColor      : background
 * color        : color
 *
 *  */
export const Wrapper = styled.div`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  display: ${(props) => props.display || `flex`};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `wrap`};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isSticky ? `sticky` : ``)};
  position: ${(props) => (props.isFixed ? `fixed` : ``)};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  z-index: ${(props) => props.zIndex};
  border: ${(props) => props.border};
  border-top: ${(props) => props.borderTop};
  border-bottom: ${(props) => props.borderBottom};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  border-radius: ${(props) => props.radius};
  box-shadow: ${(props) => props.shadow};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: ${(props) => (props.isOverflow ? `auto` : props.overflow || ``)};
  background-image: ${(props) => props.bgImg};
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: ${(props) => props.attachment || `fixed`};
  background-position: center;
  transition: 0.5s;
  cursor: ${(props) => props.cursor};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  text-shadow: ${(props) => props.textShadow};
  opacity: ${(props) => props.opacity};
  animation: ${appearAnimation} 1s forwards;
  word-break: ${(props) => props.wordBreak};

  & .react-reveal {
    width: inherit;
    z-index: 1;
  }

  & pre {
    white-space: pre-wrap;
    line-height: 1.4;
    color: #6f6f6f;
    font-size: 14px;
  }

  &:hover {
    font-weight: ${(props) => (props.isHeaderHover ? `800` : ``)};
    color: ${(props) => (props.isColorHover ? `#F2C321` : ``)};
    box-shadow: ${(props) => (props.isShadowHover ? `0px 6px 12px #999` : ``)};
  }

  @media (max-width: 700px) {
    font-size: 14px;

    & svg {
      font-size: 20px;
    }
  }
`;

/** Props List **
 * width        : width
 * height       : height
 * dr           : flex-direction
 * al           : align-items
 * ju           : justify-content
 * bgColor      : background
 * color        : color
 *
 *  */
export const RsWrapper = styled.div`
  width: ${(props) =>
    props.width || props.isMain ? `calc(1350px - 350px)` : `1350px`};
  max-width: ${(props) => props.maxWidth || `1920px`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `100%`};
  ${(props) => props.minHeight && `min-height: ${props.minHeight};`}
  color: ${(props) => props.color};
  display: flex;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `wrap`};
  backdrop-filter: ${(props) => props.filter};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: ${(props) => props.overflow};
  border-bottom: ${(props) => props.borderBottom};
  border: ${(props) => props.border};
  font-size: ${(props) => props.fontSize};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};

  @media (min-width: 2500px) {
    width: ${(props) => (props.isMain ? `calc(90% - 350px)` : `100%`)};
  }
  @media (max-width: 2500px) {
    width: ${(props) => (props.isMain ? `calc(1920px - 350px)` : `1920px`)};
  }
  @media (max-width: 1920px) {
    width: ${(props) => (props.isMain ? `calc(1350px - 350px)` : `1350px`)};
  }
  @media (max-width: 1350px) {
    width: ${(props) => (props.isMain ? `calc(1280px - 350px)` : `1280px`)};
  }
  @media (max-width: 1350px) {
    width: ${(props) => (props.isMain ? `calc(1100px - 350px)` : `1100px`)};
  }
  @media (max-width: 1100px) {
    width: ${(props) => (props.isMain ? `calc(900px - 350px)` : `900px`)};
  }
  @media (max-width: 900px) {
    width: ${(props) => (props.isMain ? `calc(800px - 350px)` : `800px`)};
  }
  @media (max-width: 800px) {
    width: ${(props) => (props.isMain ? `calc(700px - 350px)` : `700px`)};
  }
  @media (max-width: 700px) {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

/** Props List **
 * width        : width
 * height       : height
 * dr           : flex-direction
 * al           : align-items
 * ju           : justify-content
 * bgColor      : background
 * color        : color
 *
 *  */
export const SearchWrapper = styled.div`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  color: ${(props) => props.theme.darkGrey_C};
  display: flex;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `flex-end`};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  border: ${(props) => props.border};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};

  & svg {
    font-size: ${(props) => props.fontSize || `15px`};
    cursor: pointer;
    text-align: center;
    width: 30px;
    height: 30px;
    padding: 4px;
    position: absolute;
    right: 0;
    top: 0;
  }

  @media (max-width: 700px) {
    justify-content: ${(props) => props.ju || `center`};
  }
`;

export const UlWrapper = styled.ul`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  display: flex;
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => (props.isWrap ? `wrap` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  border-bottom: ${(props) => props.borderBottom};
  border-top: ${(props) => props.borderTop};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: ${(props) => (props.ishidden ? `hidden` : ``)};
  transition: 0.3s;

  & .react-reveal {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const LiWrapper = styled.li`
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  font-weight: ${(props) => props.fontWeight};
  display: flex;
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => (props.isWrap ? `wrap` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-right: ${(props) => props.borderRight};
  border-top: ${(props) => props.borderTop};
  border-left: ${(props) => props.borderLeft};
  border-bottom: ${(props) => props.borderBottom};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.textAlign};
  line-height: ${(props) => props.lineHeight};
  box-shadow: ${(props) => props.shadow};
  cursor: ${(props) => props.cursor};
  transition: 0.4s;
  z-index: ${(props) => props.zIndex};

  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////Input/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
/** Props List **
 * width            : width [required]
 * height           : height
 * transition       : transition
 * margin           : margin
 *  */
export const TextInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height || `30px`};
  border: ${(props) => props.theme.border};
  padding: ${(props) => props.padding || props.theme.inputPadding};
  border-radius: ${(props) => props.theme.radius};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  &:focus {
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`;

export const TextInput2 = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height || `30px`};
  border-bottom: 2px solid ${(props) => props.theme.create_B_C};
  background-color: ${(props) => props.bgColor};
  padding: ${(props) => props.padding || props.theme.inputPadding};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  position: relative;
  &:focus {
    box-shadow: ${(props) => props.theme.boxShadow};
    border-bottom: 2px solid ${(props) => props.theme.check_B_C};
  }
`;

export const TextArea = styled.textarea`
  width: ${(props) => props.width};
  height: ${(props) => props.height || `100px`};
  border: ${(props) => props.theme.border};
  padding: ${(props) => props.padding || `10px`};
  border-radius: ${(props) => props.theme.radius};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  &:focus {
    box-shadow: ${(props) => props.theme.boxShadow};
    border: 1px solid ${(props) => props.theme.deepTheme_C};
  }
`;

export const Combo = styled.select`
  width: ${(props) => props.width};
  height: 30px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radius};
  background: #fff;
  margin: ${(props) => props.margin || `10px 0`};
`;

export const ComboOption = styled.option``;

export const Label = styled.label`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  cursor: pointer;

  & .MuiFormControlLabel-root svg {
    font-size: 20px;
    margin-bottom: 1px;
    color: #ce0000;
  }
  & .main.MuiFormControlLabel-root svg {
    color: #0b0b0b;
  }
`;

/** Props List **
 * width            : width [required]
 * kindOf             : [check, create, update, delete] [required]
 * height           : height
 * transition       : transition
 * margin           : margin
 * padding          : padding
 *  */
export const CommonButton = styled.button`
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `30px`};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  color: #fff;
  ${(props) => !props.kindOf && `background : ${props.theme.basicTheme_C};`}
  ${(props) =>
    props.kindOf === `white` && `background : ${props.theme.white_C};`}
  ${(props) => props.kindOf === `white` && `color : ${props.theme.black_C};`}
      ${(props) =>
    props.kindOf === `white` &&
    `border : 1px solid ${props.theme.basicTheme_C};`}
      ${(props) =>
    props.kindOf === `create` && `background : ${props.theme.create_B_C};`}
  ${(props) =>
    props.kindOf === `check` && `background : ${props.theme.check_B_C};`}
  ${(props) =>
    props.kindOf === `update` && `background : ${props.theme.update_B_C};`}
  ${(props) =>
    props.kindOf === `delete` && `background : ${props.theme.delete_B_C};`}
      ${(props) =>
    props.kindOf === `default` && `background : ${props.theme.grey_C};`}
      

  & svg {
    font-size: 25px;
    color: #fff;
  }

  &:hover {
    background: #fff;
    color: ${(props) => props.theme.darkGrey_C};
    box-shadow: ${(props) => props.theme.boxShadowV3};
    ${(props) =>
      !props.kindOf && `border :1px solid ${props.theme.basicTheme_C};`}
    ${(props) =>
      props.kindOf === `white` && `background ${props.theme.basicTheme_C};`}
        ${(props) =>
      props.kindOf === `white` && `color ${props.theme.white_C};`}
         ${(props) =>
      props.kindOf === `create` &&
      `border :1px solid ${props.theme.create_B_C};`}
    ${(props) =>
      props.kindOf === `check` && `border :1px solid ${props.theme.check_B_C};`}
    ${(props) =>
      props.kindOf === `update` &&
      `border :1px solid ${props.theme.update_B_C};`}
    ${(props) =>
      props.kindOf === `delete` &&
      `border :1px solid ${props.theme.delete_B_C};`}
  }
`;

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////SubTitle////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export const CommonSubTitle = styled.h2`
  width: ${(props) => props.width};
  display: ${(props) => props.display};
  position: relative;
  margin: ${(props) => props.margin || ` 30px 0 50px`};
  padding-bottom: ${(props) => props.paddingBottom || `40px`};
  font-size: 42px;
  font-weight: 800;
  color: ${(props) => props.color || `#F2C321`};

  @media (max-width: 800px) {
    font-size: 30px;
  }
  @media (max-width: 500px) {
    font-size: 25px;
  }
`;

export const SubjectTitle = styled.h3`
  font-size: ${(props) => props.fontSize || `24px`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  position: relative;
  margin-top: ${(props) => props.marginTop};
  margin: ${(props) => props.margin || ` 30px 0 50px`};

  @media (max-width: 800px) {
    font-size: 22px;
  }
  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

export const SubjectText = styled.h4`
  width: ${(props) => props.width};
  position: relative;
  margin: 0px 0 30px;
  padding-bottom: 40px;
  font-size: 42px;
  color: ${(props) => props.color};

  @media (max-width: 800px) {
    font-size: 35px;
  }
  @media (max-width: 500px) {
    font-size: 30px;
  }
`;

export const SubTitle = styled.h2`
  width: 100%;
  text-align: center;
  font-size: ${(props) => props.fontSize || `45px`};
  font-weight: ${(props) => props.fontWeight || `700`};
  line-height: ${(props) => props.lineHeight || `1.6`};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin || `20px 0px 100px`};
  padding: ${(props) => props.padding};
  background: ${(props) => props.bgColor};
  background: -moz-linear-gradient(127deg, #0b0b0b 0%, #ddd 100%);
  background: -webkit-linear-gradient(127deg, #0b0b0b 0%, #ddd 100%);
  background: linear-gradient(127deg, #0b0b0b 0%, #ddd 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  @media (max-width: 800px) {
    font-size: 30px;
  }
  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

export const MapTitle = styled.h3`
  width: 100%;
  font-size: ${(props) => props.fontSize || `26px`};
  line-height: 1.1em;
  font-weight: 600;
  padding-bottom: 10px;
  color: ${(props) => props.color};
  margin-bottom: 30px;
  position: relative;
  margin-top: ${(props) => props.marginTop || `0px`};

  &:before {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 35px;
    height: 100%;
    border-bottom: 6px solid ${(props) => props.theme.lightBasicTheme_c};
  }

  @media (max-width: 800px) {
    font-size: 16px;
  }
  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////Table////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

/** Props List **
 * width            : width [required]
 * ju               : justify-content
 *  */

export const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0 50px;
  padding: 0px 0 50px;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const TableHead = styled.ul`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(props) => props.shadow || `3px 3px 3px #eee`};
  margin: ${(props) => props.margin || `0px 0px 10px 0px`};
  border-bottom: ${(props) => props.borderBottom || ``};
  border-top: ${(props) => props.borderTop || ``};
  border-radius: ${(props) => props.radius || `5px`};
  background: #393939;
  color: #fff;
`;

export const TableHeadLIST = styled.li`
  width: ${(props) => props.width};
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => props.ju || `center`};
`;

export const TableBody = styled.ul`
  width: 100%;
  height: ${(props) => props.height || `35px`};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

export const TableBodyLIST = styled.li`
  width: ${(props) => props.width};
  height: ${(props) => props.height || `100%`};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => props.ju || `center`};
`;

export const MobileTableWrapper = styled.div`
  width: ${(props) => props.width || `100%`};
  padding: 10px;
  border: 1px solid ${(props) => props.theme.basicTheme_C};
  margin-bottom: 5px;
  border-radius: 10px;
  transition: 0.5s;

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadowV3};
  }

  &:nth-child(2n) {
    background: #f4f4f4;
  }
`;

export const MobileTable = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  display: none;

  @media (max-width: 700px) {
    display: block;
  }
`;

export const PagenationWrapper = styled.div`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
  border-radius: ${(props) => props.radius};
  box-shadow: ${(props) => props.shadow};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin || `20px 0px 0px`};
  padding: ${(props) => props.padding};
`;

export const Pagenation = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  cursor: pointer;
  padding-top: 3px;
  margin: 0 3px;
  border: 1px solid #dedede;

  &.active {
    background-color: ${(props) => props.theme.basicTheme_C};
    color: ${(props) => props.theme.white_C};
    box-shadow: 0px 10px 15px rgba(220, 220, 220, 0.5);
  }
`;

export const PagenationBtn = styled.div`
  text-align: center;
  font-size: 18px;
  width: 30px;
  height: 30px;
  color: ${(props) => props.color || `#eee`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0px 3px;
  border: 1px solid #dedede;

  &:first-child,
  &:last-child {
    background-color: #f4f4f4;
    color: #575757;
  }

  &:hover {
    box-shadow: 0px 10px 15px rgba(220, 220, 220, 0.5);
  }
`;

export const EmptyList = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////Text////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export const Text = styled.p`
  overflow: ${(props) => props.overflow};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.dr};
  align-items: ${(props) => props.al};
  justify-content: ${(props) => props.ju};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight || `500`};
  line-height: ${(props) => props.lineHeight || `1.6`};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign};
  transition: 0.5s;
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  font-style: ${(props) => props.fontStyle};
  cursor: ${(props) => props.cursor};
  z-index: 1;
  white-space: pre-wrap;

  ${(props) =>
    props.isEllipsis &&
    `white-space: nowrap;
     overflow: hidden; 
     text-overflow: ellipsis;
     display: block;
  `}

  & svg {
    color: ${(props) => props.color};
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
    margin-right: ${(props) => props.marginRight};
    font-size: ${(props) => props.fontSize || `18px`};
    @media (max-width: 900px) {
      font-size: 18px;
    }
    @media (max-width: 800px) {
      font-size: 16px;
    }
    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  & span {
    font-weight: 700;
  }

  @media (max-width: 800px) {
    font-size: 15px;
  }
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;

export const ColorText = styled.span`
  width: ${(props) => props.width || `100%`};
  font-size: ${(props) => props.fontSize || `18px`};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight || `1.6`};
  color: ${(props) => props.color || `${props.theme.adt_B_C}`};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign || `center`};
  -webkit-text-fill-color: ${(props) => props.textFill};
  -webkit-background-clip: ${(props) => props.bgClip};
  @media (max-width: 1000px) {
    font-size: 20px;
  }
  // @media (max-width: 500px) {
  //   font-size: 14px;
  // }
`;

export const ClampText = styled.p`
  width: ${(props) => props.width};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight || `500`};
  line-height: ${(props) => props.lineHeight || `1.6`};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign};
  transition: 0.5s;
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  font-style: ${(props) => props.fontStyle};
  cursor: ${(props) => props.cursor};

  z-index: 1;

  overflow: hidden;
  white-space: normal;
  line-height: 1.6;
  height: ${(props) => props.clamp * 1.6}em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.clamp};
  -webkit-box-orient: vertical;

  & svg {
    color: ${(props) => props.color};
    margin-top: ${(props) => props.marginTop};
    margin-bottom: ${(props) => props.marginBottom};
    margin-right: ${(props) => props.marginRight};
    font-size: ${(props) => props.fontSize || `18px`};
    @media (max-width: 900px) {
      font-size: 18px;
    }
    @media (max-width: 800px) {
      font-size: 16px;
    }
    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  & span {
    word-break: break-all;
    font-weight: 700;
  }

  &:hover {
    background: ${(props) => (props.isBgColorHover ? `#fad390` : ``)};
    font-weight: ${(props) => (props.isHover ? `800` : ``)};
  }

  @media (max-width: 800px) {
    font-size: 16px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

export const SpanText = styled.span`
  width: ${(props) => props.width};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight || `500`};
  line-height: ${(props) => props.lineHeight};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.dr};
  align-items: ${(props) => props.al};
  justify-content: ${(props) => props.ju};
  background: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign};
  transition: 0.5s;
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  font-style: ${(props) => props.fontStyle};
  cursor: ${(props) => props.cursor};
  z-index: 1;
  border: ${(props) => props.border};

  @media (max-width: 700px) {
    font-size: ${(props) => props.mediaFontSize || `20px`};
  }
`;

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////Image////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export const Image = styled.img`
  display: ${(props) => props.display};
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `auto`};
  margin: ${(props) => props.margin};
  border: ${(props) => props.border};
  object-fit: ${(props) => props.objectFit || `cover`};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  box-shadow: ${(props) => props.boxShadow};
  border-radius: ${(props) => props.radius};
  z-index: ${(props) => props.zIndex};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  transition: 0.3s;
  transform: ${(props) => props.transfrom};
  -webkit-transform: ${(props) => props.transfrom};

  filter: ${(props) => (props.isFilter ? `brightness(30%) opacity(0.4)` : ` `)};

  &:hover {
    filter: ${(props) => (props.isHover ? `brightness(100%) opacity(1)` : ` `)};
  }
`;

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////Product////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

export const ProductDesc = styled.h5`
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  transition: 0.5s;
  line-height: 150%;
  opacity: 0;
  cursor: pointer;
  visibility: hidden;

  & svg {
    font-size: 50px;
  }

  @media (max-width: 900px) {
    width: 200px !important;
  }

  @media (max-width: 500px) {
    width: 170px !important;
  }
`;

export const ProductTitle = styled.div`
  width: 300px;
  color: #0b0b0b;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  color: #666;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    font-weight: 800;
    box-shadow: 0px 5px 10px #eee;
  }

  @media (max-width: 900px) {
    width: 200px !important;
  }

  @media (max-width: 500px) {
    width: 170px !important;
  }
`;

export const Product = styled.div`
  position: relative;
  width: 300px !important;
  height: 250px;
  margin: ${(props) => props.margin || `20px 18px 0 18px`};
  transition: 0.5s;
  overflow: hidden;

  & img {
    width: 300px !important;
    height: 200px;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover ${ProductDesc} {
    opacity: 1;
    visibility: visible;
    transition: 0.5s;
  }

  @media (max-width: 1350px) {
    margin: ${(props) => props.margin || `20px 32px 0 32px`};
  }

  @media (max-width: 1100px) {
    margin: ${(props) => props.margin || `20px 75px 0 75px`};
  }

  @media (max-width: 900px) {
    margin: ${(props) => props.margin || `20px 15px 0 15px`};
    width: 200px !important;
    height: 187px;

    & img {
      width: 200px !important;
      height: 133px;
    }
  }

  @media (max-width: 660px) {
    margin: ${(props) => props.margin || `20px 25px 0`};
  }

  @media (max-width: 500px) {
    margin: ${(props) => props.margin || `20px 3px 0`};
    width: 170px !important;
    height: 167px;

    & img {
      width: 170px !important;
      height: 127px;
    }
  }
`;

export const SoldOut = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 800;
  z-index: 10;

  @media (max-width: 900px) {
    top: -10px;
    font-size: 16px;
  }
`;

export const SoldOutText = styled.div`
  border: 5px solid ${(props) => props.theme.basicTheme_C};
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
  padding: 6px 20px;
  transform: rotate(-15deg);
`;

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
