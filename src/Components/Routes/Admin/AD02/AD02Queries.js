import { gql } from "apollo-boost";

export const GET_MAINBANNER = gql`
  query getMainBanner {
    getMainBanner {
      _id
      imagePath
      title
      content
      link
    }
  }
`;

export const MODIFY_MAINBANNER = gql`
  mutation modifyMainBanner(
    $id: String!
    $title: String!
    $content: String!
    $link: String!
  ) {
    modifyMainBanner(id: $id, title: $title, content: $content, link: $link)
  }
`;

export const MODIFY_MAINBANNER_IMAGEPATH = gql`
  mutation modifyMainBannerImagePath($id: String!, $imagePath: String!) {
    modifyMainBannerImagePath(id: $id, imagePath: $imagePath)
  }
`;
