import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo />
    <nav>
      <ul>
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
      </ul>
    </nav>
  </header>
);

export default toolbar;
