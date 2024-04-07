import React, { useContext, useState } from "react";

import {
  FaBars,
  FaCcDinersClub,
  FaUserLock,
  FaCuttlefish,
  FaUserTie,
  FaUsers,
  FaStore,
  FaUserSecret,
  FaUser,
} from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import {
  TbRecharging,
  TbCricket,
  TbPlayFootball,
  TbReportAnalytics,
  TbAlignBoxBottomCenterFilled,
  TbReportMoney,
} from "react-icons/tb";
import {
  AiFillDashboard,
  AiOutlineWallet,
  AiOutlineTransaction,
  AiOutlineDribbble,
} from "react-icons/ai";
import { GiHound, GiProfit, GiRingmaster } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { CgGames } from "react-icons/cg";
import { FcSportsMode, FcCurrencyExchange } from "react-icons/fc";
import { PiNewspaperClippingThin } from "react-icons/pi";
import {
  MdSportsKabaddi,
  MdSportsTennis,
  MdSportsHockey,
  MdDashboard,
  MdCasino,
  MdAccountBox,
  MdSupportAgent,
  MdHistoryEdu,
  MdWorkHistory,
} from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import SidebarLink from "./sidebar-link";
import { Container, Navbar } from "react-bootstrap";
import {
  checkUserAccess,
  isAuthenticated,
  logoutUser,
} from "../../network/service/UserService";

