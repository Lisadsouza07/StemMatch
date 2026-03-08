import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "./firebase.js";

/**
 * Register a new user with email, password, and profile info
 */
export const registerUser = async (email, password, name, role, additionalData = {}) => {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Update display name
    await updateProfile(firebaseUser, { displayName: name });

    // Create user profile in Firestore
    const userProfile = {
      uid: firebaseUser.uid,
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
      field: additionalData.field || "Computer Science",
      skills: additionalData.skills || [],
      goals: additionalData.goals || [],
      style: additionalData.style || "Weekly check-ins",
      timezone: additionalData.timezone || "PST",
      bio: additionalData.bio || "",
      avatar: additionalData.avatar || name?.slice(0, 2).toUpperCase() || "US",
      color: additionalData.color || "#1B5BE8",
      experience: additionalData.experience || "",
      isNew: true,
      matches: [],
    };

    await setDoc(doc(db, "users", firebaseUser.uid), userProfile);

    return { uid: firebaseUser.uid, ...userProfile };
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error.message);
  }
};

/**
 * Login user with email and password
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Fetch user profile from Firestore
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
    if (userDoc.exists()) {
      return { uid: firebaseUser.uid, ...userDoc.data() };
    }

    return { uid: firebaseUser.uid, email: firebaseUser.email };
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message);
  }
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error(error.message);
  }
};

/**
 * Get current user profile
 */
export const getCurrentUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return { uid, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

/**
 * Get all users (for mentor/mentee discovery)
 */
export const getAllUsers = async () => {
  try {
    const usersCol = collection(db, "users");
    const usersSnapshot = await getDocs(usersCol);
    return usersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const userProfile = await getCurrentUserProfile(firebaseUser.uid);
      callback(userProfile);
    } else {
      callback(null);
    }
  });
};

/**
 * Update user profile
 */
export const updateUserProfile = async (uid, updates) => {
  try {
    await setDoc(doc(db, "users", uid), updates, { merge: true });
    return { uid, ...updates };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error(error.message);
  }
};
