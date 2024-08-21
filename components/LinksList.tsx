import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AccountIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import HotelIcon from "@mui/icons-material/Hotel";

const iconMapping = {
  "Buy Land": <AssignmentIcon />,
  "Lease Land": <BusinessIcon />,
  "Real Estate": <HomeIcon />,
  Rental: <HotelIcon />,
};

const links = [
  { name: "My Properties", icon: <DashboardIcon />, href: "/home" },
  { name: "Customers", icon: <PeopleIcon />, href: "/home/customers" },
  { name: "Requested", icon: <ShoppingCartIcon />, href: "/home/requested" },
  { name: "Account", icon: <AccountIcon />, href: "/home/account" },
];

const savedReports = [
  {
    name: "Buy Land",
    icon: iconMapping["Buy Land"],
    href: "/home/properties/land",
  },
  {
    name: "Lease Land",
    icon: iconMapping["Lease Land"],
    href: "/home/properties/lease-land",
  },
  {
    name: "Real Estate",
    icon: iconMapping["Real Estate"],
    href: "/home/properties/real-estate",
  },
  {
    name: "Rental",
    icon: iconMapping["Rental"],
    href: "/home/properties/rental",
  },
];

const RenderList = ({
  items,
}: {
  items: { name: string; icon: React.ReactNode; href: string }[];
}) => (
  <React.Fragment>
    {items.map((item, index) => (
      <Link style={{ all: "initial" }} key={index} href={item.href} passHref>
        <ListItemButton component="a">
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </Link>
    ))}
  </React.Fragment>
);

export const mainListItems = <RenderList items={links} />;

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Explore Properties
    </ListSubheader>
    <RenderList items={savedReports} />
  </React.Fragment>
);
