import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigetationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";

const SideDrawer = props => {
  let toogleSideDrawer = [classes.SideDrawer, classes.Closed];

  if (props.open) {
    toogleSideDrawer = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={toogleSideDrawer.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
