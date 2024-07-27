// src/App.tsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, User } from 'firebase/auth';
import { auth, googleProvider } from './config/firebaseConfig';
import NotificationButton from './components/NotificationButton';
import NotificationList from './components/NotificationList';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
try {
  await signInWithPopup(auth, googleProvider);
} catch (error) {
  console.log("🚀 ~ signIn ~ error:", error)
  
}
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <div className="App">
      <header>
        <h1>Firebase Notifications</h1>
        {user ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button onClick={signIn}>Sign In</button>
        )}
      </header>
      {user && (
        <>
          <NotificationButton user={user} />
          <NotificationList user={user} />
        </>
      )}
    </div>
  );
};

export default App;
