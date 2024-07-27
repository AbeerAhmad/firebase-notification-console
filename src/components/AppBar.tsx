import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useAuth } from "./context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

import NotificationList from "./NotificationList";

export default function AppBar() {
  const { currentUser } = useAuth();
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <p className="font-bold text-inherit">FNS</p>
      </NavbarBrand>
      {currentUser && (
        <NavbarContent as="div" justify="end">
          <NotificationList />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{currentUser?.email}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>
  );
}
