import { ReactNode } from "react";
import Routes from "./Routes";

type NavbarProps = {
  routes: Routes[];
  children?: ReactNode;
};

export default NavbarProps;
