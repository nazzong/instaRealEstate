import { gql } from "apollo-boost";

export const GET_EVENTBOARD = gql`
  query getEventBoardClient($limit: Int!, $currentPage: Int!) {
    getEventBoardClient(limit: $limit, currentPage: $currentPage) {
      _id
      title
      eventTerm
      thumbnail
    }
  }
`;

export const GET_EVENTBOARD_TOTALPAGE = gql`
  query getEventBoardTotalPageClient($limit: Int!) {
    getEventBoardTotalPageClient(limit: $limit)
  }
`;
