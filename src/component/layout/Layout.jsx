import Navbar from "./Header/Navbar";
import { Fragment } from "react";
import Footer from "./Footer/Footer";
import MobileNav from "./Header/MobileNav";
const Layout = (props) => {
  return (
    <Fragment>
      <Navbar />
      {props.children}
      <Footer />
      <MobileNav />
    </Fragment>
  );
};
export default Layout;
