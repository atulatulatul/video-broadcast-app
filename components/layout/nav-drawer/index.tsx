import { Avatar, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdDashboard } from "react-icons/md";
import NavItem from "./nav-item";
import NavItemSeparator from "./nav-item-separator";

const NavDrawer = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const activeRoute = router.pathname;
  return (
    <Flex>
      <Box minWidth="250px" height="100vh" borderRight="solid 1px #dadada">
        <Flex p={2} flexDirection="column" align="middle">
          <Flex justifyContent="center">
            <Avatar src="https://picsum.photos/seed/picsum/200" size="lg" />
          </Flex>
          <Box textAlign="center" fontWeight="500" fontSize="20px">
            John Doe
          </Box>
        </Flex>
        <NavItemSeparator />
        <NavItem
          mx={1}
          icon={<MdDashboard />}
          to="/"
          name="Dashboard"
          isActive={activeRoute === "/"}
        />
        <NavItemSeparator />
      </Box>
      <Box p={1} height="100vh" w="100%">
        {children}
      </Box>
    </Flex>
  );
};

export default NavDrawer;
