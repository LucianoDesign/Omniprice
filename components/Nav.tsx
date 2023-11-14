"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarContent,
  Link,
  NavbarMenuItem,
  NavbarMenu,
  NavbarItem,
  
} from "@nextui-org/react";
import Login from "./Login";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { error, isLoading, user } = useUser();
  const [isUser, setIsUser ] = useState(false);

  useEffect(() => {
    if (user) {
      setIsUser(true);
    }
  }, [user]);
  
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
            <p className="nav-logo">
              Omni<span className="text-primary">Price</span>
            </p>
            <Image
              src="/assets/icons/money-bill.svg"
              width={27}
              height={27}
              alt="logo"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/selected">
            My Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/help" color="foreground">
            FAQ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        
      {!isLoading && <Login user={user} error={error} isUser={isUser} />}
       
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
                  href={"#"}
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
