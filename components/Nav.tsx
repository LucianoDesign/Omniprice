"use client";
import { useState } from "react";
import Image from "next/image";

import {
  Navbar,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarContent,
  Link,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
import Login from "./Login";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: (string | { label: string; href: string })[] = [
    "Profile",
    "Dashboard",
    "Analytics",
    "My Settings",
    "Help & Feedback",
    { label: "Log Out", href: "/api/auth/logout" }, // Modifica el elemento correspondiente para tener el href "/api/auth/logout"
  ];
  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/assets/icons/logo.svg"
              width={27}
              height={27}
              alt="logo"
            />
            <p className="nav-logo">
              Omni<span className="text-primary"> Price</span>
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Login />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => {
          if (typeof item === "string") {
            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 0
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  className="w-full"
                  href={'#'}
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            );
          } else {
            return (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <Link
                  color={
                    index === 1
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  className="w-full"
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            );
          }
        })}
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
