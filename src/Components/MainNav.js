import React from 'react';
import {NavLink} from 'react-router-dom';


/* Default topic links */
function MainNav () {
    return (
        <nav className="main-nav">
        <ul>
          <li><NavLink to="/surf">Surf</NavLink></li>
          <li><NavLink to="/snow">Snow</NavLink></li>
          <li><NavLink to="/rain">Rain</NavLink></li>
        </ul>
      </nav>
    )
}




export default MainNav;