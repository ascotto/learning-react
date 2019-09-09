import React, { useState } from "react";
import Aux from "../Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = props => {
  const [isSideDrawer, setSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    //this.setState({ showSideDrawer: false });
    setSideDrawer(false);
  };

  const toggleSidebarHandler = () => {
    // if depends on previuos state check the previous state!

    // this.setState(prevState => {
    //   return { showSideDrawer: !prevState.showSideDrawer };
    // });

    setSideDrawer(!isSideDrawer);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        toggleSidebar={toggleSidebarHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={isSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
