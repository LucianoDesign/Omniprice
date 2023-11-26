"use client";
import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
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
import { useUser } from "@auth0/nextjs-auth0/client";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, error, isLoading } = useUser();
  const path = usePathname();

  const menuItems: { name: string; href: string }[] = [
    { name: "Home", href:"/"},
    { name: "My Products", href: "/selected" },
    { name: "Help", href: "/help" },
    { name: "Settings", href: "#" },
    { name: "Log Out", href: "/api/auth/logout" }, // Modifica el elemento correspondiente para tener el href "/api/auth/logout"
  ];
  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link as={NextLink} href="/" className="flex items-center gap-1">
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
          <Link
            as={NextLink}
            color={path === "/" ? "primary" : "foreground"}
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            as={NextLink}
            color={path === "/selected" ? "primary" : "foreground"}
            href="/selected"
          >
            My Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            as={NextLink}
            href="/help"
            color={path === "/help" ? "primary" : "foreground"}
          >
            FAQ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            as={NextLink}
            color={path === "/#" ? "primary" : "foreground"}
            href="#"
          >
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Login user={user} isLoading={isLoading}/>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => {
          return (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                as={NextLink}
                color={path === item.href ? "primary" : "foreground"}
                className="w-full font-bold flex justify-center text-3xl p-4"
                href={item.href}
                size="lg"
                onClick={()=>{setIsMenuOpen(false)}}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
