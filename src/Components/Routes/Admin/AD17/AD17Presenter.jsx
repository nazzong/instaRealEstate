import React, { useMemo } from "react";
import {
  CommonButton,
  TableHeadColumn,
  TableWrapper,
  WholeWrapper,
  Wrapper,
  InfoText,
  TextInput,
  Textarea,
  Combo,
  ComboOption,
} from "../../../../Components/AdminCommonComponents";
import {
  LiWrapper,
  Text,
  UlWrapper,
  Image,
  SpanText,
} from "../../../../Components/CommonComponents";
import dynamic from "next/dynamic";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import {
  AiOutlineCheck,
  AiFillCaretUp,
  AiFillCaretDown,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { GrDocumentUser } from "react-icons/gr";
import { areaCalculation2 } from "../../../../commonUtils";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withResizeDetector } from "react-resize-detector";

const MM02 = dynamic(import("../../Client/MM02"));

const tabs = ["총 매물 리스트"];

const useStyles = makeStyles({
  checkboxRoot: {
    padding: `0`,
  },
});

const ExcelHeadColumn = styled(Wrapper)`
  display: flex;
  padding: 10px 5px;
  line-height: 150%;
  font-size: 14px;
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  text-align: center;
  cursor: pointer;
  letter-spacing: -1.2px;

  & svg {
    margin-left: 5px;
  }

  & svg:hover {
    color: inherit;
  }
`;

const ExcelImageView = styled(Wrapper)`
  position: fixed;
  left: 200px;
  bottom: 0px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: auto;
  background-color: #fff;
  box-shadow: 2px 2px 10px #eee;
  z-index: 999;
  cursor: pointer;
`;

const ExcelData = styled(Wrapper)``;

