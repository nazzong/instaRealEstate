import React, { useState } from "react";
import {
  WholeWrapper,
  Wrapper,
  SideMenu,
  SubMenus,
  SubMenu,
} from "../../../Components/AdminCommonComponents";

import { allMenus } from "./adminMenus";
import { MdExpandMore } from "react-icons/md";
import Bounce from "react-reveal/Bounce";
import Link from "next/link";
import Router from "next/router";

const A_Side = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const _openSubMenu = (event, tab) => {
    setCurrentTab(tab);
  };

  const moveLinkHandler = (link) => {
    document.location.href = link;
  };

  return (
    <WholeWrapper padding={`10px`}>
      {allMenus.map((menu, idx) => {
        return (
          <Wrapper
            al={`flex-start`}
            ju={`flex-start`}
            margin={`0px 0px 5px 0px`}
            key={idx}
          >
            {idx === 0 ? (
              <SideMenu
                onClick={(event) => _openSubMenu(event, idx)}
                isActive={idx === currentTab}
              >
                {menu.menuName}
              </SideMenu>
            ) : (
              <React.Fragment>
                <SideMenu
                  onClick={(event) => _openSubMenu(event, idx)}
                  isActive={idx === currentTab}
                >
                  {menu.menuName}
                  <MdExpandMore />
                </SideMenu>
                <SubMenus isActive={idx === currentTab}>
                  {typeof window !== `undefined` &&
                    menu.subMenu &&
                    menu.subMenu.map((sub, idx) => {
                      if (
                        !sub.right.includes(
                          parseInt(sessionStorage.getItem("XLJHALKJQLIUXMXA"))
                        )
                      )
                        return null;

                      return (
                        <Bounce key={idx} delay={idx * 150}>
                          <SubMenu
                            onClick={() => moveLinkHandler(sub.subMenuLink)}
                          >
                            {sub.subMenuName}
                          </SubMenu>
                        </Bounce>
                      );
                    })}
                </SubMenus>
              </React.Fragment>
            )}
          </Wrapper>
        );
      })}
    </WholeWrapper>
  );
};

export default A_Side;
