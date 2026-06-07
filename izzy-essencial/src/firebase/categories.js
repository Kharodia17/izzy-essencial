import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  query, orderBy, onSnapshot, serverTimestamp,
} from "firebase/firestore";
import { db } from "./config.js";

const COL = "categories";

export function subscribeCategories(callback) {
  const q = query(collection(db, COL), orderBy("order", "asc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function addCategory(data) {
  return addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp() });
}

export async function updateCategory(id, data) {
  return updateDoc(doc(db, COL, id), data);
}

export async function deleteCategory(id) {
  return deleteDoc(doc(db, COL, id));
}