const ExcelDataOne = React.memo(
  ({
    data,
    idx,
    checkList,
    productDatum,
    setCurrentId,
    setViewImagePaths,
    changeCheckboxHandler,
    shareProductHandler,
  }) => {
    const classes = useStyles();

    return (
      <ExcelData
        key={data._id}
        isRelative={true}
        dr={`row`}
        ju={`flex-start`}
        width={`max-content`}
        borderBottom={`1px solid #dedede !important`}
        onClick={() => setCurrentId(data._id)}
        onMouseOver={() => setViewImagePaths(data.detailImagePaths.slice(0, 2))}
        onMouseOut={() => setViewImagePaths([])}
      >
        <ExcelHeadColumn width={`30px`}>
          {checkList.length !== productDatum.length && checkList[idx] ? (
            <Checkbox
              classes={{ root: classes.checkboxRoot }}
              color="default"
              onChange={changeCheckboxHandler}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Checkbox
              classes={{ root: classes.checkboxRoot }}
              color="default"
              {...checkList[idx]}
              onChange={changeCheckboxHandler}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`90px`}>{data.productNo}</ExcelHeadColumn>

        <ExcelHeadColumn width={`80px`}>
          {data.createdAt.substring(0, 10)}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`120px`}>
          {data.address.substring(
            data.address.indexOf(`구`) + 2,
            data.address.length
          )}
          {/* <br />
          [도로명주소] {data.roadAddress} */}
        </ExcelHeadColumn>

        <ExcelHeadColumn
          width={`55px`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {typeof window !== "undefined" && (
            <CopyToClipboard
              text={`${window.location.origin}/product-detail/${data._id}`}
              onCopy={shareProductHandler}
            >
              <AiOutlineShareAlt size={32} color={`#5c5c5c`} />
            </CopyToClipboard>
          )}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`50px`}>
          {data.isView ? `O` : `X`}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`50px`}>
          {data.isOpen ? `O` : `X`}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`50px`}>
          {data.isMap ? `O` : `X`}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`50px`}>
          {data.isComplete ? `O` : `X`}
        </ExcelHeadColumn>

        {/* <ExcelHeadColumn width={`140px`}>
          {data.isBest ? `O` : `X`}
        </ExcelHeadColumn> */}

        <ExcelHeadColumn width={`80px`}>{data.useApprovalDate}</ExcelHeadColumn>

        <ExcelHeadColumn width={`100px`}>
          {areaCalculation2(data.dedicatedArea)}평 /&nbsp;
          {areaCalculation2(data.contractArea)}평
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`90px`}>
          {data.floor} / {data.totalFloor}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`80px`}>
          {data.isMonthly
            ? `${data.monthlyDeposit}${data.monthlyDepositUnit}`
            : data.isJeonse
            ? `-`
            : `-`}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`80px`}>
          {data.isMonthly ? (
            <>
              (월)&nbsp;
              {data.monthlyPrice}
              {data.monthlyPriceUnit}
              {data.isMonthlyCheck ? <Wrapper>(협의가능)</Wrapper> : ``}
            </>
          ) : data.isJeonse ? (
            <>
              (전)&nbsp;
              {data.jeonseDeposit}
              {data.jeonseDepositUnit}
              {data.isJeonseCheck ? <Wrapper>(협의가능)</Wrapper> : ``}
            </>
          ) : (
            <>
              (매)&nbsp;
              {data.tradingPrice}
              {data.tradingPriceUnit}
              {data.isTradingCheck ? <Wrapper>(협의가능)</Wrapper> : ``}
            </>
          )}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`70px`}>
          {data.isManagementFee
            ? `${data.managementFee}${data.managementFeeUnit}`
            : `없음`}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`70px`}>
          {data.isMonthly
            ? Math.round(
                parseInt(data.monthlyPrice) +
                  parseInt(data.isManagementFee ? data.managementFee : 0)
              )
            : `-`}

          {data.isMonthly && data.monthlyPriceUnit}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`60px`}>
          {data.buildingType ? data.buildingType : "-"}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`60px`}>{data.buildingUse}</ExcelHeadColumn>

        <ExcelHeadColumn width={`75px`}>
          {data.entranceDirection}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`75px`}>
          {data.isHeating ? `O` : `X`}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`90px`}>{data.restroom}</ExcelHeadColumn>

        <ExcelHeadColumn width={`65px`}>
          {data.isParking ? "가능" : "불가능"}
          <br />
          {data.parkingNumber
            ? `${data.parkingNumber}대/${data.totalParkingNumber}대`
            : ""}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`70px`}>
          {data.isElevator ? "O" : "X"}
          <br />
          {data.elevatorNumber ? `${data.elevatorNumber}대` : ""}
        </ExcelHeadColumn>

        <ExcelHeadColumn width={`70px`}>{data.moveInDate}</ExcelHeadColumn>

        <ExcelHeadColumn width={`300px`}>
          담당자 : {data.manager.name}
          <br />
          임대인 : {data.privateTel}
          <br />
          세입자 : {data.privateTel2}
          <br />
          메모 :&nbsp;
          {data.memo.split("\n").map((memo, idx) => {
            return (
              <SpanText key={idx}>
                {memo}
                <br />
              </SpanText>
            );
          })}
        </ExcelHeadColumn>
      </ExcelData>
    );
  }
);

const ExcelDataList = React.memo(
  ({
    inputSearchType,
    inputSearchKeyword1,
    inputSearchKeyword2,
    inputSearchKeyword3,
    checkAll,
    checkList,
    productDatum,
    setCurrentId,
    setViewImagePaths,
    changeCheckboxHandler,
    shareProductHandler,
  }) => {
    return productDatum ? (
      productDatum.length === 0 ? (
        <Wrapper margin={`30px 0`} fontSize={`15px`}>
          조회 된 데이터가 없습니다.
        </Wrapper>
      ) : (
        productDatum.map((data, idx) => {
          return (
            <ExcelDataOne
              data={data}
              idx={idx}
              checkList={checkList}
              productDatum={productDatum}
              setCurrentId={setCurrentId}
              setViewImagePaths={setViewImagePaths}
              changeCheckboxHandler={changeCheckboxHandler}
              shareProductHandler={shareProductHandler}
            />
          );
        })
      )
    ) : (
      <Wrapper margin={`10px 0`}>
        <CircularIndeterminate />
      </Wrapper>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.productDatum !== nextProps.productDatum) {
      return false;
    } else if (
      prevProps.productDatum.length !== nextProps.productDatum.length
    ) {
      return false;
    } else if (prevProps.checkAll !== nextProps.checkAll) {
      return false;
    } else if (prevProps.checkList !== nextProps.checkList) {
      return false;
    } else {
      return true;
    }
  }
);

