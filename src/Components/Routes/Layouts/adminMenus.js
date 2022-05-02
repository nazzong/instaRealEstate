export const allMenus = [
  {
    menuName: "관리자 메인",
    link: "/admin",
  },
  {
    menuName: "통계 관리",
    subMenu: [
      {
        subMenuName: "접속자 통계",
        subMenuLink: "/admin/statManagement",
        right: [0, 1, 2],
      },
    ],
  },
  {
    menuName: "화면 관리",
    subMenu: [
      {
        subMenuName: "팝업 관리",
        subMenuLink: "/admin/popupManagement",
        right: [0, 1, 2],
      },
      {
        subMenuName: "메인베너 관리",
        subMenuLink: "/admin/mainBannerManagement",
        right: [0, 1, 2],
      },
      {
        subMenuName: "하단정보 관리",
        subMenuLink: "/admin/footerInfoManagement",
        right: [0, 1, 2],
      },
    ],
  },
  {
    menuName: "게시판 관리",
    subMenu: [
      {
        subMenuName: "공지사항 유형 관리",
        subMenuLink: "/admin/noticeTypeManagement",
        right: [0, 1, 2],
      },
      {
        subMenuName: "공지사항 관리",
        subMenuLink: "/admin/noticeManagement",
        right: [0, 1, 2],
      },
      {
        subMenuName: "자주묻는 질문 관리",
        subMenuLink: "/admin/faqManagement",
        right: [0, 1, 2],
      },
      {
        subMenuName: "이벤트 등록",
        subMenuLink: "/admin/eventBoardManagement",
        right: [0, 1, 2],
      },
      {
        subMenuName: "이벤트 게시판 관리",
        subMenuLink: "/admin/eventBoardListManagement",
        right: [0, 1, 2],
      },
    ],
  },
  {
    menuName: "기본사항 관리",
    subMenu: [
      {
        subMenuName: "메뉴/카테고리 관리",
        subMenuLink: "/admin/menuManagement",
        right: [0, 1, 2],
      },
      {
        subMenuName: "블로그 링크 관리",
        subMenuLink: "/admin/blogLinkManagement",
        right: [0, 1, 2],
      },
      {
        subMenuName: "부동산 정보 관리",
        subMenuLink: "/admin/estateManagement",
        right: [0, 1, 2],
      },
    ],
  },
  {
    menuName: "회원 관리",
    subMenu: [
      {
        subMenuName: "일반회원 관리",
        subMenuLink: "/admin/userManagement",
        right: [0, 1, 2],
      },
      {
        subMenuName: "직원회원 관리",
        subMenuLink: "/admin/adminUserManagement",
        right: [0, 1],
      },
    ],
  },
  {
    menuName: "매물 관리",
    subMenu: [
      {
        subMenuName: "매물 리스트",
        subMenuLink: "/admin/productManagement",
        right: [0, 2],
      },
      {
        subMenuName: "총 매물 리스트",
        subMenuLink: "/admin/totalProductManagement",
        right: [0, 1],
      },
      {
        subMenuName: "매물 등록",
        subMenuLink: "/admin/registProductManagement",
        right: [0, 1, 2],
      },
    ],
  },
];
