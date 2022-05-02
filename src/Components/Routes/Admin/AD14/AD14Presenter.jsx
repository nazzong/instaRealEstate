import React from "react";
import {
  CommonButton,
  TableHeadColumn,
  TableWrapper,
  WholeWrapper,
  Wrapper,
  TextInput,
  InfoText,
  FileInput,
} from "../../../../Components/AdminCommonComponents";
import { Image } from "../../../../Components/CommonComponents";
import { Title, Tabs } from "../Components";
import Fade from "react-reveal/Fade";
import CircularIndeterminate from "../../../../Components/loading/CircularIndeterminate";
import styled from "styled-components";
import Theme from "../../../../Styles/Theme";

const tabs = ["직원회원 리스트", "직원회원 등록"];

export default ({
  fileRef,
  //
  currentTab,
  setCurrentTab,
  currentMode,
  isLoading,
  searchValue,
  inputUserId,
  inputPassword,
  inputRank,
  inputName,
  inputMobile,
  inputAddress,
  inputSecurityNumber,
  inputFilePath,
  //
  userDatum,
  //
  fileChangeHandler,
  deleteAdminUserHandler,
  createAdminUserHandler,
  changeUpdateModeHandler,
  updateAdminUserHandler,
}) => {
  return (
    <WholeWrapper al={`flex-start`} ju={`flex-start`}>
      <Fade right>
        <Title text="직원회원 관리" />
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
              placeholder={`아이디, 이름`}
              height={`25px`}
              {...searchValue}
            />
          </Wrapper>

          <Wrapper
            isBorder={true}
            al={`normal`}
            ju={`flex-start`}
            height={`auto`}
            minHeight={`600px`}
            isScroll={true}
          >
            <Wrapper
              margin={`0px 0px 5px 0px`}
              al={`normal`}
              width={`calc(50px + 140px + 160px + 120px + 150px + 200px + 400px + 200px + 180px + 100px + 100px + (1.5px * 10))`}
            >
              <TableWrapper ju={`flex-start`}>
                <TableHeadColumn minWidth={`50px`}>번호</TableHeadColumn>
                <TableHeadColumn minWidth={`140px`}>사진</TableHeadColumn>
                <TableHeadColumn minWidth={`160px`}>아이디</TableHeadColumn>
                <TableHeadColumn minWidth={`120px`}>직급</TableHeadColumn>
                <TableHeadColumn minWidth={`150px`}>이름</TableHeadColumn>
                <TableHeadColumn minWidth={`200px`}>연락처</TableHeadColumn>
                <TableHeadColumn minWidth={`400px`}>주소</TableHeadColumn>
                <TableHeadColumn minWidth={`200px`}>주민번호</TableHeadColumn>
                <TableHeadColumn minWidth={`180px`}>등록일</TableHeadColumn>
                <TableHeadColumn minWidth={`100px`}>수정</TableHeadColumn>
                <TableHeadColumn minWidth={`100px`}>삭제</TableHeadColumn>
              </TableWrapper>
            </Wrapper>

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
                      <TableWrapper
                        ju={`flex-start`}
                        isData={true}
                        width={`calc(50px + 140px + 160px + 120px + 150px + 200px + 400px + 200px + 180px + 100px + 100px + (1.5px * 10))`}
                      >
                        <TableHeadColumn isData={true} minWidth={`50px`}>
                          {idx + 1}
                        </TableHeadColumn>
                        <TableHeadColumn
                          isData={true}
                          minWidth={`140px`}
                          isSvg={true}
                        >
                          <Image
                            src={data.filePath}
                            width={`120px`}
                            height={`140px`}
                          />
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} minWidth={`160px`}>
                          {data.userId}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} minWidth={`120px`}>
                          {data.rank}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} minWidth={`150px`}>
                          {data.name}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} minWidth={`200px`}>
                          {data.mobile}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} minWidth={`400px`}>
                          {data.address}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} minWidth={`200px`}>
                          {data.securityNumber}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} minWidth={`180px`}>
                          {data.createdAt}
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} minWidth={`100px`}>
                          <CommonButton
                            width={`90%`}
                            height={`25px`}
                            kindOf={`check`}
                            onClick={() => changeUpdateModeHandler(data)}
                          >
                            수정
                          </CommonButton>
                        </TableHeadColumn>
                        <TableHeadColumn isData={true} minWidth={`100px`}>
                          <CommonButton
                            width={`90%`}
                            height={`25px`}
                            kindOf={`delete`}
                            onClick={() => deleteAdminUserHandler(data._id)}
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
          <Wrapper
            isBorder={true}
            al={`center`}
            ju={`space-between`}
            padding={`20px`}
            height={`500px`}
            isScroll={true}
          >
            <Wrapper>
              <Fade left delay={0}>
                <Wrapper
                  dr={`row`}
                  margin={`10px 0px 0px 0px`}
                  al={`center`}
                  ju={`center`}
                >
                  <InfoText width={`100px`}>아이디</InfoText>
                  <TextInput
                    width={`600px`}
                    height={`30px`}
                    {...inputUserId}
                    readOnly={currentMode === 1}
                  />
                </Wrapper>
              </Fade>
              {currentMode === 0 && (
                <Fade left delay={30}>
                  <Wrapper
                    dr={`row`}
                    margin={`10px 0px 0px 0px`}
                    al={`center`}
                    ju={`center`}
                  >
                    <InfoText width={`100px`}>비밀번호</InfoText>
                    <TextInput
                      type="password"
                      width={`600px`}
                      height={`30px`}
                      {...inputPassword}
                    />
                  </Wrapper>
                </Fade>
              )}
              <Fade left delay={60}>
                <Wrapper
                  dr={`row`}
                  margin={`10px 0px 0px 0px`}
                  al={`center`}
                  ju={`center`}
                >
                  <InfoText width={`100px`}>직급</InfoText>
                  <TextInput width={`600px`} height={`30px`} {...inputRank} />
                </Wrapper>
              </Fade>
              <Fade left delay={90}>
                <Wrapper
                  dr={`row`}
                  margin={`10px 0px 0px 0px`}
                  al={`center`}
                  ju={`center`}
                >
                  <InfoText width={`100px`}>성명</InfoText>
                  <TextInput width={`600px`} height={`30px`} {...inputName} />
                </Wrapper>
              </Fade>
              <Fade left delay={120}>
                <Wrapper
                  dr={`row`}
                  margin={`10px 0px 0px 0px`}
                  al={`center`}
                  ju={`center`}
                >
                  <InfoText width={`100px`}>연락처</InfoText>
                  <TextInput width={`600px`} height={`30px`} {...inputMobile} />
                </Wrapper>
              </Fade>
              <Fade left delay={150}>
                <Wrapper
                  dr={`row`}
                  margin={`10px 0px 0px 0px`}
                  al={`center`}
                  ju={`center`}
                >
                  <InfoText width={`100px`}>주소</InfoText>
                  <TextInput
                    width={`600px`}
                    height={`30px`}
                    {...inputAddress}
                  />
                </Wrapper>
              </Fade>
              <Fade left delay={180}>
                <Wrapper
                  dr={`row`}
                  margin={`10px 0px 0px 0px`}
                  al={`center`}
                  ju={`center`}
                >
                  <InfoText width={`100px`}>주민번호</InfoText>
                  <TextInput
                    width={`600px`}
                    height={`30px`}
                    {...inputSecurityNumber}
                  />
                </Wrapper>
              </Fade>
              <Fade left delay={210}>
                <Wrapper
                  dr={`row`}
                  margin={`10px 0px 0px 0px`}
                  al={`center`}
                  ju={`center`}
                >
                  <InfoText width={`100px`}>사진</InfoText>
                  <TextInput
                    width={`490px`}
                    height={`30px`}
                    {...inputFilePath}
                    readOnly
                  />
                  <FileInput
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/gif,image/png"
                    onChange={fileChangeHandler}
                  />
                  <CommonButton
                    margin={`0 0 0 10px`}
                    onClick={() => fileRef.current.click()}
                  >
                    업로드
                  </CommonButton>
                </Wrapper>
              </Fade>
              {isLoading && (
                <Wrapper margin={`10px 0`}>
                  <CircularIndeterminate />
                </Wrapper>
              )}
            </Wrapper>

            <Fade left delay={240}>
              <Wrapper
                al={`flex-end`}
                ju={`flex-end`}
                margin={`70px 0px 0px 0px`}
              >
                {currentMode === 0 ? (
                  <CommonButton
                    kindOf={`create`}
                    onClick={createAdminUserHandler}
                  >
                    등록하기
                  </CommonButton>
                ) : (
                  <CommonButton
                    kindOf={`update`}
                    onClick={updateAdminUserHandler}
                  >
                    수정하기
                  </CommonButton>
                )}
              </Wrapper>
            </Fade>
          </Wrapper>
        </Wrapper>
      )}
    </WholeWrapper>
  );
};
