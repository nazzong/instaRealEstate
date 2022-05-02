import React from "react";
import {
  CommonButton,
  TableHeadColumn,
  TableWrapper,
  WholeWrapper,
  Wrapper,
  TextInput,
  InfoText,
  Textarea,
  FileInput,
} from "../../../../Components/AdminCommonComponents";
import {
  Text,
  SpanText,
  UlWrapper,
  LiWrapper,
  Combo,
  ComboOption,
} from "../../../../Components/CommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Editor from "../../../../Components/editor/Editor.jsx";
import { areaCalculation, areaCalculation2 } from "../../../../commonUtils";
import PostCode from "../../../../Components/postCode/PostCode";
import { AiOutlineClose } from "react-icons/ai";
import { FileDrop } from "react-file-drop";
import { KakaoMap, Marker } from "react-full-kakao-maps";
import axios from "axios";
import { BiMapPin } from "react-icons/bi";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const tabs = ["매물 등록"];

const useStyles = makeStyles({
  checkboxRoot: {
    padding: `0`,
  },
});

const TypeTabWrapper = styled(UlWrapper)`
  box-shadow: 2px 2px 4px #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

const TypeTab = styled(LiWrapper)`
  padding: 5px 0;
  height: 45px;
  line-height: 50px;
  background: ${(props) => (props.isActive ? Theme.basicTheme_C : `#bbbbbb`)};
  color: ${(props) => (props.isActive ? Theme.white_C : Theme.white_C)};
  cursor: pointer;
  border-left: 1px solid #a2a2a2;
  font-size: 17px;

  &:first-child {
    border-left: none;
  }
`;

const Section = styled(Wrapper)`
  margin: 40px 0 10px;
  border: 1px solid #e0e0e0;
  box-shadow: 2px 2px 5px #eee;
`;

const SectionHead = styled(Wrapper)`
  padding: 18px 10px 15px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 17px;
  color: ${(props) => props.theme.subBlack_C};
  background: #f9f9f9;
`;

const SectionBody = styled(Wrapper)``;

const SectionList = styled(UlWrapper)`
  flex-direction: row;
  align-items: normal;
  border-bottom: 1px solid #e0e0e0;
`;

const SectionListItem = styled(LiWrapper)`
  padding: 15px 10px;
  font-size: 15px;
  color: ${(props) => props.theme.subBlack_C};
  background: ${(props) =>
    props.isBackground ? `#f5f5f5` : props.theme.white_C};
  flex-wrap: wrap;
  line-height: 150%;
`;

const SelectBox = styled(UlWrapper)`
  flex-direction: row;
  width: auto;
`;

const SelectBoxItem = styled(LiWrapper)`
  padding: 12px 20px 10px;
  margin: 0 4px;
  border: 1px solid #dedede;
  font-size: 15px;
  color: ${(props) =>
    props.isActive ? props.theme.white_C : props.theme.subBlack_C};
  background: ${(props) =>
    props.isActive ? props.theme.basicTheme_C : props.theme.white_C};
  cursor: pointer;
`;

const CategoryItem = styled(Wrapper)`
  flex-direction: row;
  padding: 8px 10px 8px 15px;
  margin: 5px 0;
  box-shadow: 2px 2px 5px ${Theme.basicTheme_C};
  border: 1px solid ${Theme.basicTheme_C};
  border-radius: 4px;

  & svg {
    margin-left: 5px;
  }
`;

const defaultImage = `http://placehold.it/300x250`;

const ThumbnailBox = styled(Wrapper)`
  width: 300px;
  height: 250px;
  box-shadow: 2px 2px 5px #eee;
  border: 1px solid #eee;

  background-image: url("${(props) => props.bgImg || defaultImage}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

const FileArea = styled(Wrapper)`
  & > span {
    width: 100%;
  }

  & .ant-upload-list {
    display: none;
  }
