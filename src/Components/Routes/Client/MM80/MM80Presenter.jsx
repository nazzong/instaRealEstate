import React from "react";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  CommonSubTitle,
  SubjectTitle,
} from "../../../../Components/CommonComponents";
import dynamic from "next/dynamic";
import { withResizeDetector } from "react-resize-detector";
import useWindowSize from "../../../Hooks/useWindowSize";

const Board = dynamic(import("../../../../Components/noticeBoard/Board"));

const MM80Presenter = ({
  width,
  //
  searchValue,
  pages,
  setPages,
  currentPage,
  setCurrentPage,
  currentList,
  limit,
  sortValue,
  //
  noticeDatum,
  totalCnt,
  //
  moveLinkHandler,
  prevAndNextPageChangeNoticeHandler,
  changePageHandler,
}) => {
  const size = useWindowSize();

  return (
    <WholeWrapper
      ju={`flex-start`}
      minHeight={`90vh`}
      padding={size.width < 900 ? `70px 0 0` : `210px 0 0`}
    >
      <RsWrapper>
        <Wrapper>
          <SubjectTitle margin={`50px 0px 10px 0px`}>공지사항</SubjectTitle>
          <CommonSubTitle margin={`0px 0px 40px`}>NOTICE</CommonSubTitle>
        </Wrapper>

        <Board
          searchValue={searchValue}
          pages={pages}
          setPages={setPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentList={currentList}
          limit={limit}
          sortValue={sortValue}
          //
          noticeDatum={noticeDatum}
          totalCnt={totalCnt}
          //
          moveLinkHandler={moveLinkHandler}
          prevAndNextPageChangeNoticeHandler={
            prevAndNextPageChangeNoticeHandler
          }
          changePageHandler={changePageHandler}
        />
      </RsWrapper>
    </WholeWrapper>
  );
};

export default withResizeDetector(MM80Presenter);
