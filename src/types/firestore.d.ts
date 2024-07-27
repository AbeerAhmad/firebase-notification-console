import { QueryConstraint } from "firebase/firestore";

type PossibleCollection = "notifications";

export interface AddDataProps {
  collectionName: PossibleCollection;
  data: Record<string, any>;
}

export interface UpdateDataProps {
  collectionName: PossibleCollection;
  id: string;
  data: Record<string, any>;
}

export interface SnapshotListenerProps {
  collectionName: PossibleCollection;
  queryConstraints: QueryConstraint[];
  onSnapshotCallback: (snapshot: QuerySnapshot<DocumentData>) => void;
}
