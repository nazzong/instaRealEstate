import { gql } from "apollo-boost";

export const GET_EVENTBOARD_DETAIL = gql`
  query getEventBoardDetail($id: String!) {
    getEventBoardDetail(id: $id) {
      _id
      title
      createdAt
      eventTerm
      description
    }
  }
`;

export const GET_EVENTBOARD_NEXT_ID = gql`
  query getEventBoardNextId($id: String!) {
    getEventBoardNextId(id: $id) {
      _id
    }
  }
`;

export const GET_EVENTBOARD_BEFORE_ID = gql`
  query getEventBoardBeforeId($id: String!) {
    getEventBoardBeforeId(id: $id) {
      _id
    }
  }
`;
