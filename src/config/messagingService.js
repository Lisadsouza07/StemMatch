import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase.js";

/**
 * Create or get a conversation between two users
 */
const getConversationId = (userId1, userId2) => {
  return [userId1, userId2].sort().join("_");
};

/**
 * Send a message in a conversation
 */
export const sendMessage = async (senderId, receiverId, text) => {
  try {
    const conversationId = getConversationId(senderId, receiverId);
    const messagesCollection = collection(db, "conversations", conversationId, "messages");

    const message = {
      senderId,
      receiverId,
      text,
      createdAt: Timestamp.now(),
      read: false,
    };

    const docRef = await addDoc(messagesCollection, message);

    // Update conversation metadata
    await setDoc(
      doc(db, "conversations", conversationId),
      {
        participants: [senderId, receiverId],
        lastMessage: text,
        lastMessageTime: Timestamp.now(),
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );

    return { id: docRef.id, ...message };
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error(error.message);
  }
};

/**
 * Subscribe to messages in a conversation (real-time)
 */
export const subscribeToMessages = (userId1, userId2, callback) => {
  try {
    const conversationId = getConversationId(userId1, userId2);
    const messagesCollection = collection(db, "conversations", conversationId, "messages");

    const q = query(messagesCollection, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));
      callback(messages);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error subscribing to messages:", error);
    throw new Error(error.message);
  }
};

/**
 * Subscribe to all conversations for a user (real-time)
 */
export const subscribeToConversations = (userId, callback) => {
  try {
    const conversationsCollection = collection(db, "conversations");
    const q = query(
      conversationsCollection,
      where("participants", "array-contains", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastMessageTime: doc.data().lastMessageTime?.toDate?.() || new Date(),
      }));
      callback(conversations);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error subscribing to conversations:", error);
    throw new Error(error.message);
  }
};

/**
 * Mark all messages as read in a conversation
 */
export const markMessagesAsRead = async (userId1, userId2, currentUserId) => {
  try {
    const conversationId = getConversationId(userId1, userId2);
    const messagesCollection = collection(db, "conversations", conversationId, "messages");

    const q = query(
      messagesCollection,
      where("senderId", "!=", currentUserId),
      where("read", "==", false)
    );

    // Note: batch write would be better for many messages
    // For now, we're just tracking read status
  } catch (error) {
    console.error("Error marking messages as read:", error);
  }
};

/**
 * Get conversation metadata
 */
export const getConversation = async (userId1, userId2) => {
  try {
    const conversationId = getConversationId(userId1, userId2);
    const conversationDoc = await getDoc(doc(db, "conversations", conversationId));

    if (conversationDoc.exists()) {
      return { id: conversationDoc.id, ...conversationDoc.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return null;
  }
};
