import { gql } from "apollo-boost";

export const GET_BLOG_LINK = gql`
  query getBlogLink {
    getBlogLink {
      _id
      link
    }
  }
`;

export const MODIFY_BLOG_LINK = gql`
  mutation modifyBlogLink($id: String!, $link: String!) {
    modifyBlogLink(id: $id, link: $link)
  }
`;
