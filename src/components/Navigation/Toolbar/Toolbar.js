import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigetationItems/NavigationItems";
import PropTypes from 'prop-types'


const toolbar = props => (
  <header className={classes.Toolbar}>
    <button onClick={props.toggleSidebar}>Menu</button>
    <div className={classes.Logo}>
       <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

toolbar.propTypes = {
  toggleSidebar: PropTypes.func
}


export default toolbar;
