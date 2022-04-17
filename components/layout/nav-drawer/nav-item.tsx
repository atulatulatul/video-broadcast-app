import { Box, Flex, FlexProps } from "@chakra-ui/react";
import Link from "next/link";

interface NavItemProps extends FlexProps {
  icon: React.ReactNode;
  name: string;
  onClick?: () => void;
  to?: string;
  isActive?: boolean;
}

const NavItem = ({
  icon,
  name,
  onClick,
  to,
  isActive = false,
  ...props
}: NavItemProps) => {
  const onNavItemClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={to ?? "#"}>
      <Flex
        color={isActive ? "white" : "gray.600"}
        p={2}
        pl={3}
        borderRadius="md"
        bg={isActive ? "gray.500" : "white"}
        cursor="pointer"
        onClick={onNavItemClick}
        align="center"
        fontWeight="500"
        _hover={isActive ? {} : { bg: "gray.100" }}
        {...props}
      >
        {icon}
        <Box fontSize="large" ml={3}>
          {name}
        </Box>
      </Flex>
    </Link>
  );
};

export default NavItem;
