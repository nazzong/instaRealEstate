import React, { useState, useEffect, Fragment } from "react";
import dynamic from "next/dynamic";
import {
  Image,
  RsWrapper,
  Wrapper,
  CommonButton,
} from "../../../Components/CommonComponents";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { appearAnimation } from "../../../Components/AnimationCommon";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
const Bounce = dynamic(import("react-reveal/Bounce"));
import Theme from "../../../Styles/Theme";
import { GET_ALLMENUS, GET_BLOGLINK } from "./LayoutQueries";
import { toast } from "react-nextjs-toast";
import Drawer from "@material-ui/core/Drawer";
import { IoIosArrowDown } from "react-icons/io";
import useInput from "../../../Components/Hooks/useInput";
import LogoSlider from "../../../Components/slider/LogoSlider";
import { useRouter } from "next/router";
import Link from "next/link";
import useWindowSize from "../../Hooks/useWindowSize";

const OnlyHeadAbsoluteWrapper = styled.div`
  display: flex;
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height};
  color: rgba(0, 0, 0);
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid ${(props) => props.theme.basicTheme_C};
  font-size: 13px;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `flex-start`};
  justify-content: ${(props) => props.ju || `center`};
  opacity: 0.3;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

const HeaderWrapper = styled.div`
  width: ${(props) => props.width || `100%`};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};
  color: ${(props) => props.theme.darkGrey_C};
  display: flex;
  background: ${(props) => props.bgColor};
  border-bottom: ${(props) => props.borderBottom};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  z-index: 1000;
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  position: ${(props) => (props.isFixed ? `fixed` : ``)};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin || `0 auto`};
  padding: ${(props) => props.padding};
  box-shadow: ${(props) => props.shadow};
  margin-bottom: 5px;
  transition: 0.4s;
`;

const H_Wrapper = styled.div`
  overflow: auto;
  width: ${(props) => props.width || `auto`};
  height: ${(props) => props.height || `100%`};
  color: ${(props) => props.theme.black_C};
  display: flex;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `flex-start`};
  justify-content: ${(props) => props.ju || `flex-start`};
  position: ${(props) => (props.isAbsolute ? `absolute` : ``)};
  position: ${(props) => (props.isRelative ? `relative` : ``)};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  transition: ${(props) => props.theme.transition};

  /* &:hover ${OnlyHeadAbsoluteWrapper} {
    display: flex;
    animation: ${appearAnimation} 1s forwards;
  } */
`;

const SubMenu = styled(Wrapper)`
  padding: 4px;
  font-size: 13px;
  background: ${(props) => props.bgColor};
`;

const MobileHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  display: ${(props) => props.display || `none`};
  color: #fff;
  background-color: #222;

  @media (max-width: 900px) {
    display: flex;
  }

  & svg {
    cursor: pointer;
    font-size: 25px;
    color: #fff;
  }
`;

const MobileMenu = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;
  z-index: 10000;
  animation: ${appearAnimation} 1s forwards;

  & .react-reveal {
    width: 100%;
  }

  & svg {
    cursor: pointer;
    font-size: 25px;
    color: #fff;
  }
`;

const ToggleSubMenu = styled(Wrapper)`
  display: ${(props) => (props.isHidden ? `flex` : `none`)};
  cursor: pointer;
`;

export const TextInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height || `30px`};
  border: ${(props) => props.theme.border};
  padding: ${(props) => props.padding || props.theme.inputPadding};
  border-radius: ${(props) => props.radius || `5px 0px 0px 5px`};
  transition: ${(props) => props.transition || props.theme.transition};
  margin: ${(props) => props.margin};
  background-color: #888;

  &:focus {
    background-color: #fff;
  }
`;

