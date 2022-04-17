import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  isFullScreen?: boolean;
}

const Loader = ({ size = "xl", isFullScreen = false }: LoaderProps) => {
  return (
    <Flex
      justify="center"
      align="center"
      height={isFullScreen ? "100vh" : "auto"}
    >
      <Spinner
        size={size}
        color="blue.700"
        thickness={"5px"}
        borderRadius={1000}
      />
    </Flex>
  );
};

export default Loader;
