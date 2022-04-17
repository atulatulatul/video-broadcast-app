import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { MdDashboard } from "react-icons/md";

const Home: NextPage = () => {
  return (
    <Flex
      w="100%"
      h="100%"
      bg="gray.100"
      borderRadius="md"
      justifyContent="center"
      align="center"
      flexDirection="column"
    >
      <MdDashboard color="#3182CE" size="100px" />
      <Text fontSize="100px" color="gray.700">
        Dashboard
      </Text>
    </Flex>
  );
};

export default Home;
