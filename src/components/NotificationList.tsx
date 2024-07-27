import { useState, useEffect, useMemo } from "react";
import { where, orderBy, Timestamp } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { snapshotListener, updateDocument } from "../common/firestore";
import { useAuth } from "./context/AuthContext";
import { NotificationIcon } from "./svgs/NotificationIcon";

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
}

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { currentUser } = useAuth();
  const unread = useMemo(
    () => notifications?.filter((item) => !item?.read),
    [notifications]
  );

  useEffect(() => {
    if (!currentUser || !currentUser?.uid) return;
    const unsubscribe = snapshotListener({
      collectionName: "notifications",
      queryConstraints: [
        where("userId", "==", currentUser?.uid),
        orderBy("createdAt", "desc"),
      ],
      onSnapshotCallback: (data) => {
        setNotifications(data as Notification[]);
      },
    });
    return () => unsubscribe && unsubscribe();
  }, [firestore, currentUser]);

  const markAsRead = async () => {
    try {
      unread.forEach(async (element) => {
        await updateDocument({
          collectionName: "notifications",
          id: element?.id,
          data: { read: true },
        });
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger onClick={markAsRead}>
        <div>
          {unread?.length ? (
            <Badge color="danger" content={unread?.length} shape="circle">
              <NotificationIcon className="fill-current" size={30} />
            </Badge>
          ) : (
            <NotificationIcon className="fill-current" size={30} />
          )}
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {notifications?.map((item) => {
          return (
            <DropdownItem key="logout" color="danger">
              {item.message}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationList;
