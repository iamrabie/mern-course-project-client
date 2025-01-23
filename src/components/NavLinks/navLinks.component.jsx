import { NavLink } from "react-router-dom";
import './navLinks.css';

const NavLinks = () => {
    return(
        <>
        <ul className="nav-links">
          <li>
            <NavLink to="/">ALL USERS</NavLink>
          </li>
          <li>
            <NavLink to="places">MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="place/new">ADD PLACE</NavLink>
          </li>
          <li>
            <NavLink to="auth">AUTHENTICATE</NavLink>
          </li>
        </ul>
        </>
    );
}


export default NavLinks;