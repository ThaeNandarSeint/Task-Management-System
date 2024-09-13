import { Button, Link, Text, UserAvatar } from "..";
import { navItems, userMenuItems } from "@/constants";
import { ItemProps } from "@/types";
import { ChangePassword, useAuth } from "@/features/auth";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mantine/core";
import { useGetCurrentUser } from "@/features/user";
import { NavbarItems } from "@/features/home";

const WebViewNavItem = ({ text, href }: ItemProps) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={href}
      component={RouterLink}
      className={`p-2 rounded-md hover:bg-gray-200 hover:shadow-sm hover:no-underline ${pathname === href && "bg-gray-200 shadow-sm"}`}
    >
      {text}
    </Link>
  );
};

const MobileViewItem = ({ text, href }: ItemProps) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={href}
      component={RouterLink}
      className={`hover:bg-gray-100 px-3 py-2 block rounded-md font-medium hover:no-underline ${pathname === href && "bg-gray-200"}`}
    >
      {text}
    </Link>
  );
};

export const WebViewNavbar = () => {
  return (
    <nav className="flex gap-5 items-center xs:hidden sm:hidden lg:flex">
      {navItems.map((item) => (
        <WebViewNavItem href={item.href} text={item.text} key={item.href} />
      ))}
    </nav>
  );
};

export const MobileViewNavbar = () => {
  const { user: data, onLogout } = useAuth();

  const navigate = useNavigate();

  const { data: user } = useGetCurrentUser();

  return (
    <div className="flex flex-col gap-3 xs:block sm:block lg:hidden">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <MobileViewItem href={item.href} text={item.text} key={item.href} />
        ))}
      </div>
      <Divider my="xs" />
      {data ? (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              {user && (
                <UserAvatar
                  src={
                    user?.user?.profileImage?.urls?.public ??
                    "images/avatar.jpg"
                  }
                  className="w-12 h-12"
                />
              )}
              <div>
                <Text>{data?.user.displayName}</Text>
                <Text className="text-sm font-light">{data?.user.email}</Text>
              </div>
            </div>
            <div className="flex gap-5 items-center cursor-pointer">
              <NavbarItems />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {userMenuItems.map((item) => (
              <MobileViewItem
                href={item.href}
                text={item.text}
                key={item.href}
              />
            ))}
            <ChangePassword className="pt-3 px-3 font-medium hover:bg-gray-100 rounded-md " />
            <Button
              onClick={() => {
                onLogout();
                navigate("/auth/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => navigate("/auth/login")}>Login</Button>
      )}
    </div>
  );
};
