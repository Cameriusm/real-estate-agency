import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthContextProvider from "../contexts/AuthContext";
// console.log(authed);
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  const router = useRouter();

  let showHeader =
    router.pathname === "/login" || router.pathname === "/register"
      ? false
      : true;
  // if (
  //   router.pathname !== "/" &&
  //   router.pathname !== "/credentials" &&
  //   router.pathname !== "/achievements" &&
  //   router.pathname !== "/add-achievements"
  // ) {
  //   showHeader = false;
  // }

  return (
    <>
      <Head>
        <title>Агенство Недвижимости</title>
      </Head>
      <Box maxWidth="1280px" m="auto">
        <header>
          <AuthContextProvider>{showHeader && <Navbar />}</AuthContextProvider>
        </header>

        <main>
          <AuthContextProvider>{children}</AuthContextProvider>
        </main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
};

export default Layout;