const AD17Presenter = ({
  width,
  //
  currentTab,
  setCurrentTab,
  isLoading,
  searchProductType,
  setSearchProductType,
  searchTab,
  setSearchTab,
  orderType,
  setOrderType,
  orderValue,
  setOrderValue,
  viewImagePaths,
  setViewImagePaths,
  isManagerDialog,
  setIsManagerDialog,
  tabCount01,
  tabCount02,
  tabCount03,
  tabCount04,
  tabCount05,
  tabCount06,
  currentId,
  setCurrentId,
  checkAll,
  checkList,
  inputSearchType,
  inputSearchKeyword1,
  inputSearchKeyword2,
  inputSearchKeyword3,
  inputManager,
  //
  adminUserDatum,
  productDatum,
  //
  moveLinkHandler,
  moveURLHandler,
  closePageHandler,
  changeCheckboxHandler,
  changeSearchTypeHandler,
  changeOrderHandler,
  searchProductHandler,
  searchProductTypeHandler,
  updateProductManagerHandler,
  updateProductManagerHandlerAfter,
  updateProductHandler,
  deleteProductHandler,
  updateProductStatusHandler,
  updateProductViewHandler,
  updateProductOpenHandler,
  updateProductMapHandler,
  updateProductCompleteHandler,
  updateProductBestHandler,
  shareProductHandler,
}) => {
  const classes = useStyles();

  if (!checkList || checkList.length !== productDatum.length) return null;

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
          <Wrapper
            al={`flex-start`}
            margin={`10px 0 30px`}
            shadow={`2px 2px 5px #ddd`}
            border={`1px solid #ddd`}
            padding={`20px`}
          >
            <Wrapper dr={`row`} ju={`flex-start`}>
              <Combo
                width={`240px`}
                {...inputSearchType}
                onChange={changeSearchTypeHandler}
              >
                <ComboOption value="1">
                  매물번호, 제목, 주소, 담당자
                </ComboOption>
                <ComboOption value="2">전용평수</ComboOption>
                <ComboOption value="3">월세</ComboOption>
                <ComboOption value="4">노출천정</ComboOption>
              </Combo>

              {inputSearchType.value === "1" ||
              inputSearchType.value === "4" ? (
                <TextInput
                  margin={`0 10px`}
                  width={`300px`}
                  placeholder={
                    inputSearchType.value === "1"
                      ? "매물번호, 제목, 주소, 담당자"
                      : inputSearchType.value === "4"
                      ? "O / X"
                      : ""
                  }
                  {...inputSearchKeyword1}
                  onKeyDown={(e) =>
                    e.keyCode === 13 ? searchProductHandler() : null
                  }
                />
              ) : (
                <Wrapper dr={`row`} width={`auto`}>
                  <TextInput
                    margin={`0 10px`}
                    width={`136px`}
                    placeholder={
                      inputSearchType.value === "2"
                        ? "전용평수"
                        : inputSearchType.value === "3"
                        ? "월세"
                        : ""
                    }
                    {...inputSearchKeyword2}
                    onKeyDown={(e) =>
                      e.keyCode === 13 ? searchProductHandler() : null
                    }
                  />
                  ~
                  <TextInput
                    margin={`0 10px`}
                    width={`136px`}
                    placeholder={
                      inputSearchType.value === "2"
                        ? "전용평수"
                        : inputSearchType.value === "3"
                        ? "월세"
                        : ""
                    }
                    {...inputSearchKeyword3}
                    onKeyDown={(e) =>
                      e.keyCode === 13 ? searchProductHandler() : null
                    }
                  />
                </Wrapper>
              )}

              <CommonButton onClick={searchProductHandler}>검색</CommonButton>
            </Wrapper>

            <UlWrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`20px 0 10px`}
              padding={`0 10px`}
            >
              <LiWrapper margin={`0 5px 0 0`}>
                <FormControlLabel
                  control={
                    <Checkbox
                      classes={{ root: classes.checkboxRoot }}
                      value="1"
                      checked={searchProductType === "1"}
                      onChange={(e) => searchProductTypeHandler(e.target.value)}
                    />
                  }
                  label="전체"
                />
              </LiWrapper>

              <LiWrapper margin={`0 5px`}>
                <FormControlLabel
                  control={
                    <Checkbox
                      classes={{ root: classes.checkboxRoot }}
                      value="2"
                      checked={searchProductType === "2"}
                      onChange={(e) => searchProductTypeHandler(e.target.value)}
                    />
                  }
                  label="주택"
                />
              </LiWrapper>

              <LiWrapper margin={`0 5px`}>
                <FormControlLabel
                  control={
                    <Checkbox
                      classes={{ root: classes.checkboxRoot }}
                      value="3"
                      checked={searchProductType === "3"}
                      onChange={(e) => searchProductTypeHandler(e.target.value)}
                    />
                  }
                  label="사무실"
                />
              </LiWrapper>

              <LiWrapper margin={`0 5px`}>
                <FormControlLabel
                  control={
                    <Checkbox
                      classes={{ root: classes.checkboxRoot }}
                      value="4"
                      checked={searchProductType === "4"}
                      onChange={(e) => searchProductTypeHandler(e.target.value)}
                    />
                  }
                  label="상가"
                />
              </LiWrapper>
            </UlWrapper>

            <UlWrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`20px 0`}
              width={`auto`}
              border={`1px solid #eee`}
            >
              <LiWrapper
                width={`180px`}
                height={`48px`}
                fontSize={`16px`}
                cursor={`pointer`}
                bgColor={searchTab === "1" ? `#4e4e4e` : Theme.white_C}
                color={searchTab === "1" ? Theme.white_C : Theme.subBlack_C}
                onClick={() => setSearchTab("1")}
              >
                전체({tabCount01})
              </LiWrapper>
              <LiWrapper
                width={`180px`}
                height={`48px`}
                fontSize={`16px`}
                borderLeft={`1px solid #eee`}
                cursor={`pointer`}
                bgColor={searchTab === "2" ? `#4e4e4e` : Theme.white_C}
                color={searchTab === "2" ? Theme.white_C : Theme.subBlack_C}
                onClick={() => setSearchTab("2")}
              >
                광고중({tabCount02})
              </LiWrapper>
              <LiWrapper
                width={`180px`}
                height={`48px`}
                fontSize={`16px`}
                borderLeft={`1px solid #eee`}
                cursor={`pointer`}
                bgColor={searchTab === "3" ? `#4e4e4e` : Theme.white_C}
                color={searchTab === "3" ? Theme.white_C : Theme.subBlack_C}
                onClick={() => setSearchTab("3")}
              >
                광고종료({tabCount03})
              </LiWrapper>
              <LiWrapper
                width={`180px`}
                height={`48px`}
                fontSize={`16px`}
                borderLeft={`1px solid #eee`}
                cursor={`pointer`}
                bgColor={searchTab === "4" ? `#4e4e4e` : Theme.white_C}
                color={searchTab === "4" ? Theme.white_C : Theme.subBlack_C}
                onClick={() => setSearchTab("4")}
              >
                거래완료({tabCount04})
              </LiWrapper>
              <LiWrapper
                width={`180px`}
                height={`48px`}
                fontSize={`16px`}
                borderLeft={`1px solid #eee`}
                cursor={`pointer`}
                bgColor={searchTab === "5" ? `#4e4e4e` : Theme.white_C}
                color={searchTab === "5" ? Theme.white_C : Theme.subBlack_C}
                onClick={() => setSearchTab("5")}
              >
                승인요청({tabCount05})
              </LiWrapper>
              <LiWrapper
                width={`180px`}
                height={`48px`}
                fontSize={`16px`}
                borderLeft={`1px solid #eee`}
                cursor={`pointer`}
                bgColor={searchTab === "6" ? `#4e4e4e` : Theme.white_C}
                color={searchTab === "6" ? Theme.white_C : Theme.subBlack_C}
                onClick={() => setSearchTab("6")}
              >
                승인불가({tabCount06})
              </LiWrapper>
            </UlWrapper>
          </Wrapper>
          <Wrapper dr={`row`} ju={`flex-end`} margin={`10px 0`}>
            <CommonButton
              margin={`0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`check`}
              onClick={updateProductManagerHandler}
            >
              담당자 변경
            </CommonButton>
            <CommonButton
              margin={`0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`check`}
              onClick={updateProductHandler}
            >
              수정
            </CommonButton>
            <CommonButton
              margin={`0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`check`}
              onClick={deleteProductHandler}
            >
              삭제
            </CommonButton>
            <CommonButton
              margin={`0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`check`}
              onClick={() => updateProductStatusHandler(1)}
            >
              승인
            </CommonButton>
            <CommonButton
              margin={`0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`check`}
              onClick={() => updateProductStatusHandler(-1)}
            >
              승인불가
            </CommonButton>
            <CommonButton
              margin={`0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`check`}
              onClick={updateProductViewHandler}
            >
              광고노출 O/X
            </CommonButton>
            <CommonButton
              margin={`0 0 0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`check`}
              onClick={updateProductOpenHandler}
            >
              정보공개 O/X
            </CommonButton>
            <CommonButton
              margin={`0 0 0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`check`}
              onClick={() => updateProductMapHandler(true)}
            >
              지도표시 O
            </CommonButton>
            <CommonButton
              margin={`0 0 0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`delete`}
              onClick={() => updateProductMapHandler(false)}
            >
              지도표시 X
            </CommonButton>
            <CommonButton
              margin={`0 0 0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`check`}
              onClick={updateProductCompleteHandler}
            >
              거래완료 O/X
            </CommonButton>
            {/* <CommonButton
              margin={`0 0 0 3px`}
              width={`max-content`}
              padding={`0 20px`}
              kindOf={`check`}
              onClick={updateProductBestHandler}
            >
              인기매물 상태변경
            </CommonButton> */}
          </Wrapper>

          <Wrapper
            isRelative={true}
            zIndex={`1`}
            isBorder={true}
            al={`normal`}
            ju={`flex-start`}
            height={`800px`}
            isScroll={true}
          >
            <Wrapper
              isSticky={true}
              top={`0`}
              zIndex={`1`}
              width={`max-content`}
              bgColor={`#fff`}
              borderBottom={`1px solid #dedede !important`}
            >
              <Wrapper dr={`row`} ju={`flex-start`} al={`normal`}>
                <ExcelHeadColumn width={`30px`}>
                  <Checkbox
                    classes={{ root: classes.checkboxRoot }}
                    color="default"
                    name="checkAll"
                    checked={checkAll}
                    onChange={changeCheckboxHandler}
                  />
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`90px`}
                  onClick={() => changeOrderHandler("productNo")}
                >
                  매물번호
                  {orderType === "productNo" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "productNo" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`80px`}
                  onClick={() => changeOrderHandler("createdAt")}
                >
                  등록일
                  {orderType === "createdAt" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "createdAt" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`120px`}
                  onClick={() => changeOrderHandler("address")}
                >
                  주소
                  {orderType === "address" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "address" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn dr={`row`} width={`55px`}>
                  URL
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`50px`}
                  onClick={() => changeOrderHandler("isView")}
                >
                  광고
                  <br />
                  노출
                  {orderType === "isView" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "isView" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`50px`}
                  onClick={() => changeOrderHandler("isOpen")}
                >
                  정보
                  <br />
                  공개
                  {orderType === "isOpen" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "isOpen" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`50px`}
                  onClick={() => changeOrderHandler("isMap")}
                >
                  지도
                  <br />
                  표시
                  {orderType === "isMap" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "isMap" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`50px`}
                  onClick={() => changeOrderHandler("isComplete")}
                >
                  거래
                  <br />
                  완료
                  {orderType === "isComplete" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "isComplete" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                {/* <ExcelHeadColumn
                  dr={`row`}
                  width={`140px`}
                  onClick={() => changeOrderHandler("isBest")}
                >
                  인기매물 유무
                  {orderType === "isBest" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "isBest" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn> */}

                <ExcelHeadColumn
                  dr={`row`}
                  width={`80px`}
                  onClick={() => changeOrderHandler("useApprovalDate")}
                >
                  사용
                  <br />
                  승인일
                  {orderType === "useApprovalDate" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "useApprovalDate" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`100px`}
                  onClick={() => changeOrderHandler("contractArea")}
                >
                  면적
                  {orderType === "contractArea" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "contractArea" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`90px`}
                  onClick={() => changeOrderHandler("floor")}
                >
                  층수
                  {orderType === "floor" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "floor" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`80px`}
                  onClick={() => changeOrderHandler("monthlyDeposit")}
                >
                  보증금
                  {orderType === "monthlyDeposit" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "monthlyDeposit" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`80px`}
                  onClick={() => changeOrderHandler("monthlyPrice")}
                >
                  금액
                  {orderType === "monthlyPrice" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "monthlyPrice" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`70px`}
                  onClick={() => changeOrderHandler("managementFee")}
                >
                  관리비
                  {orderType === "managementFee" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "managementFee" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`70px`}
                  onClick={() => changeOrderHandler("관포")}
                >
                  관포
                  {orderType === "관포" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "관포" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`60px`}
                  onClick={() => changeOrderHandler("buildingType")}
                >
                  매물
                  <br />
                  형태
                  {orderType === "buildingType" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "buildingType" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`60px`}
                  onClick={() => changeOrderHandler("buildingUse")}
                >
                  건물
                  <br />
                  형태
                  {orderType === "buildingUse" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "buildingUse" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`75px`}
                  onClick={() => changeOrderHandler("entranceDirection")}
                >
                  주출입구
                  <br />
                  방향
                  {orderType === "entranceDirection" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "entranceDirection" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`75px`}
                  onClick={() => changeOrderHandler("isHeating")}
                >
                  냉난방기
                  <br />
                  유무
                  {orderType === "isHeating" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "isHeating" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`90px`}
                  onClick={() => changeOrderHandler("restroom")}
                >
                  화장실
                  {orderType === "restroom" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "restroom" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`65px`}
                  onClick={() => changeOrderHandler("totalParkingNumber")}
                >
                  주차
                  {orderType === "totalParkingNumber" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "totalParkingNumber" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`70px`}
                  onClick={() => changeOrderHandler("elevatorNumber")}
                >
                  엘리
                  <br />
                  베이터
                  {orderType === "elevatorNumber" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "elevatorNumber" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`70px`}
                  onClick={() => changeOrderHandler("moveInDate")}
                >
                  입주
                  <br />
                  가능일
                  {orderType === "moveInDate" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "moveInDate" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>

                <ExcelHeadColumn
                  dr={`row`}
                  width={`300px`}
                  onClick={() => changeOrderHandler("memo")}
                >
                  메모
                  {orderType === "memo" && orderValue === 1 && (
                    <AiFillCaretUp />
                  )}
                  {orderType === "memo" && orderValue === -1 && (
                    <AiFillCaretDown />
                  )}
                </ExcelHeadColumn>
              </Wrapper>
            </Wrapper>

            <ExcelDataList
              inputSearchType={inputSearchType}
              inputSearchKeyword1={inputSearchKeyword1}
              inputSearchKeyword2={inputSearchKeyword2}
              inputSearchKeyword3={inputSearchKeyword3}
              checkAll={checkAll}
              checkList={checkList}
              productDatum={productDatum}
              setCurrentId={setCurrentId}
              setViewImagePaths={setViewImagePaths}
              changeCheckboxHandler={changeCheckboxHandler}
              shareProductHandler={shareProductHandler}
            />

            {viewImagePaths.length > 0 && (
              <ExcelImageView>
                {viewImagePaths.map((path, idx) => {
                  return (
                    <Image
                      key={idx}
                      src={path}
                      width={width > 2000 ? `300px` : `220px`}
                      height={width > 2000 ? `250px` : `183px`}
                    />
                  );
                })}
              </ExcelImageView>
            )}
          </Wrapper>
        </Wrapper>
      )}

      {currentId && (
        <Wrapper
          isFixed={true}
          top={`40px`}
          right={`0`}
          zIndex={`9999`}
          width={`auto`}
          height={`calc(100vh - 40px)`}
          ju={`flex-start`}
          al={`flex-end`}
          bgColor={`#fff`}
          overflow={`auto`}
        >
          <MM02
            currentId={currentId}
            //
            closePageHandler={closePageHandler}
          />
        </Wrapper>
      )}

      <Dialog
        open={isManagerDialog}
        keepMounted
        onClose={() => setIsManagerDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={`sm`}
      >
        <DialogTitle id="alert-dialog-slide-title">{`담당자 변경`}</DialogTitle>
        <DialogContent>
          <Wrapper
            dr={`row`}
            al={`center`}
            ju={`flex-start`}
            isBorder={true}
            margin={`0px 0px 15px 0px`}
          >
            <Wrapper
              width={`100px`}
              height={`100%`}
              margin={`0px 10px 0px 0px`}
              size={`13px`}
              color={Theme.subBlack_C}
              padding={`10px`}
            >
              담당자
            </Wrapper>
            <Wrapper
              al={`flex-start`}
              width={`calc(100% - 110px )`}
              size={`15px`}
              padding={`10px`}
            >
              <Combo width={`100%`} {...inputManager}>
                {adminUserDatum &&
                  adminUserDatum.map((data) => {
                    return (
                      <ComboOption key={data._id} value={data._id}>
                        {data.name} {data.rank}
                      </ComboOption>
                    );
                  })}
              </Combo>
            </Wrapper>
          </Wrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsManagerDialog(false)} color="secondary">
            닫기
          </Button>
          <Button onClick={updateProductManagerHandlerAfter} color="primary">
            변경
          </Button>
        </DialogActions>
      </Dialog>
    </WholeWrapper>
  );
};