const Header = () => {
  const size = useWindowSize();

  const router = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  //state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);
  const [subMenu, setSubMenu] = useState([]);
  const [reload, setReload] = useState(false);

  const { data, loading, refetch } = useQuery(GET_ALLMENUS);
  const { data: blogData, refetch: blogRefetch } = useQuery(GET_BLOGLINK);

  const [currentIndex, setCurrentIndex] = useState(99);

  const inputSearch = useInput("");

  //handler
  const mobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const mobileSubMenuToggle = (idx, menu) => {
    setCurrentIndex(idx);
  };

  const bookmarkHandler = () => {
    if (typeof document !== "undefined" && typeof window !== "undefined") {
      let filter = "win16|win32|win64|mac";

      if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
          const domain = origin;
          const iconUrl = domain + "/app-icon-72x72.png";
          const title = "인스타부동산";
          util_addShoutCut(domain, iconUrl, title);
        } else {
          if (document.all) {
            window.external.AddFavorite(origin, "인스타부동산");
          } else if (window.chrome) {
            toast.notify("Ctrl+D키를 누르시면 즐겨찾기가 가능합니다.", {
              duration: 5,
              type: "success",
            });
          } else if (window.sidebar) {
            window.sidebar.addPanel("인스타부동산", origin, "");
          } else if (window.opera && window.print) {
            var elem = document.createElement("a");
            elem.setAttribute("href", origin);
            elem.setAttribute("title", "인스타부동산");
            elem.setAttribute("rel", "sidebar");
            elem.click();
          } else if (window.external) {
            window.external.AddFavorite(origin, "인스타부동산");
          }
        }
      }
    }
  };

  const util_addShoutCut = (url, iconUrl, title) => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/android/)) {
      const appUrl =
        "naversearchapp://addshortcut?url=" +
        encodeURIComponent(url) +
        "&icon=" +
        encodeURIComponent(iconUrl) +
        "&title=" +
        encodeURIComponent(title) +
        "&serviceCode=housechecklist&version=7";
      window.open(appUrl, "_blank");
    } else {
      toast.notify("해당 기기는 직접 홈 화면에 추가 버튼을 눌러야 합니다.", {
        duration: 5,
        type: "info",
      });

      return;
    }
  };

  const moveLinkHandler = (link) => {
    router.push(link);
  };

  const searchProductHandler = () => {
    router.push(`/search?search=${inputSearch.value}`);
  };

  //useEffect
  useEffect(() => {
    refetch();
    blogRefetch();
  }, []);

  useEffect(() => {
    setReload(!reload);
  }, [mobileSubMenu]);

  return (
    <HeaderWrapper
      isFixed={router.pathname.includes("product-detail") ? false : true}
      maxWidth={
        router.pathname.includes("product-detail") ? `375px !important` : `100%`
      }
      margin={`0 auto`}
      borderBottom={`1px solid ${Theme.basicTheme_C}`}
      shadow={`2px 2px 5px ${Theme.basicTheme_C}`}
      bgColor={`#222`}
    >
      <Wrapper
        width={
          router.pathname.includes("product-detail")
            ? `375px !important`
            : `80%`
        }
      >
        <Wrapper
          display={
            size.width < 900 || router.pathname.includes("product-detail")
              ? `none`
              : `flex`
          }
          dr={`row`}
          ju={`space-between`}
          al={`flex-start`}
          wrap={`nowrap`}
          height={`210px`}
        >
          <Wrapper
            width={`calc(100% - 200px)`}
            dr={`row`}
            ju={`flex-start`}
            al={`normal`}
            padding={`15px 0px`}
          >
            <H_Wrapper
              dr={`column`}
              width={`auto`}
              color={`#fff`}
              isRelative={true}
              margin={`0 15px 0 0`}
              borderRight={`1px solid #343434`}
            >
              {data &&
                data.getHeaderMenus.map((menu, activeIndex) => {
                  if (activeIndex !== 0) return null;

                  return (
                    <Fragment key={activeIndex}>
                      <SubMenu
                        width={`150px`}
                        al={`flex-start`}
                        fontSize={`16px`}
                        fontWeight={`700`}
                      >
                        <Wrapper
                          width={`auto`}
                          margin={`0 0 5px`}
                          isColorHover={true}
                        >
                          {menu.name === `인스타부동산` ? (
                            <a
                              href={
                                size.width < 700
                                  ? `https://m.place.naver.com/place/546762674/home?entry=pll`
                                  : `https://map.naver.com/v5/entry/place/546762674?c=14127300.9596318,4516282.0356190,15,0,0,0,dh`
                              }
                              target="_blank"
                            >
                              <Wrapper
                                al={`flex-start`}
                                isHeaderHover={true}
                                isColorHover={true}
                              >
                                {menu.name}
                              </Wrapper>
                            </a>
                          ) : (
                            <Link href={menu.link}>{menu.name}</Link>
                          )}
                        </Wrapper>

                        {(activeIndex === 0 ||
                          activeIndex === data.getHeaderMenus.length - 1) &&
                          menu.subMenu.map((subMenu, subMenuIndex) => {
                            return (
                              <Wrapper
                                key={subMenuIndex}
                                width={`auto`}
                                margin={`5px 0`}
                                isColorHover={true}
                              >
                                {subMenu.link === "/store/location" ? (
                                  <a
                                    href={`https://map.naver.com/v5/directions/14128984.237911794,4516938.722619984,%ED%99%8D%EB%8C%80%EC%9E%85%EA%B5%AC%EC%97%AD1%EB%B2%88%EC%B6%9C%EA%B5%AC,21406142,PLACE_POI/14128453.499975536,4517039.166352909,%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B3%B5%EC%9D%B8%EC%A4%91%EA%B0%9C%EC%82%AC%EC%82%AC%EB%AC%B4%EC%86%8C,546762674,PLACE_POI/-/transit?c=14128617.3224105,4516960.4934378,17,0,0,0,dh`}
                                    target="_blank"
                                  >
                                    <Wrapper
                                      al={`flex-start`}
                                      isHeaderHover={true}
                                      isColorHover={true}
                                    >
                                      {subMenu.name}
                                    </Wrapper>
                                  </a>
                                ) : subMenu.link === "/store/blog" ? (
                                  <a
                                    href={blogData && blogData.getBlogLink.link}
                                    target="_blank"
                                  >
                                    <Wrapper
                                      al={`flex-start`}
                                      isHeaderHover={true}
                                      isColorHover={true}
                                    >
                                      {subMenu.name}
                                    </Wrapper>
                                  </a>
                                ) : subMenu.link === "/store/bookmark" ? (
                                  <Wrapper
                                    al={`flex-start`}
                                    isHeaderHover={true}
                                    cursor={`pointer`}
                                    onClick={bookmarkHandler}
                                    isColorHover={true}
                                  >
                                    {subMenu.name}
                                  </Wrapper>
                                ) : (
                                  <Link href={subMenu.link}>
                                    {subMenu.name}
                                  </Link>
                                )}
                              </Wrapper>
                            );
                          })}
                      </SubMenu>
                    </Fragment>
                  );
                })}
            </H_Wrapper>

            <H_Wrapper
              dr={`column`}
              width={`auto`}
              height={`180px`}
              color={`#fff`}
              isRelative={true}
            >
              {data &&
                data.getHeaderMenus.map((menu, activeIndex) => {
                  if (!menu.isProduct) return null;

                  return (
                    <Fragment key={activeIndex}>
                      <SubMenu
                        width={`150px`}
                        al={`flex-start`}
                        fontSize={`16px`}
                        fontWeight={`700`}
                        onMouseOver={() => setSubMenu(menu.subMenu)}
                      >
                        <Wrapper
                          width={`auto`}
                          margin={`0 0 5px`}
                          isColorHover={true}
                        >
                          <Link href={menu.link}>{menu.name}</Link>
                        </Wrapper>
                      </SubMenu>
                    </Fragment>
                  );
                })}
            </H_Wrapper>

            {subMenu && subMenu.length > 0 && (
              <H_Wrapper
                dr={`column`}
                width={`auto`}
                color={`#fff`}
                height={`180px`}
                isRelative={true}
              >
                {subMenu.map((subMenu, subMenuIndex) => {
                  return (
                    <Fragment key={subMenuIndex}>
                      <SubMenu
                        width={`150px`}
                        al={`flex-start`}
                        fontSize={`16px`}
                        fontWeight={`700`}
                      >
                        <Wrapper
                          width={`auto`}
                          margin={`0 0 5px`}
                          color={`#eee`}
                          fontWeight={`300`}
                          borderBottom={`1px solid #6a6a6a`}
                          isColorHover={true}
                        >
                          <Link href={subMenu.link}>{subMenu.name}</Link>
                        </Wrapper>
                      </SubMenu>
                    </Fragment>
                  );
                })}
              </H_Wrapper>
            )}

            <H_Wrapper
              dr={`column`}
              width={`auto`}
              color={`#fff`}
              isRelative={true}
              borderLeft={`1px solid #343434`}
              padding={`0 0 0 15px`}
            >
              {data &&
                data.getHeaderMenus.map((menu, activeIndex) => {
                  if (activeIndex === 0 || menu.isProduct) return null;

                  return (
                    <Fragment key={activeIndex}>
                      <SubMenu
                        width={`150px`}
                        al={`flex-start`}
                        fontSize={`16px`}
                        fontWeight={`700`}
                      >
                        <Wrapper
                          width={`auto`}
                          margin={`0 0 5px`}
                          isColorHover={true}
                        >
                          <Link href={menu.link}>{menu.name}</Link>
                        </Wrapper>

                        {menu.subMenu.map((subMenu, subMenuIndex) => {
                          return (
                            <Wrapper
                              key={subMenuIndex}
                              width={`auto`}
                              margin={`5px 0`}
                              isColorHover={true}
                            >
                              <Link href={subMenu.link}>{subMenu.name}</Link>
                            </Wrapper>
                          );
                        })}
                      </SubMenu>
                    </Fragment>
                  );
                })}
            </H_Wrapper>
          </Wrapper>

          <Wrapper width={`200px`} margin={`15px 0 0`}>
            <LogoSlider
              datum={[
                "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo_01.png?alt=media&token=b1406d14-1cc9-4368-936d-f248e87b76fd",
                "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo_02.png?alt=media&token=8cd9f4f7-3158-45d0-800b-897d05245694",
              ]}
            />

            <Wrapper dr={`row`} margin={`10px 0  0`}>
              <TextInput
                type="text"
                width={`calc(100% - 50px)`}
                {...inputSearch}
                onKeyDown={(e) => e.keyCode === 13 && searchProductHandler()}
              />
              <CommonButton
                width={`50px`}
                radius={`0px 5px 5px 0px`}
                onClick={searchProductHandler}
              >
                검색
              </CommonButton>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>

      <MobileHeader
        display={
          router.pathname.includes("product-detail")
            ? `flex !important`
            : `none`
        }
      >
        <Wrapper isRelative={true} dr={`row`}>
          <Wrapper isAbsolute={true} left={`10px`} width={`auto`}>
            {mobileMenuOpen ? (
              <AiOutlineClose onClick={mobileMenuToggle} />
            ) : (
              <AiOutlineMenu
                onClick={() =>
                  // location.pathname === `/`
                  //   ? mobileMenuToggle()
                  //   :
                  moveLinkHandler(`/`)
                }
              />
            )}
          </Wrapper>

          <LogoSlider
            datum={[
              "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo_01.png?alt=media&token=b1406d14-1cc9-4368-936d-f248e87b76fd",
              "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo_02.png?alt=media&token=8cd9f4f7-3158-45d0-800b-897d05245694",
            ]}
          />
        </Wrapper>

        <Drawer open={mobileMenuOpen}>
          <MobileMenu>
            <Wrapper al={`flex-end`} padding={`10px`}>
              <AiOutlineClose onClick={mobileMenuToggle} />
            </Wrapper>

            <Wrapper>
              {data &&
                data.getHeaderMenus.map((menu, activeIndex) => {
                  return (
                    <Fragment key={menu.name}>
                      <Wrapper
                        al={`flex-start`}
                        padding={`5px 10px`}
                        cursor={`pointer`}
                      >
                        <Wrapper
                          dr={`row`}
                          ju={`space-between`}
                          borderBottom={`1.5px solid #F2C321`}
                          padding={`10px`}
                          fontSize={`16px`}
                          margin={`0px 0px 5px`}
                          onClick={() => mobileSubMenuToggle(activeIndex, menu)}
                        >
                          {menu.name} <IoIosArrowDown />
                        </Wrapper>
                        <ToggleSubMenu isHidden={currentIndex === activeIndex}>
                          {menu.subMenu.map((sub, idx) => {
                            return (
                              <Bounce key={idx} delay={idx * 50}>
                                {sub.link === "/store/blog" ? (
                                  <a
                                    href={`https://m.blog.naver.com/real-instar`}
                                    target="_blank"
                                  >
                                    <Wrapper
                                      padding={`0 20px`}
                                      al={`flex-start`}
                                      lineHeight={`1.4`}
                                      isHeaderHover={true}
                                    >
                                      {sub.name}
                                    </Wrapper>
                                  </a>
                                ) : sub.link === "/store/bookmark" ? (
                                  <Wrapper
                                    padding={`0 20px`}
                                    al={`flex-start`}
                                    lineHeight={`1.4`}
                                    isHeaderHover={true}
                                    cursor={`pointer`}
                                    onClick={bookmarkHandler}
                                  >
                                    {sub.name}
                                  </Wrapper>
                                ) : (
                                  <Link href={sub.link}>
                                    <Wrapper
                                      padding={`0 20px`}
                                      al={`flex-start`}
                                      lineHeight={`1.4`}
                                      isHeaderHover={true}
                                    >
                                      {sub.name}
                                    </Wrapper>
                                  </Link>
                                )}
                              </Bounce>
                            );
                          })}
                        </ToggleSubMenu>
                      </Wrapper>
                    </Fragment>
                  );
                })}
            </Wrapper>
          </MobileMenu>
        </Drawer>
      </MobileHeader>
    </HeaderWrapper>
  );
};

export default Header;
