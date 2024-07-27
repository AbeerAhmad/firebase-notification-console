import { Button } from "@nextui-org/react";
import { addDataToCollection } from "../common/firestore";
import { useAuth } from "./context/AuthContext";

const NotificationButton = () => {
  const { currentUser } = useAuth();
  const sendNotification = async (message: string) => {
    return await addDataToCollection({
      collectionName: "notifications",
      data: {
        message,
        userId: currentUser?.uid,
        read: false,
      },
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => sendNotification("Notification 1")}
        color="primary"
      >
        Notify 1
      </Button>
      <Button
        onClick={() => sendNotification("Notification 2")}
        color="secondary"
      >
        Notify 2
      </Button>
      <Button
        onClick={() => sendNotification("Notification 3")}
        color="warning"
      >
        Notify 3
      </Button>
    </div>
  );
};

export default NotificationButton;
