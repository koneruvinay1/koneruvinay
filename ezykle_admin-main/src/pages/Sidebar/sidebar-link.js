import React, { useState } from "react";
import {
  FaAngleDown,
  FaAngleRight,
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ item, isMenuExpand, activeMenu, selectedMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subnav, setSubnav] = useState(false);
  const [subnavIndex, setSubnavIndex] = useState();

  const toggle = () => setIsOpen(!isOpen);
  const showSubNav = () => {
    setSubnav(!subnav);
  };

  return (
    <>
      {item.path === "" ? (
        <NavLink
          className={activeMenu === item.name ? "link side-subnav-active" : "link" }
          // activeclassname="side-nav-active"
          onClick={() => {
            selectedMenu(item.name);
            showSubNav();
          }}
        >
          <div className="icon">{item.icon}</div>
          <div
            style={{ display: isMenuExpand ? "none" : "block" }}
            className="link_text"
          >
            {item.name}{" "}
            {item.subnav &&
              item.subnav.length > 0 &&
              (subnav ? <FaAngleDown /> : <FaAngleRight />)}
          </div>
        </NavLink>
      ) : (
        <NavLink
          to={item.path}
          className={activeMenu === item.name ? "link side-nav-active" : "link"}
          // activeclassname="side-nav-active"
          onClick={() => {
            selectedMenu(item.name);
            showSubNav();
          }}
        >
          <div className="icon">{item.icon}</div>
          <div
                          style={{ display: isMenuExpand ? "none" : "block" }}
            className="link_text"
          >
            {item.name}{" "}
            {item.subnav &&
              item.subnav.length > 0 &&
              (subnav ? <FaAngleDown /> : <FaAngleRight />)}
          </div>
        </NavLink>
      )}

      <div className="subMenu">
        {subnav &&
          item.subnav.map((subLink, subMenuIndex) => {
            return (
              <NavLink
                to={subLink.path}
                // activeclassname="side-nav-active"
                key={subMenuIndex}
                className={activeMenu === item.name ? "link side-subnav-active" : "link" }
              >
                <div className="icon">{subLink.icon}</div>

                    <div style={{ display: isMenuExpand ? "none" : "block" }}>{subLink.name} </div>
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default SidebarLink;
