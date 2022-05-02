import { gql } from "apollo-boost";

export const GET_MENU_FOR_ADMIN = gql`
  query getMenuForAdmin {
    getMenuForAdmin {
      _id
      name
      link
      subMenu {
        _id
        name
        link
        useYn
        sort
      }
      sort
      useYn
    }
  }
`;

export const MODIFY_MENU_USEYN = gql`
  mutation modifyMenuUseYn($id: String!, $useYn: Boolean!) {
    modifyMenuUseYn(id: $id, useYn: $useYn)
  }
`;

export const MODIFY_SUB_MENU_USEYN = gql`
  mutation modifySubMenuUseYn($id: String!, $useYn: Boolean!) {
    modifySubMenuUseYn(id: $id, useYn: $useYn)
  }
`;

export const MODIFY_MENU_SORT = gql`
  mutation modifyMenuSort($id: String!, $sort: Int!) {
    modifyMenuSort(id: $id, sort: $sort)
  }
`;

export const MODIFY_SUB_MENU_SORT = gql`
  mutation modifySubMenuSort($id: String!, $sort: Int!) {
    modifySubMenuSort(id: $id, sort: $sort)
  }
`;

export const DELETE_MENU = gql`
  mutation deleteMenu($id: String!) {
    deleteMenu(id: $id)
  }
`;

export const DELETE_SUB_MENU = gql`
  mutation deleteSubMenu($id: String!) {
    deleteSubMenu(id: $id)
  }
`;

export const CREATE_MENU = gql`
  mutation createMenu($name: String!, $sort: Int!, $isCategory: Boolean!) {
    createMenu(name: $name, sort: $sort, isCategory: $isCategory)
  }
`;

export const CREATE_SUB_MENU = gql`
  mutation createSubMenu($parentMenu: String!, $name: String!, $sort: Int!) {
    createSubMenu(parentMenu: $parentMenu, name: $name, sort: $sort)
  }
`;
