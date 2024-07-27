import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./config/firebaseConfig";
import NotificationButton from "./components/NotificationButton";
import AppBar from "./components/AppBar";
import { Button } from "@nextui-org/react";
import { useAuth } from "./components/context/AuthContext";

const App: React.FC = () => {
  const { currentUser } = useAuth();

  const signIn = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <div>
      <AppBar />
      <div className="flex justify-center items-center min-h-96">
        {!currentUser ? (
          <Button onClick={signIn} variant="solid">
            Sign In
          </Button>
        ) : (
          <NotificationButton />
        )}
      </div>
    </div>
  );
};

export default App;