`;

export default ({
  thumbnailRef,
  fileDropRef,
  //
  currentTab,
  setCurrentTab,
  currentSubTab,
  setCurrentSubTab,
  currentKey,
  currentData,
  isLoading,
  isPostCode,
  setIsPostCode,
  openDialog,
  //
  inputProductType,
  inputBuildingType,
  inputBuildingUse,
  inputAddress,
  inputRoadAddress,
  inputDetailAddress,
  inputSubwayTime,
  inputSubwayTime2,
  inputSubwayCarTime,
  inputSubwayCarTime2,
  inputSubwayName,
  inputSubwayName2,
  inputViewAddress,
  inputAddressLat,
  inputAddressLng,
  inputPriceType,
  inputPrice1,
  inputPriceUnit1,
  inputPrice2,
  inputPriceUnit2,
  inputPriceCheck,
  inputIsManagementFee,
  inputManagementFee,
  inputManagementFeeUnit,
  inputIsRightFee,
  inputRightFee,
  inputRightFeeUnit,
  inputPyeongPrice,
  inputPyeongPriceUnit,
  inputTotalFloor,
  inputFloor,
  inputFloorCheck,
  inputRealArea,
  inputContractArea,
  inputContractArea2,
  inputDedicatedArea,
  inputDedicatedArea2,
  inputGroundArea,
  inputGroundArea2,
  inputIsParking,
  inputParkingNumber,
  inputTotalParkingNumber,
  inputParkType1,
  inputParkType2,
  inputIsElevator,
  inputElevatorNumber,
  inputIsHeating,
  inputHeatingType,
  inputMoveInDate,
  inputMoveInDateText,
  inputEntranceDirection,
  inputUseApprovalDate1,
  inputUseApprovalDate2,
  inputUseApprovalDate3,
  inputRestroom,
  inputUsage,
  inputRoomNumber,
  inputIsCeiling,
  inputTitle,
  inputDescription,
  inputListTitle,
  inputListSubTitle,
  inputAdditionalContent,
  inputContent,
  inputPrivateAddress,
  inputPrivateTel,
  inputPrivateTel2,
  inputMemo,
  inputPrivateRemark,
  inputThumbnailPath,
  inputDetailImagePaths,
  inputCategoryNameList,
  inputImageSort,
  //
  subMenuDatum,
  //
  fileChangeHandler,
  fileChangeHandler2,
  fileDropHandler,
  removeDetailImageHandler,
  changeCategoryHandler,
  removeCategoryHandler,
  createProductHandler,
  updateProductHandler,
  dialogToggle,
  updateDetailImageSortHandler,
}) => {
  const classes = useStyles();

  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="매물 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      {currentTab === 0 && (
        <Wrapper>
          <TypeTabWrapper dr={`row`}>
            <TypeTab
              width={`33.3%`}
              isActive={currentSubTab === 0}
              onClick={() => setCurrentSubTab(0)}
            >
              주택
            </TypeTab>
            <TypeTab
              width={`33.3%`}
              isActive={currentSubTab === 1}
              onClick={() => setCurrentSubTab(1)}
            >
              사무실
            </TypeTab>
            <TypeTab
              width={`33.3%`}
              isActive={currentSubTab === 2}
              onClick={() => setCurrentSubTab(2)}
            >
              상가
            </TypeTab>
          </TypeTabWrapper>

          <Section>
            <SectionHead>매물 종류</SectionHead>

            <SectionBody>
              {currentSubTab === 0 && (
                <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    종류 선택
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <SelectBox>
                      <SelectBoxItem
                        isActive={inputProductType.value === "원룸"}
                        onClick={() => inputProductType.setValue("원룸")}
                      >
                        원룸
                      </SelectBoxItem>
                      <SelectBoxItem
                        isActive={inputProductType.value === "투룸"}
                        onClick={() => inputProductType.setValue("투룸")}
                      >
                        투룸
                      </SelectBoxItem>
                      <SelectBoxItem
                        isActive={inputProductType.value === "쓰리룸"}
                        onClick={() => inputProductType.setValue("쓰리룸")}
                      >
                        쓰리룸
                      </SelectBoxItem>
                      <SelectBoxItem
                        isActive={inputProductType.value === "오피스텔"}
                        onClick={() => inputProductType.setValue("오피스텔")}
                      >
                        오피스텔
                      </SelectBoxItem>
                      <SelectBoxItem
                        isActive={inputProductType.value === "아파트"}
                        onClick={() => inputProductType.setValue("아파트")}
                      >
                        아파트
                      </SelectBoxItem>
                    </SelectBox>
                  </SectionListItem>
                </SectionList>
              )}

              {currentSubTab === 1 && (
                <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    종류 선택
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <SelectBox>
                      <SelectBoxItem
                        isActive={inputProductType.value === "사무실"}
                        onClick={() => inputProductType.setValue("사무실")}
                      >
                        사무실
                      </SelectBoxItem>
                    </SelectBox>
                  </SectionListItem>
                </SectionList>
              )}

              {currentSubTab === 2 && (
                <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    종류 선택
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <SelectBox>
                      <SelectBoxItem
                        isActive={inputProductType.value === "상가"}
                        onClick={() => inputProductType.setValue("상가")}
                      >
                        상가
                      </SelectBoxItem>
                    </SelectBox>
                  </SectionListItem>
                </SectionList>
              )}

              {currentSubTab === 0 && (
                <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    건물 유형
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <SelectBox>
                      <SelectBoxItem
                        isActive={inputBuildingType.value === "단독주택"}
                        onClick={() => inputBuildingType.setValue("단독주택")}
                      >
                        단독주택
                      </SelectBoxItem>
                      <SelectBoxItem
                        isActive={inputBuildingType.value === "다가구주택"}
                        onClick={() => inputBuildingType.setValue("다가구주택")}
                      >
                        다가구주택
                      </SelectBoxItem>
                      <SelectBoxItem
                        isActive={
                          inputBuildingType.value === "빌라/연립/다세대"
                        }
                        onClick={() =>
                          inputBuildingType.setValue("빌라/연립/다세대")
                        }
                      >
                        빌라/연립/다세대
                      </SelectBoxItem>
                      <SelectBoxItem
                        isActive={inputBuildingType.value === "상가주택"}
                        onClick={() => inputBuildingType.setValue("상가주택")}
                      >
                        상가주택
                      </SelectBoxItem>
                    </SelectBox>
                  </SectionListItem>
                </SectionList>
              )}

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  건물 형태
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <SelectBox>
                    <SelectBoxItem
                      isActive={inputBuildingUse.value === "빌딩형"}
                      onClick={() => inputBuildingUse.setValue("빌딩형")}
                    >
                      빌딩형
                    </SelectBoxItem>
                    <SelectBoxItem
                      isActive={inputBuildingUse.value === "주택형"}
                      onClick={() => inputBuildingUse.setValue("주택형")}
                    >
                      주택형
                    </SelectBoxItem>
                    <SelectBoxItem
                      isActive={inputBuildingUse.value === "공장형"}
                      onClick={() => inputBuildingUse.setValue("공장형")}
                    >
                      공장형
                    </SelectBoxItem>
                  </SelectBox>
                </SectionListItem>
              </SectionList>
            </SectionBody>
          </Section>

          <Section>
            <SectionHead>위치 정보</SectionHead>

            <SectionBody>
              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  주소
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <UlWrapper
                    width={`auto`}
                    al={`flex-start`}
                    padding={`0 0 0 10px`}
                    margin={`20px 0`}
                  >
                    <LiWrapper dr={`row`} margin={`5px 0`}>
                      <InfoText width={`100px`}>주소</InfoText>
                      <TextInput width={`300px`} {...inputAddress} readOnly />
                      <CommonButton
                        margin={`0 0 0 10px`}
                        kindOf={`update`}
                        onClick={() => setIsPostCode(true)}
                      >
                        검색
                      </CommonButton>
                    </LiWrapper>

                    <LiWrapper dr={`row`} margin={`5px 0`}>
                      <InfoText width={`100px`}>도로명 주소</InfoText>
                      <TextInput
                        width={`410px`}
                        {...inputRoadAddress}
                        readOnly
                      />
                    </LiWrapper>

                    <LiWrapper dr={`row`} margin={`5px 0`}>
                      <InfoText width={`100px`}>역</InfoText>
                      <TextInput
                        width={`100px`}
                        margin={`0 10px 0 0`}
                        textAlign={`right`}
                        {...inputSubwayName}
                      />
                    </LiWrapper>

                    <LiWrapper dr={`row`} margin={`5px 0`}>
                      <InfoText width={`100px`}>도보</InfoText>
                      <TextInput
                        width={`100px`}
                        margin={`0 10px 0 0`}
                        textAlign={`right`}
                        {...inputSubwayTime}
                      />
                      <InfoText>분</InfoText>
                    </LiWrapper>

                    <LiWrapper dr={`row`} margin={`5px 0`}>
                      <InfoText width={`100px`}>차량</InfoText>
                      <TextInput
                        width={`100px`}
                        margin={`0 10px 0 0`}
                        textAlign={`right`}
                        {...inputSubwayCarTime}
                      />
                      <InfoText>분</InfoText>
                    </LiWrapper>

                    <LiWrapper dr={`row`} margin={`5px 0`}>
                      <InfoText width={`100px`}>역 2</InfoText>
                      <TextInput
                        width={`100px`}
                        margin={`0 10px 0 0`}
                        textAlign={`right`}
                        {...inputSubwayName2}
                      />
                    </LiWrapper>

                    <LiWrapper dr={`row`} margin={`5px 0`}>
                      <InfoText width={`100px`}>도보 2</InfoText>
                      <TextInput
                        width={`100px`}
                        margin={`0 10px 0 0`}
                        textAlign={`right`}
                        {...inputSubwayTime2}
                      />
                      <InfoText>분</InfoText>
                    </LiWrapper>

                    <LiWrapper dr={`row`} margin={`5px 0`}>
                      <InfoText width={`100px`}>차량 2</InfoText>
                      <TextInput
                        width={`100px`}
                        margin={`0 10px 0 0`}
                        textAlign={`right`}
                        {...inputSubwayCarTime2}
                      />
                      <InfoText>분</InfoText>
                    </LiWrapper>

                    {/* <LiWrapper dr={`row`} margin={`5px 0`}>
                      <InfoText width={`70px`}>상세주소</InfoText>
                      <TextInput width={`500px`} {...inputDetailAddress} />
                    </LiWrapper>

                    <LiWrapper dr={`row`} margin={`5px 0`}>
                      <InfoText width={`70px`}>소재지</InfoText>
                      <TextInput width={`200px`} {...inputViewAddress} />
                    </LiWrapper> */}
                  </UlWrapper>

                  <Wrapper width={`auto`} margin={`0 20px 0 80px`}>
                    {inputAddressLat.value && inputAddressLng.value ? (
                      <KakaoMap
                        apiUrl={`//dapi.kakao.com/v2/maps/sdk.js?appkey=4636f8ed837d49004d53e6b5b83f2c55&autoload=false`}
                        width="400px"
                        height="300px"
                        level={4}
                        lat={inputAddressLat.value}
                        lng={inputAddressLng.value}
                        draggable
                        scrollwheel
                        doubleClick
                        doubleClickZoom
                      >
                        <Marker
                          lat={inputAddressLat.value}
                          lng={inputAddressLng.value}
                        ></Marker>
                      </KakaoMap>
                    ) : (
                      <Wrapper
                        width={`400px`}
                        height={`300px`}
                        bgColor={`#f3f3f3`}
                        color={`#9f9f9f`}
                        textAlign={`center`}
                        lineHeight={`150%`}
                        size={`17px`}
                      >
                        <BiMapPin size={60} color={`#9f9f9f`} />
                        <br />
                        주소 검색을 하면
                        <br />
                        해당 위치가 지도에 노출됩니다.
                      </Wrapper>
                    )}
                  </Wrapper>
                </SectionListItem>
              </SectionList>
            </SectionBody>
          </Section>

          <Section>
            <SectionHead>기본 정보</SectionHead>

            <SectionBody>
              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  유형
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <SelectBox>
                    <SelectBoxItem
                      isActive={inputPriceType.value === "월세"}
                      onClick={() => {
                        inputPriceType.setValue("월세");
                        inputPrice1.setValue("");
                        inputPriceUnit1.setValue("만");
                        inputPrice2.setValue("");
                        inputPriceUnit2.setValue("만");
                        inputPriceCheck.setValue(false);
                      }}
                    >
                      월세
                    </SelectBoxItem>
                    <SelectBoxItem
                      isActive={inputPriceType.value === "전세"}
                      onClick={() => {
                        inputPriceType.setValue("전세");
                        inputPrice1.setValue("");
                        inputPriceUnit1.setValue("만");
                        inputPrice2.setValue("");
                        inputPriceUnit2.setValue("");
                        inputPriceCheck.setValue(false);
                      }}
                    >
                      전세
                    </SelectBoxItem>
                    <SelectBoxItem
                      isActive={inputPriceType.value === "매매"}
                      onClick={() => {
                        inputPriceType.setValue("매매");
                        inputPrice1.setValue("");
                        inputPriceUnit1.setValue("억");
                        inputPrice2.setValue("");
                        inputPriceUnit2.setValue("");
                        inputPriceCheck.setValue(false);
                      }}
                    >
                      매매
                    </SelectBoxItem>
                  </SelectBox>
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  금액
                </SectionListItem>

                <SectionListItem width={`calc(100% - 160px)`}>
                  {inputPriceType.value === "월세" && (
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <TextInput
                        width={`80px`}
                        placeholder="보증금"
                        {...inputPrice1}
                      />
                      <TextInput
                        margin={`0 5px`}
                        width={`50px`}
                        placeholder="단위"
                        {...inputPriceUnit1}
                        readOnly={true}
                      />
                      <SpanText padding={`0 10px 0 5px`}>/</SpanText>
                      <TextInput
                        width={`80px`}
                        placeholder="월세"
                        {...inputPrice2}
                      />
                      <TextInput
                        margin={`0 20px 0 5px`}
                        width={`50px`}
                        placeholder="단위"
                        {...inputPriceUnit2}
                        readOnly={true}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            classes={{ root: classes.checkboxRoot }}
                            checked={inputPriceCheck.value}
                            onChange={(e) =>
                              inputPriceCheck.setValue(e.target.checked)
                            }
                          />
                        }
                        label="협의가능"
                      />
                    </Wrapper>
                  )}

                  {inputPriceType.value === "전세" && (
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <TextInput
                        width={`80px`}
                        placeholder="전세금"
                        {...inputPrice1}
                      />
                      <TextInput
                        margin={`0 20px 0 5px`}
                        width={`50px`}
                        placeholder="단위"
                        {...inputPriceUnit1}
                        readOnly={true}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            classes={{ root: classes.checkboxRoot }}
                            checked={inputPriceCheck.value}
                            onChange={(e) =>
                              inputPriceCheck.setValue(e.target.checked)
                            }
                          />
                        }
                        label="협의가능"
                      />
                    </Wrapper>
                  )}

                  {inputPriceType.value === "매매" && (
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <TextInput
                        width={`80px`}
                        placeholder="평당매매가"
                        {...inputPyeongPrice}
                      />
                      <TextInput
                        margin={`0 5px`}
                        width={`50px`}
                        placeholder="단위"
                        {...inputPyeongPriceUnit}
                        readOnly={true}
                      />
                      <SpanText padding={`0 10px 0 5px`}>/</SpanText>
                      <TextInput
                        width={`80px`}
                        placeholder="매매가"
                        {...inputPrice1}
                      />
                      <TextInput
                        margin={`0 20px 0 5px`}
                        width={`50px`}
                        placeholder="단위"
                        {...inputPriceUnit1}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            classes={{ root: classes.checkboxRoot }}
                            checked={inputPriceCheck.value}
                            onChange={(e) =>
                              inputPriceCheck.setValue(e.target.checked)
                            }
                          />
                        }
                        co
                        label="협의가능"
                      />
                    </Wrapper>
                  )}
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  관리비
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <TextInput
                    width={`80px`}
                    placeholder="관리비"
                    {...inputManagementFee}
                    readOnly={!inputIsManagementFee.value}
                  />
                  <TextInput
                    margin={`0 20px 0 5px`}
                    width={`50px`}
                    placeholder="단위"
                    {...inputManagementFeeUnit}
                    // readOnly={!inputIsManagementFee.value}
                    readOnly={true}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        classes={{ root: classes.checkboxRoot }}
                        checked={!inputIsManagementFee.value}
                        onChange={(e) => {
                          inputIsManagementFee.setValue(!e.target.checked);
                          inputManagementFee.setValue("");
                          inputManagementFeeUnit.setValue(
                            e.target.checked ? "" : "만"
                          );
                        }}
                      />
                    }
                    label="없음"
                  />
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  권리금
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <TextInput
                    width={`80px`}
                    placeholder="권리금"
                    {...inputRightFee}
                    readOnly={!inputIsRightFee.value}
                  />
                  <TextInput
                    margin={`0 20px 0 5px`}
                    width={`50px`}
                    placeholder="단위"
                    {...inputRightFeeUnit}
                    // readOnly={!inputIsRightFee.value}
                    readOnly={true}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        classes={{ root: classes.checkboxRoot }}
                        checked={!inputIsRightFee.value}
                        onChange={(e) => {
                          inputIsRightFee.setValue(!e.target.checked);
                          inputRightFee.setValue("");
                          inputRightFeeUnit.setValue(
                            e.target.checked ? "" : "만"
                          );
                        }}
                      />
                    }
                    label="없음"
                  />
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  층수
                </SectionListItem>

                <SectionListItem width={`calc(100% - 160px)`}>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <InfoText width={`70px`}>
                      {inputPriceType.value === `매매`
                        ? `지하 층수`
                        : `전체 층수`}
                    </InfoText>
                    <TextInput
                      width={`150px`}
                      textAlign={`right`}
                      {...inputTotalFloor}
                      maxLength={`3`}
                    />
                    <SpanText padding={`0 5px`}>층</SpanText>
                  </Wrapper>

                  <Wrapper dr={`row`} ju={`flex-start`} margin={`10px 0 0`}>
                    <InfoText width={`70px`}>
                      {inputPriceType.value === `매매`
                        ? `지상 층수`
                        : `해당 층수`}
                    </InfoText>
                    <TextInput
                      width={`150px`}
                      textAlign={`right`}
                      {...inputFloor}
                      maxLength={`3`}
                      onChange={(e) => {
                        inputFloor.setValue(e.target.value);
                        inputFloorCheck.setValue("");
                      }}
                    />
                    <SpanText padding={`0 5px`}>층</SpanText>

                    {inputPriceType.value !== `매매` && (
                      <Wrapper width={`auto`} margin={`0 5px 0 20px`}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              classes={{ root: classes.checkboxRoot }}
                              value="복층"
                              checked={inputFloorCheck.value === "복층"}
                              onChange={(e) => {
                                inputFloorCheck.setValue(e.target.value);
                                inputFloor.setValue("");
                              }}
                            />
                          }
                          label="복층"
                        />
                      </Wrapper>
                    )}

                    {inputPriceType.value !== `매매` && (
                      <Wrapper width={`auto`} margin={`0 5px`}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              classes={{ root: classes.checkboxRoot }}
                              value="건물전체"
                              checked={inputFloorCheck.value === "건물전체"}
                              onChange={(e) => {
                                inputFloorCheck.setValue(e.target.value);
                                inputFloor.setValue("");
                              }}
                            />
                          }
                          label="건물전체"
                        />
                      </Wrapper>
                    )}

                    {/* <Wrapper width={`auto`} margin={`0 5px`}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            classes={{ root: classes.checkboxRoot }}
                            value="없음"
                            checked={inputFloorCheck.value === "없음"}
                            onChange={(e) => {
                              inputFloorCheck.setValue(e.target.value);
                              inputFloor.setValue("");
                            }}
                          />
                        }
                        label="없음"
                      /> 
                    </Wrapper>
                    */}
                  </Wrapper>
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  평수
                </SectionListItem>

                <SectionListItem width={`calc(100% - 160px)`}>
                  {/* <Wrapper dr={`row`} ju={`flex-start`}>
                    <InfoText width={`70px`}>실면적</InfoText>
                    <TextInput
                      width={`150px`}
                      textAlign={`right`}
                      {...inputRealArea}
                    />
                    <SpanText padding={`0 5px`}>
                      ㎡&nbsp;
                      {inputRealArea.value &&
                        `(${areaCalculation2(inputRealArea.value)}평)`}
                    </SpanText>
                  </Wrapper> */}

                  <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 10px`}>
                    <InfoText width={`70px`}>공급면적</InfoText>
                    <TextInput
                      width={`150px`}
                      textAlign={`right`}
                      {...inputDedicatedArea}
                      onChange={(e) => {
                        inputDedicatedArea.setValue(e.target.value);
                        inputDedicatedArea2.setValue(
                          areaCalculation2(e.target.value)
                        );
                      }}
                    />
                    <SpanText padding={`0 5px`}>㎡&nbsp;</SpanText>

                    <TextInput
                      width={`150px`}
                      textAlign={`right`}
                      {...inputDedicatedArea2}
                      onChange={(e) => {
                        inputDedicatedArea2.setValue(e.target.value);
                        inputDedicatedArea.setValue(
                          areaCalculation(e.target.value)
                        );
                      }}
                    />
                    <SpanText padding={`0 5px`}>평&nbsp;</SpanText>
                  </Wrapper>

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <InfoText width={`70px`}>전용면적</InfoText>
                    <TextInput
                      width={`150px`}
                      textAlign={`right`}
                      {...inputContractArea}
                      onChange={(e) => {
                        inputContractArea.setValue(e.target.value);
                        inputContractArea2.setValue(
                          areaCalculation2(e.target.value)
                        );
                      }}
                    />
                    <SpanText padding={`0 5px`}>㎡&nbsp;</SpanText>

                    <TextInput
                      width={`150px`}
                      textAlign={`right`}
                      {...inputContractArea2}
                      onChange={(e) => {
                        inputContractArea2.setValue(e.target.value);
                        inputContractArea.setValue(
                          areaCalculation(e.target.value)
                        );
                      }}
                    />
                    <SpanText padding={`0 5px`}>평&nbsp;</SpanText>
                  </Wrapper>

                  {inputPriceType.value === `매매` && (
                    <Wrapper dr={`row`} ju={`flex-start`} margin={`10px 0`}>
                      <InfoText width={`70px`}>대지면적</InfoText>
                      <TextInput
                        width={`150px`}
                        textAlign={`right`}
                        {...inputGroundArea}
                        onChange={(e) => {
                          inputGroundArea.setValue(e.target.value);
                          inputGroundArea2.setValue(
                            areaCalculation2(e.target.value)
                          );
                        }}
                      />
                      <SpanText padding={`0 5px`}>㎡&nbsp;</SpanText>

                      <TextInput
                        width={`150px`}
                        textAlign={`right`}
                        {...inputGroundArea2}
                        onChange={(e) => {
                          inputGroundArea2.setValue(e.target.value);
                          inputGroundArea.setValue(
                            areaCalculation(e.target.value)
                          );
                        }}
                      />
                      <SpanText padding={`0 5px`}>평&nbsp;</SpanText>
                    </Wrapper>
                  )}
                </SectionListItem>
              </SectionList>
            </SectionBody>
          </Section>

          <Section>
            <SectionHead>상세 정보</SectionHead>

            <SectionBody>
              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  주차
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <SelectBox>
                    <SelectBoxItem
                      isActive={inputIsParking.value}
                      onClick={() => inputIsParking.setValue(true)}
                    >
                      가능
                    </SelectBoxItem>
                    <SelectBoxItem
                      isActive={!inputIsParking.value}
                      onClick={() => inputIsParking.setValue(false)}
                    >
                      불가능
                    </SelectBoxItem>
                  </SelectBox>

                  <SpanText padding={`0 10px 0 5px`}>주차대수</SpanText>
                  <TextInput
                    width={`80px`}
                    textAlign={`right`}
                    {...inputParkingNumber}
                    readOnly={!inputIsParking.value}
                  />
                  <SpanText padding={`0 10px 0 5px`}>
                    대&nbsp;&nbsp;/&nbsp;&nbsp;총 주차대수
                  </SpanText>
                  <TextInput
                    width={`80px`}
                    textAlign={`right`}
                    {...inputTotalParkingNumber}
                    readOnly={!inputIsParking.value}
                  />
                  <SpanText padding={`0 10px 0 5px`}>
                    대&nbsp;&nbsp;/&nbsp;&nbsp;자주식
                  </SpanText>
                  <TextInput
                    width={`80px`}
                    textAlign={`right`}
                    {...inputParkType1}
                    readOnly={!inputIsParking.value}
                  />
                  <SpanText padding={`0 10px 0 5px`}>
                    대&nbsp;&nbsp;/&nbsp;&nbsp;기계식
                  </SpanText>
                  <TextInput
                    width={`80px`}
                    textAlign={`right`}
                    {...inputParkType2}
                    readOnly={!inputIsParking.value}
                  />
                  <SpanText padding={`0 10px 0 5px`}>대</SpanText>
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  엘리베이터
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <SelectBox>
                    <SelectBoxItem
                      isActive={inputIsElevator.value}
                      onClick={() => inputIsElevator.setValue(true)}
                    >
                      있음
                    </SelectBoxItem>
                    <SelectBoxItem
                      isActive={!inputIsElevator.value}
                      onClick={() => {
                        inputIsElevator.setValue(false);
                        inputElevatorNumber.setValue("");
                      }}
                    >
                      없음
                    </SelectBoxItem>
                  </SelectBox>

                  <TextInput
                    width={`80px`}
                    margin={`0 5px 0 10px`}
                    textAlign={`right`}
                    {...inputElevatorNumber}
                    readOnly={!inputIsElevator.value}
                  />
                  <SpanText padding={`0 10px 0 5px`}>대</SpanText>
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  냉난방기 유무
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <SelectBox>
                    <SelectBoxItem
                      isActive={inputIsHeating.value}
                      onClick={() => inputIsHeating.setValue(true)}
                    >
                      있음
                    </SelectBoxItem>
                    <SelectBoxItem
                      isActive={!inputIsHeating.value}
                      onClick={() => inputIsHeating.setValue(false)}
                    >
                      없음
                    </SelectBoxItem>
                  </SelectBox>
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  난방종류
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <Combo width={`200px`} {...inputHeatingType}>
                    {currentSubTab === 0 && (
                      <ComboOption value="도시가스바닥난방">
                        도시가스바닥난방
                      </ComboOption>
                    )}
                    <ComboOption value="개별난방">개별난방</ComboOption>
                    <ComboOption value="지역난방">지역난방</ComboOption>
                    <ComboOption value="중앙난방">중앙난방</ComboOption>
                    <ComboOption value="개별냉난방">개별냉난방</ComboOption>
                    <ComboOption value="지역냉난방">지역냉난방</ComboOption>
                    <ComboOption value="중앙냉난방">중앙냉난방</ComboOption>
                    <ComboOption value="없음">없음</ComboOption>
                  </Combo>
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  입주가능일
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <SelectBox>
                    <SelectBoxItem
                      isActive={inputMoveInDate.value === "즉시입주"}
                      onClick={() => {
                        inputMoveInDate.setValue("즉시입주");
                        inputMoveInDateText.setValue("");
                      }}
                    >
                      즉시입주
                    </SelectBoxItem>
                    <SelectBoxItem
                      isActive={inputMoveInDate.value === "협의가능"}
                      onClick={() => {
                        inputMoveInDate.setValue("협의가능");
                        inputMoveInDateText.setValue("");
                      }}
                    >
                      협의가능
                    </SelectBoxItem>
                    <SelectBoxItem
                      isActive={inputMoveInDate.value === "직접입력"}
                      onClick={() => {
                        inputMoveInDate.setValue("직접입력");
                        inputMoveInDateText.setValue("");
                      }}
                    >
                      직접입력
                    </SelectBoxItem>
                  </SelectBox>

                  <TextInput
                    width={`140px`}
                    margin={`0 5px 0 10px`}
                    {...inputMoveInDateText}
                    readOnly={inputMoveInDate.value !== "직접입력"}
                  />
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  주출입구방향
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <Combo width={`200px`} {...inputEntranceDirection}>
                    <ComboOption value="동향">동향</ComboOption>
                    <ComboOption value="서향">서향</ComboOption>
                    <ComboOption value="남향">남향</ComboOption>
                    <ComboOption value="북향">북향</ComboOption>
                    <ComboOption value="북동향">북동향</ComboOption>
                    <ComboOption value="남동향">남동향</ComboOption>
                    <ComboOption value="남서향">남서향</ComboOption>
                    <ComboOption value="북서향">북서향</ComboOption>
                  </Combo>
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  사용승인일
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <TextInput
                    width={`60px`}
                    {...inputUseApprovalDate1}
                    maxLength={`4`}
                  />
                  &nbsp;년&nbsp;
                  <TextInput
                    width={`40px`}
                    {...inputUseApprovalDate2}
                    maxLength={`2`}
                  />
                  &nbsp;월&nbsp;
                  <TextInput
                    width={`40px`}
                    {...inputUseApprovalDate3}
                    maxLength={`2`}
                  />
                  &nbsp;일
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  화장실
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <Combo width={`200px`} {...inputRestroom}>
                    <ComboOption value="외부(남여구분)">
                      외부(남여구분)
                    </ComboOption>
                    <ComboOption value="내부(남여구분)">
                      내부(남여구분)
                    </ComboOption>
                    <ComboOption value="외부(남여혼용)">
                      외부(남여혼용)
                    </ComboOption>
                    <ComboOption value="내부(남여혼용)">
                      내부(남여혼용)
                    </ComboOption>
                  </Combo>
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  건축물 용도
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <Combo width={`200px`} {...inputUsage}>
                    <ComboOption value="">용도선택</ComboOption>
                    <ComboOption value="제1종 근린생활시설">
                      제1종 근린생활시설
                    </ComboOption>
                    <ComboOption value="제2종 근린생활시설">
                      제2종 근린생활시설
                    </ComboOption>
                    <ComboOption value="문화 및 집회시설">
                      문화 및 집회시설
                    </ComboOption>
                    <ComboOption value="종교시설">종교시설</ComboOption>
                    <ComboOption value="판매시설">판매시설</ComboOption>
                    <ComboOption value="의료시설">의료시설</ComboOption>
                    <ComboOption value="교육연구시설">교육연구시설</ComboOption>
                    <ComboOption value="노유자(노인 및 어린이) 시설">
                      노유자(노인 및 어린이) 시설
                    </ComboOption>
                    <ComboOption value="수련시설">수련시설</ComboOption>
                    <ComboOption value="운동시설">운동시설</ComboOption>
                    <ComboOption value="업무시설">업무시설</ComboOption>
                    <ComboOption value="숙박시설">숙박시설</ComboOption>
                    <ComboOption value="위락시설">위락시설</ComboOption>
                    <ComboOption value="공장">공장</ComboOption>
                    <ComboOption value="창고시설">창고시설</ComboOption>
                    <ComboOption value="위험물 저장 및 처리 시설">
                      위험물 저장 및 처리 시설
                    </ComboOption>
                    <ComboOption value="자동차 관련 시설">
                      자동차 관련 시설
                    </ComboOption>
                    <ComboOption value="동물 및 식물 관련 시설">
                      동물 및 식물 관련 시설
                    </ComboOption>
                    <ComboOption value="자원순환 관련 시설">
                      자원순환 관련 시설
                    </ComboOption>
                    <ComboOption value="묘지 관련 시설">
                      묘지 관련 시설
                    </ComboOption>
                    <ComboOption value="관광 휴게시설">
                      관광 휴게시설
                    </ComboOption>
                    <ComboOption value="장례시설">장례시설</ComboOption>
                    <ComboOption value="야영장 시설">야영장 시설</ComboOption>
                    <ComboOption value="미등기건물">미등기건물</ComboOption>
                    <ComboOption value="다가구/단독주택">
                      다가구/단독주택
                    </ComboOption>
                  </Combo>
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  룸갯수
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <TextInput
                    width={`200px`}
                    textAlign={`right`}
                    {...inputRoomNumber}
                  />
                  <SpanText padding={`0 10px 0 5px`}>개</SpanText>
                </SectionListItem>
              </SectionList>

              {(currentSubTab === 1 || currentSubTab === 2) && (
                <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    노출천정유무
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <SelectBox>
                      <SelectBoxItem
                        isActive={inputIsCeiling.value}
                        onClick={() => inputIsCeiling.setValue(true)}
                      >
                        유
                      </SelectBoxItem>
                      <SelectBoxItem
                        isActive={!inputIsCeiling.value}
                        onClick={() => inputIsCeiling.setValue(false)}
                      >
                        무
                      </SelectBoxItem>
                    </SelectBox>
                  </SectionListItem>
                </SectionList>
              )}
            </SectionBody>
          </Section>

          <Section>
            <SectionHead>상세 내용</SectionHead>

            <SectionBody>
              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  카테고리
                </SectionListItem>

                <SectionListItem width={`calc(100% - 160px)`} al={`flex-start`}>
                  <Combo
                    width={`100%`}
                    value={``}
                    onChange={changeCategoryHandler}
                  >
                    <ComboOption value="">
                      ----- 카테고리를 선택해주세요. -----
                    </ComboOption>

                    {subMenuDatum &&
                      subMenuDatum.map((data) => {
                        if (!data.useYn) return null;

                        return (
                          <optgroup key={data._id} label={data.name}>
                            {data.subMenu.map((subMenu) => {
                              return (
                                <ComboOption
                                  key={subMenu._id}
                                  value={`${data._id}/${subMenu._id}`}
                                >
                                  {subMenu.name}
                                </ComboOption>
                              );
                            })}
                          </optgroup>
                        );
                      })}
                  </Combo>

                  {inputCategoryNameList.value.length > 0 && (
                    <UlWrapper width={`auto`} al={`flex-start`}>
                      {inputCategoryNameList.value.map((data, idx) => {
                        return (
                          <LiWrapper key={idx}>
                            <CategoryItem>
                              {data}
                              <AiOutlineClose
                                onClick={() => removeCategoryHandler(idx)}
                              />
                            </CategoryItem>
                          </LiWrapper>
                        );
                      })}
                    </UlWrapper>
                  )}
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  제목
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <TextInput width={`100%`} {...inputTitle} />
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  상세설명
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <Textarea
                    width={`100%`}
                    height={`200px`}
                    {...inputDescription}
                  />
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  부가제목 (목록표시)
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <TextInput width={`200px`} {...inputListTitle} />
                </SectionListItem>
              </SectionList>

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  부가설명 (목록표시)
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <TextInput width={`200px`} {...inputListSubTitle} />
                </SectionListItem>
              </SectionList>

              {currentSubTab === 0 && (
                <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    주택 추가설명
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <Editor
                      value={inputAdditionalContent.value}
                      componentHeight="h-500"
                      editorChangeHandler={(html) =>
                        inputAdditionalContent.setValue(html)
                      }
                    />
                  </SectionListItem>
                </SectionList>
              )}

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  부록
                </SectionListItem>

                <SectionListItem
                  width={`calc(100% - 160px)`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <Editor
                    value={inputContent.value}
                    componentHeight="h-500"
                    editorChangeHandler={(html) => inputContent.setValue(html)}
                  />
                </SectionListItem>
              </SectionList>
            </SectionBody>
          </Section>

          {(!currentData ||
            currentData.isOpen ||
            sessionStorage.getItem("XLJHALKJQLIUXMXA") == 1) && (
            <Section>
              <SectionHead>비공개 정보</SectionHead>

              <SectionBody>
                <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    자세한 주소 (호실)
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <TextInput width={`100%`} {...inputPrivateAddress} />
                  </SectionListItem>
                </SectionList>

                <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    임대인 전화번호
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <TextInput width={`100%`} {...inputPrivateTel} />
                  </SectionListItem>
                </SectionList>

                <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    세입자 전화번호
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <TextInput width={`100%`} {...inputPrivateTel2} />
                  </SectionListItem>
                </SectionList>

                <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    메모
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <Textarea width={`100%`} height={`200px`} {...inputMemo} />
                  </SectionListItem>
                </SectionList>

                {/* <SectionList>
                  <SectionListItem width={`160px`} isBackground={true}>
                    비고
                  </SectionListItem>

                  <SectionListItem
                    width={`calc(100% - 160px)`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <Textarea
                      width={`100%`}
                      height={`200px`}
                      {...inputPrivateRemark}
                    />
                  </SectionListItem>
                </SectionList> */}
              </SectionBody>
            </Section>
          )}

          <Section>
            <SectionHead>사진 등록</SectionHead>

            <SectionBody>
              {/* <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  썸네일
                </SectionListItem>

                <SectionListItem width={`calc(100% - 160px)`} al={`flex-start`}>
                  <ThumbnailBox bgImg={inputThumbnailPath.value}></ThumbnailBox>

                  <FileInput
                    type="file"
                    ref={thumbnailRef}
                    accept="image/jpeg,image/gif,image/png"
                    onChange={fileChangeHandler}
                  />

                  {isLoading ? (
                    <Wrapper width={`300px`} margin={`15px 0 0`}>
                      <CircularIndeterminate />
                    </Wrapper>
                  ) : (
                    <CommonButton
                      width={`300px`}
                      margin={`15px 0 0`}
                      fontSize={`15px`}
                      onClick={() => thumbnailRef.current.click()}
                    >
                      업로드
                    </CommonButton>
                  )}
                </SectionListItem>
              </SectionList> */}

              <SectionList>
                <SectionListItem width={`160px`} isBackground={true}>
                  매물 사진
                </SectionListItem>

                <SectionListItem width={`calc(100% - 160px)`}>
                  {isLoading && (
                    <Wrapper margin={`15px 0`}>
                      <CircularIndeterminate />
                    </Wrapper>
                  )}
                  <FileArea>
                    <Dragger
                      name={`file`}
                      multiple={true}
                      onDrop={fileDropHandler}
                    >
                      <Wrapper
                        padding={`40px 0`}
                        size={`18px`}
                        color={`#302b2b`}
                      >
                        이곳에 사진파일을 끌어서 놓아보세요.
                      </Wrapper>
                    </Dragger>
                  </FileArea>

                  <Wrapper
                    width={`90%`}
                    dr={`row`}
                    ju={`flex-start`}
                    al={`flex-start`}
                    wrap={`wrap`}
                  >
                    {inputDetailImagePaths.value.map((data, idx) => {
                      return (
                        <Wrapper key={idx} margin={`15px 10px`} width={`auto`}>
                          <ThumbnailBox bgImg={data} />

                          <CommonButton
                            margin={`10px 0 5px`}
                            width={`300px`}
                            onClick={(e) => dialogToggle(e, idx)}
                          >
                            순서변경
                          </CommonButton>

                          <CommonButton
                            width={`300px`}
                            onClick={() => removeDetailImageHandler(idx)}
                          >
                            삭제
                          </CommonButton>
                        </Wrapper>
                      );
                    })}
                  </Wrapper>
                </SectionListItem>
              </SectionList>
            </SectionBody>
          </Section>

          <Wrapper margin={`20px 0`}>
            {currentKey ? (
              <CommonButton
                kindOf={`update`}
                width={`180px`}
                height={`45px`}
                fontSize={`16px`}
                onClick={updateProductHandler}
              >
                변경하기
              </CommonButton>
            ) : (
              <CommonButton
                kindOf={`create`}
                width={`180px`}
                height={`45px`}
                fontSize={`16px`}
                onClick={createProductHandler}
              >
                등록하기
              </CommonButton>
            )}
          </Wrapper>
        </Wrapper>
      )}

      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={`xs`}
      >
        <DialogTitle id="alert-dialog-slide-title">순서변경</DialogTitle>
        <DialogContent>
          <Wrapper dr={`row`}>
            <TextInput
              width={`calc(100% - 100px)`}
              margin={`0 10px 0 0`}
              {...inputImageSort}
              onKeyDown={(e) =>
                e.keyCode === 13 ? updateDetailImageSortHandler() : null
              }
            />

            <CommonButton
              width={`100px`}
              onClick={updateDetailImageSortHandler}
            >
              변경
            </CommonButton>
          </Wrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dialogToggle()} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      {isPostCode && (
        <PostCode
          onCompleteHandler={async (data) => {
            inputAddress.setValue(`${data.jibunAddress}`);
            inputRoadAddress.setValue(`${data.roadAddress}`);
            inputViewAddress.setValue(`${data.bname}`);
            setIsPostCode(false);

            await axios
              .get(
                `https://dapi.kakao.com/v2/local/search/address.json?query=${data.jibunAddress}`,
                {
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: "KakaoAK 018e5247a1f33089f1a6cd8969d1c9cc",
                  },
                }
              )
              .then((response) => {
                inputAddressLng.setValue("");
                inputAddressLat.setValue("");

                setTimeout(() => {
                  inputAddressLng.setValue(response.data.documents[0].x);
                  inputAddressLat.setValue(response.data.documents[0].y);
                }, 1);
              });
          }}
        />
      )}
    </WholeWrapper>
  );
};
