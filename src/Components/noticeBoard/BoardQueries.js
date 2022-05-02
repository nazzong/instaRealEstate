import { gql } from "apollo-boost";

export const GET_NOTICEBOARD_DETAIL = gql`
  query getNoticeBoardDetailClient($id: String!) {
    getNoticeBoardDetailClient(id: $id) {
      _id
      title
      createdAt
      description
    }
  }
`;

export const GET_NOTICEBOARD_NEXT_ID = gql`
  query getNoticeBoardNextId($id: String!) {
    getNoticeBoardNextId(id: $id) {
      _id
    }
  }
`;

export const GET_NOTICEBOARD_BEFORE_ID = gql`
  query getNoticeBoardBeforeId($id: String!) {
    getNoticeBoardBeforeId(id: $id) {
      _id
    }
  }
`;
