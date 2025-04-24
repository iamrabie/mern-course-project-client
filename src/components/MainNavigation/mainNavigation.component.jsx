import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import MainHeader from "../MainHeader/mainHeader.component";
import NavLinks from "../NavLinks/navLinks.component";
import SideDrawer from "../SideDrawer/sideDrawer.component";
import Backdrop from "../Backdrop/backdrop.component";
import { AuthContext } from "../../context/context";
import { UserContext } from "../../context/user-context";
import "./mainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const { user } = useContext(UserContext);
  const { login } = useContext(AuthContext);

  const handleDrawer = () => {
    setDrawerIsOpen(true);
  };

  const handleCloseDrawer = (e) => {
    e.stopPropagation();
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={handleCloseDrawer} />}
      <SideDrawer onClick={handleCloseDrawer} show={drawerIsOpen}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={handleDrawer}>
          <span />
          <span />
          <span />
        </button>
        {login ? (
          <h1 className="main-navigation__title ">
            <Link to={`places/${user}`}>Your Places</Link>
          </h1>
        ) : (
          <h1></h1>
        )}
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
