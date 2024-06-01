import {cn} from '@/lib/utils'
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Link } from "react-router-dom";

const NavLinkCustom = ({ href, title, className, ...props }) => {


  return (
    <NavigationMenuLink
      asChild
    //   className={navigationMenuTriggerStyle()}
    className={`${className}`}
      style={{ fontSize: "18px" }}
    >
      <Link to={href}>
        {title}
      </Link>
    </NavigationMenuLink>
  );
};

export default NavLinkCustom;
