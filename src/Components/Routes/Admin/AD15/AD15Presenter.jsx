import React from "react";
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
  PagenationWrapper,
  PagenationBtn,
  Pagenation,
} from "../../../../Components/AdminCommonComponents";
import {
  LiWrapper,
  Text,
  UlWrapper,
  Image,
  SpanText,
} from "../../../../Components/CommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineCheck } from "react-icons/ai";
import { GrDocumentUser } from "react-icons/gr";
import { areaCalculation, areaCalculation2 } from "../../../../commonUtils";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const tabs = ["매물 리스트"];

const useStyles = makeStyles({
  checkboxRoot: {
    padding: `0`,
  },
});

const ProductDataOne = React.memo(
  ({
    data,
    //
    moveURLHandler,
    togglePrivateInfoHandler,
    moveLinkHandler,
    deleteProductHandler,
    updateProductViewHandler,
    updateProductMapHandler,
    updateProductCompleteHandler,
  }) => {
    return (
      <Fade>
        <Wrapper
          dr={`row`}
          al={`normal`}
          borderBottom={`1px solid #dedede`}
          overflow={`hidden`}
          cursor={`pointer`}
          onClick={() => moveURLHandler(`/product-detail/${data._id}`)}
        >
          <Wrapper
            width={`calc(100% - 160px - 100px)`}
            padding={`10px 10px 10px 40px`}
          >
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              al={`flex-start`}
              padding={`0 0 10px`}
              borderBottom={`1px solid #dedede`}
            >
              <Wrapper width={`auto`}>
                <Image
                  src={data.detailImagePaths[0]}
                  width={`125px`}
                  height={`104px`}
                />
              </Wrapper>

              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 125px)`}
                padding={`0 0 0 15px`}
              >
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Wrapper
                    width={`auto`}
                    bgColor={Theme.basicTheme_C}
                    color={Theme.white_C}
                    radius={`50%`}
                    padding={`5px 5px 3px`}
                    size={`12px`}
                  >
                    {data.isMonthly
                      ? "월"
                      : data.isJeonse
                      ? "전"
                      : data.isTrading
                      ? "매"
                      : ""}
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    al={`flex-end`}
                    width={`auto`}
                    size={`12px`}
                  >
                    <Wrapper
                      width={`auto`}
                      size={`20px`}
                      fontWeight={`bold`}
                      padding={`3px 3px 0 5px`}
                    >
                      {data.isMonthly
                        ? `${data.monthlyDeposit}/${data.monthlyPrice}`
                        : data.isJeonse
                        ? `${data.jeonseDeposit}`
                        : data.isTrading
                        ? `${data.tradingPrice}`
                        : ""}
                    </Wrapper>

                    <SpanText isRelative={true} bottom={`3px`}>
                      {data.isMonthly
                        ? `${data.monthlyPriceUnit}원 ${
                            data.isMonthlyCheck ? "(협의가능)" : ""
                          }`
                        : data.isJeonse
                        ? `${data.jeonseDepositUnit}원 ${
                            data.isJeonseCheck ? "(협의가능)" : ""
                          }`
                        : data.isTrading
                        ? `${data.tradingPriceUnit}원 ${
                            data.isTradingCheck ? "(협의가능)" : ""
                          }`
                        : ""}
                    </SpanText>
                  </Wrapper>
                </Wrapper>

                <UlWrapper al={`flex-start`}>
                  <LiWrapper
                    margin={`15px 0 5px`}
                    fontSize={`14px`}
                    color={`#939393`}
                  >
                    {data.productType}
                    {data.buildingUse ? ` / ${data.buildingUse}` : ""}
                    {data.floor ? ` / ${data.floor}` : ""}
                    {` / 
            ${data.contractArea}
          ㎡(${areaCalculation2(data.contractArea)}PY)`}
                    {` / 관리비 ${
                      data.isManagementFee
                        ? `${data.managementFee}${data.managementFeeUnit}`
                        : "없음"
                    }`}
                  </LiWrapper>

                  <LiWrapper
                    fontSize={`14px`}
                    fontWeight={`bold`}
                    lineHeight={`140%`}
                  >
                    주소정보: {data.address}
                    <br />
                    [도로명주소] {data.roadAddress}
                  </LiWrapper>
                </UlWrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} ju={`space-between`} padding={`10px 0 0 0`}>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                width={`calc(100% - 500px)`}
                size={`13px`}
                fontWeight={`bold`}
                color={`#5d5b5b`}
              >
                <GrDocumentUser size={22} color={`#dedede`} />
                &nbsp;
                <Text
                  isEllipsis={true}
                  width={`calc(100% - 100px)`}
                  padding={`0 5px`}
                  onClick={
                    data.isOpen
                      ? (e) => {
                          e.stopPropagation();
                          togglePrivateInfoHandler(e, data);
                        }
                      : null
                  }
                >
                  {data.manager.name} {data.manager.rank}
                </Text>
              </Wrapper>

              <UlWrapper dr={`row`} ju={`flex-end`} width={`500px`}>
                <LiWrapper margin={`0 5px`}>
                  <CommonButton
                    width={`max-content`}
                    padding={`0 20px`}
                    kindOf={`check`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(
                        `/admin/registProductManagement?key=${data._id}`
                      );
                    }}
                  >
                    수정
                  </CommonButton>
                </LiWrapper>

                <LiWrapper margin={`0 5px`}>
                  <CommonButton
                    width={`max-content`}
                    padding={`0 20px`}
                    kindOf={`check`}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProductHandler(data._id);
                    }}
                  >
                    삭제
                  </CommonButton>
                </LiWrapper>

                <LiWrapper margin={`0 5px`}>
                  <CommonButton
                    width={`max-content`}
                    padding={`0 20px`}
                    kindOf={data.isView ? `check` : `delete`}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateProductViewHandler(data._id, data.isView);
                    }}
                  >
                    {data.isView ? `광고 O` : `광고 X`}
                  </CommonButton>
                </LiWrapper>

                <LiWrapper margin={`0 5px`}>
                  <CommonButton
                    width={`max-content`}
                    padding={`0 20px`}
                    kindOf={data.isMap ? `check` : `delete`}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateProductMapHandler(data._id, data.isMap);
                    }}
                  >
                    {data.isMap ? `지도표시 O` : `지도표시 X`}
                  </CommonButton>
                </LiWrapper>

                <LiWrapper margin={`0 5px`}>
                  <CommonButton
                    width={`max-content`}
                    padding={`0 20px`}
                    kindOf={data.isComplete ? `check` : `delete`}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateProductCompleteHandler(data._id, data.isComplete);
                    }}
                  >
                    {data.isComplete ? `거래완료 O` : `거래완료 X`}
                  </CommonButton>
                </LiWrapper>
              </UlWrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper
            width={`160px`}
            minWidth={`160px`}
            borderLeft={`1px solid #ddd`}
            size={`14px`}
            textAlign={`center`}
            lineHeight={`160%`}
          >
            등록일: {data.createdAt.substring(0, 10)}
            <br />
            수정일: {data.updatedAt.substring(0, 10)}
            <br />
            조회수: {data.hit}
            <br />
            관심수: {data.star}
            <br />
            매물번호: {data.productNo}
          </Wrapper>

          <Wrapper
            width={`100px`}
            minWidth={`100px`}
            borderLeft={`1px solid #ddd`}
          >
            <Wrapper
              width={`auto`}
              padding={`10px 8px 5px`}
              fontWeight={`bold`}
              border={`1px solid ${data.isView ? `#585390` : `#868686`}`}
              color={data.isView ? `#585390` : `#868686`}
              radius={`25px`}
            >
              {data.isView ? `광고중` : `광고종료`}
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Fade>
    );
  }
);

