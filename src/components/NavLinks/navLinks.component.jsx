import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/context";
import { UserContext } from "../../context/user-context";
import './navLinks.css';

const NavLinks = () => {

    const {login , setLogin} = useContext(AuthContext);
    // console.log('isLogeed' , login);

    const {user , setToken} = useContext(UserContext);

    return(
        <>
        <ul className="nav-links">
          <li>
            <NavLink to="/">ALL USERS</NavLink>
          </li>
          {login && 
          <li>
            <NavLink to={`places/${user}`}>MY PLACES</NavLink>
          </li>
          }
          {login &&
          <li>
            <NavLink to="place/new">ADD PLACE</NavLink>
          </li>
          }
          {login &&
          <li>
            <NavLink to="auth" onClick={() => {setLogin(false); setToken(null); localStorage.removeItem('token'); localStorage.removeItem('login');}}>LOGOUT</NavLink>
          </li>
          }
          {!login &&
          <li>
            <NavLink to="auth">AUTHENTICATE</NavLink>
          </li>
          }
        </ul>
        </>
    );
}


export default NavLinks;