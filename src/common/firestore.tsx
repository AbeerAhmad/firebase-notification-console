import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";
import {
  AddDataProps,
  SnapshotListenerProps,
  UpdateDataProps,
} from "../types/firestore";

const addDataToCollection = async ({ collectionName, data }: AddDataProps) => {
  try {
    return await addDoc(collection(firestore, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    return null;
  }
};
const updateDocument = async ({
  collectionName,
  id,
  data,
}: UpdateDataProps): Promise<void> => {
  try {
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

const snapshotListener = ({
  collectionName,
  queryConstraints,
  onSnapshotCallback,
}: SnapshotListenerProps) => {
  const q = query(collection(firestore, collectionName), ...queryConstraints);
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onSnapshotCallback(data);
  });
  return unsubscribe;
};
export { addDataToCollection, updateDocument, snapshotListener };