const ProductDataList = React.memo(
  ({
    isLoading,
    //
    productDatum,
    //
    moveURLHandler,
    togglePrivateInfoHandler,
    moveLinkHandler,
    deleteProductHandler,
    updateProductViewHandler,
    updateProductMapHandler,
    updateProductCompleteHandler,
  }) => {
    return productDatum && isLoading ? (
      productDatum.length === 0 ? (
        <Wrapper margin={`30px 0`} fontSize={`15px`}>
          조회 된 데이터가 없습니다.
        </Wrapper>
      ) : (
        productDatum.map((data) => {
          return (
            <ProductDataOne
              key={data._id}
              data={data}
              moveURLHandler={moveURLHandler}
              togglePrivateInfoHandler={togglePrivateInfoHandler}
              moveLinkHandler={moveLinkHandler}
              deleteProductHandler={deleteProductHandler}
              updateProductViewHandler={updateProductViewHandler}
              updateProductMapHandler={updateProductMapHandler}
              updateProductCompleteHandler={updateProductCompleteHandler}
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
    if (!prevProps.productDatum && !nextProps.productDatum) {
      return true;
    } else if (prevProps.isLoading !== nextProps.isLoading) {
      return false;
    } else if (prevProps.productDatum !== nextProps.productDatum) {
      return false;
    } else if (
      prevProps.productDatum.length !== nextProps.productDatum.length
    ) {
      return false;
    } else {
      return true;
    }
  }
);

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  currentList,
  currentPage,
  pages,
  limit,
  searchProductType,
  setSearchProductType,
  searchTab,
  setSearchTab,
  searchOrder,
  setSearchOrder,
  privateDialogData,
  isPrivateDialogOpen,
  tabCount01,
  tabCount02,
  tabCount03,
  tabCount04,
  inputSearchType,
  inputSearchKeyword1,
  inputSearchKeyword2,
  inputSearchKeyword3,
  //
  productDatum,
  //
  moveLinkHandler,
  moveURLHandler,
  prevAndNextPageChangeHandler,
  changePageHandler,
  changeSearchTypeHandler,
  searchProductHandler,
  searchProductHandler2,
  deleteProductHandler,
  updateProductViewHandler,
  updateProductMapHandler,
  updateProductCompleteHandler,
  togglePrivateInfoHandler,
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
                      onChange={(e) =>
                        searchProductHandler2(
                          e.target.value,
                          setSearchProductType
                        )
                      }
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
                      onChange={(e) =>
                        searchProductHandler2(
                          e.target.value,
                          setSearchProductType
                        )
                      }
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
                      onChange={(e) =>
                        searchProductHandler2(
                          e.target.value,
                          setSearchProductType
                        )
                      }
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
                      onChange={(e) =>
                        searchProductHandler2(
                          e.target.value,
                          setSearchProductType
                        )
                      }
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
                onClick={() => searchProductHandler2("1", setSearchTab)}
              >
                전체 ({tabCount01})
              </LiWrapper>
              <LiWrapper
                width={`180px`}
                height={`48px`}
                fontSize={`16px`}
                borderLeft={`1px solid #eee`}
                cursor={`pointer`}
                bgColor={searchTab === "2" ? `#4e4e4e` : Theme.white_C}
                color={searchTab === "2" ? Theme.white_C : Theme.subBlack_C}
                onClick={() => searchProductHandler2("2", setSearchTab)}
              >
                광고중 ({tabCount02})
              </LiWrapper>
              <LiWrapper
                width={`180px`}
                height={`48px`}
                fontSize={`16px`}
                borderLeft={`1px solid #eee`}
                cursor={`pointer`}
                bgColor={searchTab === "3" ? `#4e4e4e` : Theme.white_C}
                color={searchTab === "3" ? Theme.white_C : Theme.subBlack_C}
                onClick={() => searchProductHandler2("3", setSearchTab)}
              >
                광고종료 ({tabCount03})
              </LiWrapper>
              <LiWrapper
                width={`180px`}
                height={`48px`}
                fontSize={`16px`}
                borderLeft={`1px solid #eee`}
                cursor={`pointer`}
                bgColor={searchTab === "4" ? `#4e4e4e` : Theme.white_C}
                color={searchTab === "4" ? Theme.white_C : Theme.subBlack_C}
                onClick={() => searchProductHandler2("4", setSearchTab)}
              >
                거래완료 ({tabCount04})
              </LiWrapper>
            </UlWrapper>

            <UlWrapper
              dr={`row`}
              ju={`flex-start`}
              margin={`10px 0 0`}
              width={`auto`}
            >
              <LiWrapper
                dr={`row`}
                margin={`0 5px`}
                fontSize={`15px`}
                cursor={`pointer`}
                color={
                  searchOrder === "1" ? Theme.basicTheme_C : Theme.subBlack_C
                }
                fontWeight={searchOrder === "1" ? `700` : `500`}
                onClick={() => searchProductHandler2("1", setSearchOrder)}
              >
                {searchOrder === "1" && <AiOutlineCheck />} &nbsp;최신등록순
              </LiWrapper>

              <LiWrapper
                dr={`row`}
                margin={`0 5px`}
                fontSize={`15px`}
                cursor={`pointer`}
                color={
                  searchOrder === "2" ? Theme.basicTheme_C : Theme.subBlack_C
                }
                fontWeight={searchOrder === "2" ? `700` : `500`}
                onClick={() => searchProductHandler2("2", setSearchOrder)}
              >
                {searchOrder === "2" && <AiOutlineCheck />} &nbsp;수정일순
              </LiWrapper>
            </UlWrapper>
          </Wrapper>

          <Wrapper
            isBorder={true}
            al={`flex-start`}
            ju={`flex-start`}
            height={`600px`}
            isScroll={true}
          >
            <ProductDataList
              isLoading={isLoading}
              //
              productDatum={productDatum}
              //
              moveURLHandler={moveURLHandler}
              moveLinkHandler={moveLinkHandler}
              togglePrivateInfoHandler={togglePrivateInfoHandler}
              deleteProductHandler={deleteProductHandler}
              updateProductViewHandler={updateProductViewHandler}
              updateProductMapHandler={updateProductMapHandler}
              updateProductCompleteHandler={updateProductCompleteHandler}
            />
          </Wrapper>

          {/* {pages && pages.length > 0 && (
            <Wrapper margin={`40px 0 20px`}>
              <PagenationWrapper width={`auto`}>
                <PagenationBtn
                  onClick={() => prevAndNextPageChangeHandler(currentPage - 1)}
                >
                  <IoIosArrowBack />
                </PagenationBtn>
                {pages.map((data, idx) => {
                  return (
                    (currentList + 1) * 5 > idx &&
                    currentList * 5 <= idx && (
                      <Pagenation
                        className={data === currentPage ? `active` : ``}
                        key={data}
                        onClick={() => changePageHandler(data)}
                      >
                        {data + 1}
                      </Pagenation>
                    )
                  );
                })}
                <PagenationBtn
                  onClick={() => prevAndNextPageChangeHandler(currentPage + 1)}
                >
                  <IoIosArrowForward />
                </PagenationBtn>
              </PagenationWrapper>
            </Wrapper>
          )} */}
        </Wrapper>
      )}

      <Dialog
        open={isPrivateDialogOpen}
        keepMounted
        onClose={(e) => togglePrivateInfoHandler(e)}
        aria-labelledby="alertalog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={`md`}
      >
        <DialogTitle id="alert-dialog-slide-title">비공개 정보</DialogTitle>
        <DialogContent>
          <Wrapper al={`flex-start`} lineHeight={`150%`}>
            <Wrapper dr={`row`} al={`flex-start`} width={`auto`}>
              <Wrapper al={`flex-start`} margin={`0 5px 0 0`} width={`180px`}>
                담당자 &nbsp;명&nbsp;&nbsp; :
              </Wrapper>

              <Wrapper width={`calc(100% - 180px)`}>
                {privateDialogData && privateDialogData.manager.name}
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} al={`flex-start`} width={`auto`}>
              <Wrapper al={`flex-start`} margin={`0 5px 0 0`} width={`180px`}>
                임대인 전화 :
              </Wrapper>

              <Wrapper width={`calc(100% - 180px)`}>
                {privateDialogData && privateDialogData.privateTel}
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} al={`flex-start`} width={`auto`}>
              <Wrapper al={`flex-start`} margin={`0 5px 0 0`} width={`180px`}>
                세입자 전화 :
              </Wrapper>

              <Wrapper width={`calc(100% - 180px)`}>
                {privateDialogData && privateDialogData.privateTel2}
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`} al={`flex-start`} width={`auto`}>
              <Wrapper al={`flex-start`} margin={`0 5px 0 0`} width={`180px`}>
                비공개 메모 :
              </Wrapper>

              <Wrapper width={`calc(100% - 180px)`}>
                {privateDialogData &&
                  privateDialogData.memo.split("\n").map((memo, idx) => {
                    return (
                      <SpanText key={idx}>
                        {memo}
                        <br />
                      </SpanText>
                    );
                  })}
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={togglePrivateInfoHandler} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </WholeWrapper>
  );
};
