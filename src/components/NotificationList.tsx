// src/NotificationList.tsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { User } from 'firebase/auth';

interface NotificationListProps {
  user: User;
}

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
}

const NotificationList: React.FC<NotificationListProps> = ({ user }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user || !user.uid) return;
    
    const q = query(
      collection(firestore, 'notifications'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];
      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, [user]);

  const markAsRead = async (id: string) => {
    try {
      const notificationRef = doc(firestore, 'notifications', id);
      await updateDoc(notificationRef, { read: true });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <ul>
      {notifications.map((notification) => (
        <li key={notification.id}>
          <span>{notification.message}</span>
          {!notification?.read && (
              <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NotificationList;
