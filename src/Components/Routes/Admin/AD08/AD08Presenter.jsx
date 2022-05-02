import React from "react";
import {
  CommonButton,
  TableHeadColumn,
  TableWrapper,
  WholeWrapper,
  Wrapper,
  TextInput,
} from "../../../../Components/AdminCommonComponents";
import { Text } from "../../../../Components/CommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const tabs = ["메뉴/카테고리"];

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  currentSubMenu,
  isMenuDialog,
  setIsMenuDialog,
  isSubMenuDialog,
  setIsSubMenuDialog,
  inputMenu,
  inputSubMenu,
  inputIsCategory,
  //
  menuDatum,
  //
  menuClickHandler,
  toggleMenuUseYnHandler,
  toggleSubMenuUseYnHandler,
  updateMenuSortUpHandler,
  updateMenuSortDownHandler,
  updateSubMenuSortUpHandler,
  updateSubMenuSortDownHandler,
  deleteMenuHandler,
  deleteSubMenuHandler,
  createMenuHandler,
  createSubMenuHandler,
  toggleMenuDialogHandler,
  toggleSubMenuDialogHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="메뉴/카테고리 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      {currentTab === 0 && (
        <Wrapper>
          <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
            <Wrapper
              width={`500px`}
              minWidth={`450px`}
              margin={`0px 10px 0px 0px`}
            >
              <TableWrapper>
                <TableHeadColumn width={`10%`}>번호</TableHeadColumn>
                <TableHeadColumn width={`40%`}>메뉴명</TableHeadColumn>
                <TableHeadColumn width={`15%`}>상태</TableHeadColumn>
                <TableHeadColumn width={`15%`}>삭제</TableHeadColumn>
                <TableHeadColumn width={`10%`}>위</TableHeadColumn>
                <TableHeadColumn width={`10%`}>아래</TableHeadColumn>
              </TableWrapper>
              <Wrapper
                isBorder={true}
                height={`600px`}
                isScroll={true}
                al={`flex-start`}
                ju={`flex-start`}
              >
                {menuDatum ? (
                  menuDatum.length === 0 ? (
                    <TableWrapper isData={true}>
                      <TableHeadColumn isData={true} width={`100%`}>
                        조회 된 데이터가 없습니다.
                      </TableHeadColumn>
                    </TableWrapper>
                  ) : (
                    menuDatum.map((data, idx) => {
                      return (
                        <Fade left key={idx} delay={idx * 20}>
                          <TableWrapper isData={true}>
                            <TableHeadColumn isData={true} width={`10%`}>
                              {idx + 1}
                            </TableHeadColumn>
                            <TableHeadColumn
                              isData={true}
                              width={`40%`}
                              onClick={() =>
                                menuClickHandler(data.subMenu, idx)
                              }
                            >
                              <Text isEllipsis={true}>{data.name}</Text>
                            </TableHeadColumn>
                            <TableHeadColumn isData={true} width={`15%`}>
                              <CommonButton
                                width={`100%`}
                                height={`25px`}
                                kindOf={data.useYn ? `update` : `delete`}
                                onClick={() => toggleMenuUseYnHandler(data)}
                              >
                                {data.useYn ? `사용` : `미사용`}
                              </CommonButton>
                            </TableHeadColumn>
                            <TableHeadColumn isData={true} width={`15%`}>
                              <CommonButton
                                width={`100%`}
                                height={`25px`}
                                kindOf={`delete`}
                                onClick={() => deleteMenuHandler(data._id)}
                              >
                                삭제
                              </CommonButton>
                            </TableHeadColumn>
                            <TableHeadColumn
                              isData={true}
                              width={`10%`}
                              isSvg={true}
                            >
                              <CommonButton
                                width={`100%`}
                                height={`25px`}
                                kindOf={`check`}
                                onClick={() =>
                                  updateMenuSortUpHandler(data, idx)
                                }
                              >
                                <BiUpArrow />
                              </CommonButton>
                            </TableHeadColumn>
                            <TableHeadColumn
                              isData={true}
                              width={`10%`}
                              isSvg={true}
                            >
                              <CommonButton
                                width={`100%`}
                                height={`25px`}
                                kindOf={`check`}
                                onClick={() =>
                                  updateMenuSortDownHandler(data, idx)
                                }
                              >
                                <BiDownArrow />
                              </CommonButton>
                            </TableHeadColumn>
                          </TableWrapper>
                        </Fade>
                      );
                    })
                  )
                ) : (
                  <CircularIndeterminate />
                )}
              </Wrapper>
            </Wrapper>

            <Wrapper>
              <TableWrapper>
                <TableHeadColumn width={`10%`}>번호</TableHeadColumn>
                <TableHeadColumn width={`30%`}>메뉴명</TableHeadColumn>
                <TableHeadColumn width={`30%`}>링크</TableHeadColumn>
                <TableHeadColumn width={`10%`}>상태</TableHeadColumn>
                <TableHeadColumn width={`10%`}>삭제</TableHeadColumn>
                <TableHeadColumn width={`5%`}>위</TableHeadColumn>
                <TableHeadColumn width={`5%`}>아래</TableHeadColumn>
              </TableWrapper>

              <Wrapper
                isBorder={true}
                height={`600px`}
                isScroll={true}
                al={`flex-start`}
                ju={`flex-start`}
              >
                {currentSubMenu ? (
                  currentSubMenu.length === 0 ? (
                    <TableWrapper isData={true}>
                      <TableHeadColumn isData={true} width={`100%`}>
                        서브메뉴가 없습니다.
                      </TableHeadColumn>
                    </TableWrapper>
                  ) : (
                    currentSubMenu.map((data, idx) => {
                      return (
                        <Fade left key={idx} delay={idx * 20}>
                          <TableWrapper isData={true}>
                            <TableHeadColumn isData={true} width={`10%`}>
                              {idx + 1}
                            </TableHeadColumn>
                            <TableHeadColumn isData={true} width={`30%`}>
                              {data.name}
                            </TableHeadColumn>
                            <TableHeadColumn isData={true} width={`30%`}>
                              {data.link}
                            </TableHeadColumn>
                            <TableHeadColumn isData={true} width={`10%`}>
                              <CommonButton
                                width={`100%`}
                                height={`25px`}
                                kindOf={data.useYn ? `update` : `delete`}
                                onClick={() =>
                                  toggleSubMenuUseYnHandler(data, idx)
                                }
                              >
                                {data.useYn ? `사용` : `미사용`}
                              </CommonButton>
                            </TableHeadColumn>
                            <TableHeadColumn isData={true} width={`10%`}>
                              <CommonButton
                                width={`100%`}
                                height={`25px`}
                                kindOf={`delete`}
                                onClick={() => deleteSubMenuHandler(data._id)}
                              >
                                삭제
                              </CommonButton>
                            </TableHeadColumn>
                            <TableHeadColumn
                              isData={true}
                              width={`5%`}
                              isSvg={true}
                            >
                              <CommonButton
                                width={`100%`}
                                height={`25px`}
                                kindOf={`check`}
                                onClick={() =>
                                  updateSubMenuSortUpHandler(data, idx)
                                }
                              >
                                <BiUpArrow />
                              </CommonButton>
                            </TableHeadColumn>
                            <TableHeadColumn
                              isData={true}
                              width={`5%`}
                              isSvg={true}
                            >
                              <CommonButton
                                width={`100%`}
                                height={`25px`}
                                kindOf={`check`}
                                onClick={() =>
                                  updateSubMenuSortDownHandler(data, idx)
                                }
                              >
                                <BiDownArrow />
                              </CommonButton>
                            </TableHeadColumn>
                          </TableWrapper>
                        </Fade>
                      );
                    })
                  )
                ) : (
                  <TableWrapper isData={true}>
                    <TableHeadColumn isData={true} width={`100%`}>
                      좌측 메뉴를 선택해주세요.
                    </TableHeadColumn>
                  </TableWrapper>
                )}
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} ju={`space-between`} margin={`10px 0`}>
            <Wrapper dr={`row`} width={`auto`}>
              <CommonButton
                margin={`0 0 0 10px`}
                kindOf={`create`}
                onClick={toggleMenuDialogHandler}
              >
                메뉴 등록
              </CommonButton>
            </Wrapper>

            <Wrapper dr={`row`} width={`auto`}>
              <CommonButton
                margin={`0 0 0 10px`}
                kindOf={`create`}
                onClick={toggleSubMenuDialogHandler}
              >
                서브메뉴 등록
              </CommonButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      )}

      <Dialog
        open={isMenuDialog}
        keepMounted
        onClose={toggleMenuDialogHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={`sm`}
      >
        <DialogTitle id="alert-dialog-slide-title">메뉴 등록</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={inputIsCategory.value}
                onChange={(e) => inputIsCategory.setValue(e.target.checked)}
              />
            }
            label="매물 카테고리 생성"
          />

          <TextInput
            margin={`10px 0`}
            placeholder={"메뉴명"}
            {...inputMenu}
            onKeyDown={(e) => (e.keyCode === 13 ? createMenuHandler() : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={createMenuHandler}>
            등록
          </Button>
          <Button onClick={toggleMenuDialogHandler} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isSubMenuDialog}
        keepMounted
        onClose={toggleSubMenuDialogHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={`sm`}
      >
        <DialogTitle id="alert-dialog-slide-title">서브메뉴 등록</DialogTitle>
        <DialogContent>
          <TextInput
            margin={`10px 0`}
            placeholder={"메뉴명"}
            {...inputSubMenu}
            onKeyDown={(e) =>
              e.keyCode === 13 ? createSubMenuHandler() : null
            }
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={createSubMenuHandler}>
            등록
          </Button>
          <Button onClick={toggleSubMenuDialogHandler} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </WholeWrapper>
  );
};
