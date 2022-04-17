import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box, Alert } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Box>
      <Alert>This is the landing page.</Alert>
    </Box>
  );
};

export default Home;
