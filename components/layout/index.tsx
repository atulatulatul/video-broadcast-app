import React from "react";
import Navbar from "./nav-drawer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Navbar>{children}</Navbar>;
}
