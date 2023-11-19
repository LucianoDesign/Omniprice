"use client";

import { UserProfile } from "@auth0/nextjs-auth0/client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react";



const Login = ({ user }: { user: UserProfile | undefined }) => {
  return (
    <>
      {user && (
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user.nickname ?? "Default Name"}
                size="sm"
                src={user.picture ?? "Default Picture"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.nickname}</p>
              </DropdownItem>
              <DropdownItem key="my_products" href="/selected" color="success">
                My Products
              </DropdownItem>
              <DropdownItem key="help_and_feedback" href="/help">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                href="/api/auth/logout"
                color="danger"
                onClick={() => {
                  localStorage.removeItem("user");
                }}
              >
                Log out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        // https://temp-mail.org/
      )}
      {!user && (
        <Link href="/api/auth/login">
          <Button color="primary" variant="ghost">
            Login
          </Button>
        </Link>
      )}
    </>
  );
};

export default Login;