let selctedMenu;
const Sidebar = ({ children }) => {
  let addressUrl = new URL(window.location.href);
  let pathName = addressUrl.pathname.split("/");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [subnav, setSubnav] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [subnavIndex, setSubnavIndex] = useState();

  const toggle = () => setIsOpen(!isOpen);
  const showSubNav = (mainIndex) => {
    setSubnav(!subnav);
    setSubnavIndex(mainIndex);
  };

  const logout = async () => {
    await localStorage.setItem("authToken", "");
    await logoutUser();
    navigate("/login");
  };

  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <MdDashboard />,
      subnav: [],
      roles: ["1"],
    },

    {
      path: "",
      name: "Utils",
      icon: <FaCuttlefish />,
      subnav: [
        {
          path: "/categories",
          name: "Categories",
          icon: <MdSupportAgent />,
          subnav: [],
          roles: ["admin", "employee"],
        },
        {
          path: "/subctegories",
          name: "SubCtegories",
          icon: <MdHistoryEdu />,
          subnav: [],
          roles: ["admin", "employee"],
        },
        {
          path: "/tags",
          name: "Tags",
          icon: <MdHistoryEdu />,
          subnav: [],
          roles: ["admin", "employee"],
        },
      ],
      roles: ["admin", "employee"],
    },
    {
      path: "",
      name: "Users",
      icon: <FaUsers />,
      subnav: [
        {
          path: "/admin",
          name: "Admin",
          icon: <RiAdminFill />,
          subnav: [],
          roles: ["admin", "employee"],
        },
        {
          path: "/agent",
          name: "Employee",
          icon: <MdSupportAgent />,
          subnav: [],
          roles: ["admin", "employee"],
        },
        {
          path: "/user",
          name: "App Users",
          icon: <FaUserSecret />,
          subnav: [],
          roles: ["admin", "employee"],
        },
      ],
      roles: ["admin", "employee"],
    },

    {
      path: "Product",
      name: "Products",
      icon: <PiNewspaperClippingThin />,
      subnav: [],
      roles: ["admin", "employee"],
    },

    {
      path: "",
      name: "Orders",
      icon: <PiNewspaperClippingThin />,
      subnav: [
        {
          path: "Order",
          name: "Order",
          icon: <PiNewspaperClippingThin />,
          subnav: [],
          roles: ["admin", "employee"],
        },
        {
          path: "TrackOrder",
          name: "TrackOrder",
          icon: <PiNewspaperClippingThin />,
          subnav: [],
          roles: ["admin", "employee"],
        },
      ],
      roles: ["admin", "employee"],
    },
    {
      path: "",
      name: "Reports",
      icon: <TbReportAnalytics />,
      subnav: [
        {
          path: "/Today",
          name: "Today",
          icon: <TbAlignBoxBottomCenterFilled />,
          subnav: [],
          roles: ["admin", "employee"],
        },
        {
          path: "/Weekly",
          name: "Weekly",
          icon: <FaClipboardUser />,
          subnav: [],
          roles: ["admin", "employee"],
        },
        {
          path: "/Monthly",
          name: "Monthly",
          icon: <MdAccountBox />,
          subnav: [],
          roles: ["admin", "employee"],
        },
        {
          path: "/transaction",
          name: "Custom",
          icon: <GrTransaction />,
          subnav: [],
          roles: ["admin", "employee"],
        },
      ],
      roles: ["admin", "employee"],
    },
  ];

  return (
    <>
      {pathName[1] !== "login" && isAuthenticated() ? (
        <div className="sidenav-layout">
          <div
            style={{ width: isOpen ? "60px" : "200px", transition: "all 0.5s" }}
            className="sidebar"
          >
            <div className="top_section">
              {/* <img
                style={{
                  display: isOpen ? "none" : "block",
                  height: 35,
                }}
                className="logo"
                src=""
              /> */}

              <p
                style={{
                  display: isOpen ? "none" : "block",
                  padding: "10px",
                  color: "#FFFFFF",
                }}
              >
                Ezykle
              </p>
              <div
                style={{ marginLeft: isOpen ? "0px" : "50px" }}
                className="bars"
              >
                <FaBars onClick={toggle} />
              </div>
            </div>
            <div className="mnu">
              {menuItem.map(
                (item, menuIndex) =>
                  // <SidebarLink item={item} isMenuExpand={isOpen} />
                  checkUserAccess(item.roles) && (
                    <SidebarLink
                      key={menuIndex}
                      item={item}
                      isMenuExpand={isOpen}
                      activeMenu={activeMenu}
                      selectedMenu={(menu) => {
                        setActiveMenu(menu);
                      }}
                    />
                  )
              )}
            </div>
          </div>

          <div
            className="dsply-desktp"
            style={{
              position: "Fixed",
              width: "100%",
              zIndex: 9,
              // marginLeft: isOpen ? "200px" : "60px"
            }}
          >
            <Navbar collapseOnSelect expand="lg">
              <div className="container-fluid">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto"></Nav>
                  <Nav>
                    <NavDropdown
                      title={
                        <img
                          style={{ height: 30, width: 28 }}
                          className="logo"
                          src="https://cdn.icon-icons.com/icons2/1919/PNG/512/avatarinsideacircle_122011.png"
                        />
                      }
                      id="collasible-nav-dropdown"
                    >
                      <NavDropdown.Item
                        onClick={() => navigate("/changepassword")}
                      >
                        Change Password
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => navigate("/changepassword")}
                      >
                        My Account
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => logout()}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </div>
            </Navbar>
          </div>

          <div className="mble-dsply mble-dsply1">
            <div
              className="mnu"
              style={{ marginLeft: isMobileMenuOpen ? "0px" : "-100%" }}
            >
              {menuItem.map(
                (item, menuIndex) =>
                  // <SidebarLink item={item} isMenuExpand={isOpen} />
                  checkUserAccess(item.roles) && (
                    <SidebarLink
                      key={menuIndex}
                      item={item}
                      isMenuExpand={isOpen}
                      activeMenu={activeMenu}
                      selectedMenu={(menu) => {
                        setActiveMenu(menu);
                        setIsMobileMenuOpen(false);
                      }}
                    />
                  )
              )}
            </div>
            <div className="row p-1">
              <div className="col-4 mt-2 mb-1">
                <div
                  className="mobile-menu-toggle"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <FaBars />
                </div>
              </div>
              <div className="col-6 mt-3">
                <img
                  style={{ width: 140, marginLeft: -20 }}
                  className="logo"
                  src=""
                  onClick={() => navigate("/dashboard")}
                />
              </div>
              <div className="col-2 mt-3">
                <NavDropdown
                  title={
                    <img
                      style={{ height: 30, width: 28, marginLeft: 10 }}
                      className="logo"
                      src="https://cdn.icon-icons.com/icons2/1919/PNG/512/avatarinsideacircle_122011.png"
                    />
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => navigate("/changepassword")}>
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          </div>

          <main
            className="main-layout"
            style={{
              marginLeft: isOpen ? "60px" : "200px",
            }}
          >
            {/* <div className="mble-dsply">
              <div className="row mt-3">
                <div className="col-6">
                  <label>Main Balance: </label>
                </div>
              </div>
            </div> */}

            <div>{children}</div>
          </main>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default Sidebar;

{
  /* <Nav
              variant="pills"
              className="header-nav"
              // activeKey="/home"
            >
              <Nav.Item>
                <img style={{width:130, height:35, marginTop: 15}} src="https://c4admin.eazypey.com/webroot/images/logo/logo3.png"/>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>Help</Nav.Link>
              </Nav.Item>
              <NavDropdown title="Profile" id="nav-dropdown">
                <NavDropdown.Item
                  eventKey="4.1"
                  onClick={() => navigate("/profile")}
                >
                  My Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4" onClick={() => logout()}>
                  <span>Logout</span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav> */
}
