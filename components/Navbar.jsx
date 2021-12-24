import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { Component } from "react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { AiFillBank, AiFillDashboard } from "react-icons/ai";
import { AuthContext } from "../contexts/AuthContext";
import Router from "next/router";
const LogOutHandler = async (e) => {
  console.log("LogOutHandler");
  // e.preventDefault();
  const result = await fetch("http://localhost:3000/api/destroyToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      // credentials: "same-origin",
    },
  });
  localStorage.clear();
  console.log("Fetch result", result);
  Router.replace("/login");
};

class Navbar extends Component {
  static contextType = AuthContext;
  render() {
    console.log(this.context);
    return (
      <Flex p="2" borderBottom="1px" borderColor="gray.100">
        <Box fontSize="3xl" color="blue.400" fontWeight="bold">
          {/* {!authed && "not authed"} */}
          {/* {`${this.context}`} */}
          <Link href="/" paddingLeft="2">
            Агенство недвижимости
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FcMenu />}
              variant="outlined"
              color="red.400"
            />
            <MenuList>
              <Link href="/" passHref>
                <MenuItem icon={<FcHome />}>Главная</MenuItem>
              </Link>
              <Link href="/search" passHref>
                <MenuItem icon={<BsSearch />}>Поиск</MenuItem>
              </Link>
              <Link href="/search?purpose=for-rent" passHref>
                <MenuItem icon={<AiFillDashboard />}>Мои объявления</MenuItem>
              </Link>
              <Link href="/search?purpose=for-sale" passHref>
                <MenuItem icon={<FcAbout />}>Покупка недвижимости</MenuItem>
              </Link>
              <Link href="/search?purpose=for-rent" passHref>
                <MenuItem icon={<FiKey />}>Аренда недвижимости</MenuItem>
              </Link>
              <Link href="/" passHref>
                {/* <Link href="/" passHref> */}
                <MenuItem onClick={LogOutHandler} icon={<AiFillBank />}>
                  Выйти из аккаунта
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    );
  }
}
export default Navbar;
