import { Button, Link, UserAvatar } from "..";
import { ReactNode } from "react";
import { userMenuItems } from "@/constants";
import { ItemProps } from "@/types";
import { ChangePassword, useAuth } from "@/features/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { GlobalSearch, NavbarItems } from "@/features/home";
import { Divider } from "@mantine/core";

const WebViewUserMenuItem = ({ text, href }: ItemProps) => {
  return (
    <Link
      to={href}
      component={RouterLink}
      className="block px-4 py-2 text-sm text-gray-700 hover:no-underline"
    >
      {text}
    </Link>
  );
};

export const Topbar = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [showContact, { open: openContact, close: closeContact }] =
    useDisclosure();

  const { user, onLogout } = useAuth();

  return (
    <div className="flex justify-between items-center text-2xl">
      <div className="w-16 h-16 relative cursor-pointer ">
        <img
          src="/images/logo.jpg"
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[50%]">
        <GlobalSearch />
      </div>

      <div>
        <div className="flex items-center gap-5 cursor-pointer xs:hidden sm:hidden lg:flex">
          {user ? (
            <UserAvatar
              src={user.user?.profileImage?.urls?.public ?? "images/avatar.jpg"}
              className="w-10 h-10"
              onClick={() => (showContact ? closeContact() : openContact())}
            />
          ) : (
            <Button onClick={() => navigate("/auth/login")}>Login</Button>
          )}
          <NavbarItems />
        </div>
        {showContact && (
          <div className="absolute z-10 bg-white mt-2 rounded-md w-48 shadow-lg ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
            {userMenuItems.map((item) => (
              <WebViewUserMenuItem
                href={item.href}
                text={item.text}
                key={item.href}
              />
            ))}
            <Divider className="mx-2" />
            <ChangePassword />
            <Divider className="mx-2" />
            <Button
              variant="transparent"
              onClick={() => {
                onLogout();
                navigate("/auth/login");
              }}
            >
              Logout
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