export default withResizeDetector(
  React.memo(AD17Presenter, (prevProps, nextProps) => {
    if (prevProps.productDatum !== nextProps.productDatum) {
      return false;
    } else if (prevProps.adminUserDatum !== nextProps.adminUserDatum) {
      return false;
    } else if (
      prevProps.inputSearchType.value !== nextProps.inputSearchType.value
    ) {
      return false;
    } else if (
      prevProps.inputSearchKeyword1.value !==
      nextProps.inputSearchKeyword1.value
    ) {
      return false;
    } else if (
      prevProps.inputSearchKeyword2.value !==
      nextProps.inputSearchKeyword2.value
    ) {
      return false;
    } else if (
      prevProps.inputSearchKeyword3.value !==
      nextProps.inputSearchKeyword3.value
    ) {
      return false;
    } else if (prevProps.inputManager.value !== nextProps.inputManager.value) {
      return false;
    } else if (prevProps.checkAll !== nextProps.checkAll) {
      return false;
    } else if (prevProps.checkList !== nextProps.checkList) {
      return false;
    } else if (prevProps.viewImagePaths !== nextProps.viewImagePaths) {
      return false;
    } else if (prevProps.currentId !== nextProps.currentId) {
      return false;
    } else if (prevProps.isManagerDialog !== nextProps.isManagerDialog) {
      return false;
    } else if (prevProps.orderType !== nextProps.orderType) {
      return false;
    } else if (prevProps.orderValue !== nextProps.orderValue) {
      return false;
    } else if (prevProps.isLoading !== nextProps.isLoading) {
      return false;
    } else {
      return true;
    }
  })
);
