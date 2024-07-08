import { GoChevronDown } from "react-icons/go";

export const MenuItems = [
  {
    title: "Home",
    url: "/",
    type: "nav-links",
  },
  {
    title: "Account",
    // url: "/account",
    type: "nav-links",
    icon: <GoChevronDown />,
  },
  {
    title: "User",
    url: "/user",
    type: "nav-links",
  },

  // {
  //   title: "Post",
  //   url: "/post",
  //   type: "nav-links",
  // },
];
export const accountDropdown = [
  {
    title: "Bonds",
    url: "/bonds",
    type: "nav-links",
  },
  {
    title: "Fixed Term Deposit",
    url: "/FixedTermDeposit",
    type: "nav-links",
  },
  {
    title: "Withdraw & Deposit",
    url: "/WithdrawDeposit",
    type: "nav-links",
  },
];
