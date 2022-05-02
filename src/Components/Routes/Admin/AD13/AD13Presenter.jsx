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
} from "../../../../Components/AdminCommonComponents";
import { Text } from "../../../../Components/CommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const tabs = ["일반회원 리스트", "메시지 전송"];

const useStyles = makeStyles({
  checkboxRoot: {
    padding: `0`,
  },

  checkboxWhiteRoot: {
    padding: `0`,
    color: `#fff`,
  },
});

export default ({
  currentTab,
  setCurrentTab,
  isLoading,
  searchValue,
  inputType,
  inputText,
  checkAll,
  checkList,
  //
  userDatum,
  //
  deleteUserHandler,
  sendMessageHandler,
  changeCheckboxHandler,
}) => {
  if (currentTab === 1 && (!checkList || checkList.length !== userDatum.length))
    return null;

  const classes = useStyles();

  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="일반회원 관리" />
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Fade>

      {currentTab === 0 && (
        <Wrapper>
          <Wrapper
            isSearchBox={true}
            height={`35px`}
            margin={`0px 0px 10px 0px`}
            padding={`0px 5px`}
            al={`flex-start`}
          >
            <TextInput
              type="text"
              width={`300px`}
              placeholder={`이름, 이메일, 핸드폰`}
              height={`25px`}
              {...searchValue}
            />
          </Wrapper>

          <Wrapper margin={`0px 0px 5px 0px`}>
            <TableWrapper>
              <TableHeadColumn width={`5%`}>번호</TableHeadColumn>
              <TableHeadColumn width={`20%`}>이름</TableHeadColumn>
              <TableHeadColumn width={`25%`}>이메일</TableHeadColumn>
              <TableHeadColumn width={`25%`}>핸드폰</TableHeadColumn>
              <TableHeadColumn width={`15%`}>가입일</TableHeadColumn>
              <TableHeadColumn width={`10%`}>삭제</TableHeadColumn>
            </TableWrapper>
          </Wrapper>

          <Wrapper
            isBorder={true}
            al={`flex-start`}
            ju={`flex-start`}
            height={`auto`}
            minHeight={`600px`}
            isScroll={true}
          >
            {userDatum ? (
              userDatum.length === 0 ? (
                <TableWrapper isData={true}>
                  <TableHeadColumn isData={true} width={`100%`}>
                    조회 된 데이터가 없습니다.
                  </TableHeadColumn>
                </TableWrapper>
              ) : (
                userDatum.map((data, idx) => {
                  return (
                    <Fade key={data._id} delay={idx * 30}>
                      <TableWrapper isData={true}>
                        <TableHeadColumn isData={true} width={`5%`}>
                          {idx + 1}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`20%`}>
                          {data.name}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`25%`}>
                          {data.email}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`25%`}>
                          {data.mobile}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`15%`}>
                          {data.createdAt}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} width={`10%`}>
                          <CommonButton
                            width={`100%`}
                            height={`25px`}
                            kindOf={`delete`}
                            onClick={() => deleteUserHandler(data._id)}
                          >
                            삭제
                          </CommonButton>
                        </TableHeadColumn>
                      </TableWrapper>
                    </Fade>
                  );
                })
              )
            ) : (
              <Wrapper margin={`10px 0`}>
                <CircularIndeterminate />
              </Wrapper>
            )}
          </Wrapper>
        </Wrapper>
      )}

      {currentTab === 1 && (
        <Wrapper>
          <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
            <Wrapper
              width={`450px`}
              minWidth={`450px`}
              margin={`0px 10px 0px 0px`}
            >
              <TableWrapper>
                <TableHeadColumn width={`10%`}>
                  <Checkbox
                    classes={{
                      root: classes.checkboxWhiteRoot,
                    }}
                    color={`default`}
                    name="checkAll"
                    checked={checkAll}
                    onChange={changeCheckboxHandler}
                  />
                </TableHeadColumn>
                <TableHeadColumn width={`20%`}>이름</TableHeadColumn>
                <TableHeadColumn width={`35%`}>이메일</TableHeadColumn>
                <TableHeadColumn width={`35%`}>핸드폰</TableHeadColumn>
              </TableWrapper>

              <Wrapper
                isBorder={true}
                height={`600px`}
                isScroll={true}
                al={`flex-start`}
                ju={`flex-start`}
              >
                {userDatum ? (
                  userDatum.length === 0 ? (
                    <TableWrapper isData={true}>
                      <TableHeadColumn isData={true} width={`100%`}>
                        조회 된 데이터가 없습니다.
                      </TableHeadColumn>
                    </TableWrapper>
                  ) : (
                    userDatum.map((data, idx) => {
                      return (
                        <Fade left key={idx} delay={idx * 20}>
                          <TableWrapper isData={true}>
                            <TableHeadColumn isData={true} width={`10%`}>
                              {checkList.length !== userDatum.length &&
                              checkList[idx] ? (
                                <Checkbox
                                  classes={{
                                    root: classes.checkboxRoot,
                                  }}
                                  color={`default`}
                                  onChange={changeCheckboxHandler}
                                />
                              ) : (
                                <Checkbox
                                  classes={{
                                    root: classes.checkboxRoot,
                                  }}
                                  color={`default`}
                                  {...checkList[idx]}
                                  onChange={changeCheckboxHandler}
                                />
                              )}
                            </TableHeadColumn>

                            <TableHeadColumn isData={true} width={`20%`}>
                              <Text isEllipsis={true}>{data.name}</Text>
                            </TableHeadColumn>

                            <TableHeadColumn isData={true} width={`35%`}>
                              <Text isEllipsis={true}>{data.email}</Text>
                            </TableHeadColumn>

                            <TableHeadColumn isData={true} width={`35%`}>
                              <Text isEllipsis={true}>{data.mobile}</Text>
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
                <TableHeadColumn width={`100%`}>메시지 작성</TableHeadColumn>
              </TableWrapper>

              <Wrapper padding={`25px 15px`} isBorder={true}>
                <Wrapper
                  dr={`row`}
                  al={`flex-start`}
                  ju={`flex-start`}
                  margin={`0px 0px 10px 0px`}
                >
                  <InfoText width={`70px`} margin={`0px 10px 0px 0px`}>
                    전송유형
                  </InfoText>

                  <Wrapper
                    dr={`row`}
                    width={`auto`}
                    isRelative={true}
                    bottom={`10px`}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={inputType.value === "이메일"}
                          value="이메일"
                          onChange={(e) => inputType.setValue(e.target.value)}
                        />
                      }
                      label="이메일"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={inputType.value === "카카오톡"}
                          value="카카오톡"
                          onChange={(e) => inputType.setValue(e.target.value)}
                        />
                      }
                      label="카카오톡"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={inputType.value === "SMS"}
                          value="SMS"
                          onChange={(e) => inputType.setValue(e.target.value)}
                        />
                      }
                      label="SMS"
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  al={`flex-start`}
                  ju={`flex-start`}
                  margin={`0px 0px 10px 0px`}
                >
                  <InfoText width={`70px`} margin={`0px 10px 0px 0px`}>
                    내용
                  </InfoText>

                  <Textarea height={`455px`} {...inputText} />
                </Wrapper>

                <Wrapper al={`flex-end`} ju={`flex-end`}>
                  <CommonButton kindOf={`create`} onClick={sendMessageHandler}>
                    메시지 전송
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      )}
    </WholeWrapper>
  );
};
