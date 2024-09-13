import { Divider } from "@mantine/core";
import { Error, IconButton, MobileViewNavbar, Topbar, WebViewNavbar } from "..";
import { useDisclosure } from "@mantine/hooks";
import { IoClose } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { Outlet, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

export const MainLayout = () => {
  const [showContact, { open: openContact, close: closeContact }] =
    useDisclosure();

  const navigate = useNavigate();

  return (
    <div>
      <div className="px-32 border-2 py-3 flex flex-col bg-white xs:px-3 sm:px-3 lg:px-32">
        <Topbar>
          <IconButton
            icon={showContact ? <IoClose /> : <LuMenu />}
            className="text-3xl focus:ring-offset-2 focus:ring-2 focus:rounded-sm xs:block sm:block lg:hidden"
            onClick={() => (showContact ? closeContact() : openContact())}
          />
        </Topbar>
        {showContact && <Divider my="xs" />}
        <WebViewNavbar />
        {showContact && <MobileViewNavbar />}
      </div>
      <div className="border-2 py-3 flex flex-col gap-3 xs:px-3 sm:px-3 lg:px-32">
        <ErrorBoundary
          fallbackRender={Error}
          key={location.pathname}
          onReset={() => {
            navigate("/");
          }}
        >
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
};
