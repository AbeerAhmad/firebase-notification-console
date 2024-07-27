// src/NotificationButton.tsx
import React from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { firestore } from '../config/firebaseConfig';

interface NotificationButtonProps {
  user: User;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ user }) => {
    const sendNotification = async (message: string) => {
        try {
          await addDoc(collection(firestore, 'notifications'), {
            message,
            userId: user.uid,
            read: false,
            createdAt: serverTimestamp(),
          });
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      };

  return (
    <div>
      <button onClick={() => sendNotification('Notification 1')}>Notify 1</button>
      <button onClick={() => sendNotification('Notification 2')}>Notify 2</button>
      <button onClick={() => sendNotification('Notification 3')}>Notify 3</button>
    </div>
  );
};

export default NotificationButton;
