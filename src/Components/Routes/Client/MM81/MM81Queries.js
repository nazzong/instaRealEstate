import { gql } from "apollo-boost";

export const GET_FAQTYPE = gql`
  query getFaqType {
    getFaqType {
      _id
      typeName
    }
  }
`;

export const GET_FAQDETAIL = gql`
  query getFaqDetail($typeName: String!) {
    getFaqDetail(typeName: $typeName) {
      _id
      type
      question
      answer
    }
  }
`;
