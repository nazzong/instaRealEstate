import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { withResizeDetector } from "react-resize-detector";
import { toast } from "react-nextjs-toast";
import styled from "styled-components";
import {
  CommonButton,
  RsWrapper,
  WholeWrapper,
  Wrapper,
} from "../CommonComponents";

import Theme from "../../Styles/Theme";
import {
  GET_EVENTBOARD_BEFORE_ID,
  GET_EVENTBOARD_DETAIL,
  GET_EVENTBOARD_NEXT_ID,
} from "./BoardQueries";
import CircularIndeterminate from "../loading/CircularIndeterminate";
import { useRouter } from "next/router";
import useWindowSize from "../Hooks/useWindowSize";

const Board_D_title = styled.h2`
  width: 100%;
  padding: 10px;
  font-size: 22px;
  font-weight: 700;
`;

const Board_D = styled.ul`
  width: 100%;
  height: ${(props) => (props.height ? props.height : `40px`)};
  display: flex;
  flex-direction: row;
  align-items: center;

  background: ${(props) => props.bgColor};

  @media (max-width: 700px) {
    flex-direction: column;
    height: auto;
  }
`;

const Board_D_List = styled.li`
  width: ${(props) => props.width};
  line-height: 40px;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  text-align: ${(props) => props.ta || `center`};
  padding: ${(props) => (props.padding ? props.padding : `0px 10px`)};
  box-shadow: ${(props) => props.theme.boxShadowV3};
  border-radius: ${(props) => props.radius};
`;

const Board_D_Desc = styled.div`
  width: 100%;
  min-height: 500px;
  padding: 15px;
  line-height: 1.4;
  box-shadow: ${(props) => props.theme.boxShadowV3};
`;

export default withResizeDetector(({ width }) => {
  ////////////// - VARIABLES- ///////////////
  const size = useWindowSize();

  const router = useRouter();
  const query = router.query;

  ////////////// - USE STATE- ///////////////
  const [currentData, setCurrentData] = useState(null);

  ///////////// - USE QUERY- ////////////////
  const {
    data: eventData,
    loading: eventLoading,
    refetch: eventRefetch,
  } = useQuery(GET_EVENTBOARD_DETAIL, {
    variables: {
      id: query[":key"],
    },
  });

  const {
    data: eventNextData,
    loading: eventNextLoading,
    refetch: eventNextRefetch,
  } = useQuery(GET_EVENTBOARD_NEXT_ID, {
    variables: {
      id: query[":key"],
    },
  });

  const {
    data: eventBeforeData,
    loading: eventBeforeLoading,
    refetch: eventBeforeRefetch,
  } = useQuery(GET_EVENTBOARD_BEFORE_ID, {
    variables: {
      id: query[":key"],
    },
  });

  ///////////// - USE MUTATION- /////////////

  ///////////// - EVENT HANDLER- ////////////
  const _moveNextBoard = () => {
    if (eventNextData.getEventBoardNextId === null) {
      toast.notify("마지막 글 입니다.", {
        duration: 5,
        type: "error",
      });
      return null;
    }

    router.push(eventNextData.getEventBoardNextId._id);
  };

  const _moveBeforeBoard = () => {
    if (eventBeforeData.getEventBoardBeforeId === null) {
      toast.notify("첫번째 글 입니다.", {
        duration: 5,
        type: "error",
      });
      return null;
    }

    router.push(eventBeforeData.getEventBoardBeforeId._id);
  };

  const _moveListBoard = () => {
    router.push("/community/eventBoard");
  };

  ///////////// - USE EFFECT- ///////////////
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (eventData && eventData.getEventBoardDetail) {
        let tempData = eventData.getEventBoardDetail;

        const desc = document.getElementById("event_description-js");

        if (desc !== null) {
          desc.innerHTML = tempData.description;
          setCurrentData(tempData);
        }
      }
    }
  }, [eventData]);

  useEffect(() => {
    eventRefetch();
    eventNextRefetch();
    eventBeforeRefetch();
  });

  return (
    <WholeWrapper padding={size.width < 900 ? `100px 0 40px` : `250px 0 50px`}>
      <RsWrapper>
        <Wrapper>
          <Board_D_title>
            {currentData ? currentData.title : <CircularIndeterminate />}
          </Board_D_title>
          <Board_D>
            <Board_D_List
              bgColor={Theme.basicTheme_C}
              width={size.width < 700 ? `100%` : `150px`}
            >
              기간
            </Board_D_List>
            <Board_D_List
              width={
                size.width < 700 ? `100%` : `calc((100% - 150px - 150px)/2)`
              }
            >
              {currentData ? currentData.eventTerm : <CircularIndeterminate />}
            </Board_D_List>
            <Board_D_List
              bgColor={Theme.basicTheme_C}
              width={size.width < 700 ? `100%` : `150px`}
            >
              등록일
            </Board_D_List>
            <Board_D_List
              width={
                size.width < 700 ? `100%` : `calc((100% - 150px - 150px)/2)`
              }
            >
              {currentData ? (
                currentData.createdAt.substring(0, 13)
              ) : (
                <CircularIndeterminate />
              )}
            </Board_D_List>
          </Board_D>

          <Board_D_Desc
            id="event_description-js"
            className="ql-editor"
          ></Board_D_Desc>

          <Wrapper margin={`30px 0px 0px`} ju={`flex-end`} dr={`row`}>
            <CommonButton
              width={`80px`}
              margin={`0px 10px 0px 0px`}
              onClick={_moveListBoard}
            >
              목록
            </CommonButton>

            <CommonButton
              width={`80px`}
              kindOf={`white`}
              margin={`0px 10px 0px 0px`}
              onClick={_moveBeforeBoard}
            >
              이전
            </CommonButton>
            <CommonButton
              width={`80px`}
              kindOf={`white`}
              onClick={_moveNextBoard}
            >
              다음
            </CommonButton>
          </Wrapper>
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
});
