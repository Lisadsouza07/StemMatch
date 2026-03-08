# Firebase Integration - Quick Reference

## What Was Added

### New Folders
```
src/config/           # Firebase configuration and services
```

### New Files

1. **`src/config/firebase.js`**
   - Firebase initialization
   - Exports: `auth`, `db`, `app`

2. **`src/config/authService.js`**
   - Authentication functions
   - Functions: `registerUser()`, `loginUser()`, `logoutUser()`, `getCurrentUserProfile()`, `getAllUsers()`, `updateUserProfile()`, `onAuthChange()`

3. **`src/config/messagingService.js`**
   - Real-time messaging functions
   - Functions: `sendMessage()`, `subscribeToMessages()`, `subscribeToConversations()`, `getConversation()`

4. **`src/config/FirebaseAuthContext.jsx`**
   - React context for managing auth state
   - Exports: `FirebaseAuthProvider`, `useFirebaseAuth()`

### Updated Files

1. **`src/App.jsx`**
   - Now uses `FirebaseAuthProvider` wrapper
   - Uses `useFirebaseAuth()` hook for user state
   - Auto-handles auth state changes

2. **`src/pages/AuthPage.jsx`**
   - Uses Firebase `registerUser()` and `loginUser()`
   - Shows loading state and error messages
   - No longer needs `users` and `setUsers` props

3. **`src/pages/ChatPage.jsx`**
   - Real-time message sync with Firebase
   - Uses `sendMessage()` and `subscribeToMessages()`
   - Auto-updates when messages arrive

## Quick Setup

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable Authentication (Email/Password)
- Enable Firestore Database

### 2. Add Your Credentials

Option A: Direct (simple)
```javascript
// src/config/firebase.js
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "12345",
  appId: "1:123:web:abc",
};
```

Option B: Environment Variables (better)
```bash
# Create .env file in root directory
VITE_FIREBASE_API_KEY=YOUR_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=12345
VITE_FIREBASE_APP_ID=1:123:web:abc
```

### 3. Set Firestore Rules
In Firestore Console → Rules tab:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth.uid != null;
      allow create: if request.auth.uid == userId;
      allow update, delete: if request.auth.uid == userId;
    }
    
    match /conversations/{conversationId} {
      allow read: if request.auth.uid in resource.data.participants;
      allow create: if request.auth.uid in request.resource.data.participants;
      
      match /messages/{messageId} {
        allow read: if request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        allow create: if request.auth.uid == request.resource.data.senderId;
      }
    }
  }
}
```

## Using Firebase in Your Code

### Authentication

```javascript
import { registerUser, loginUser, logoutUser } from "./config/authService.js";

// Register
const user = await registerUser(
  "user@example.com",
  "password",
  "John Doe",
  "mentee"
);

// Login
const user = await loginUser("user@example.com", "password");

// Logout
await logoutUser();

// Get current user in a component
import { useFirebaseAuth } from "./config/FirebaseAuthContext.jsx";

function MyComponent() {
  const { user, loading, logout } = useFirebaseAuth();
  
  return <div>{user?.name}</div>;
}
```

### Messaging

```javascript
import { sendMessage, subscribeToMessages } from "./config/messagingService.js";

// Send a message
await sendMessage(senderId, receiverId, "Hello!");

// Listen to messages (real-time)
const unsubscribe = subscribeToMessages(
  senderId,
  receiverId,
  (messages) => {
    console.log("New messages:", messages);
  }
);

// Cleanup when done
unsubscribe();
```

### Get Users

```javascript
import { getAllUsers, getCurrentUserProfile } from "./config/authService.js";

// Get all users
const allUsers = await getAllUsers();

// Get specific user profile
const profile = await getCurrentUserProfile(uid);
```

## Firebase Firestore Structure

```
users/
  {uid}
    - name: string
    - email: string
    - role: "mentor" | "mentee"
    - avatar: string
    - color: string
    - skills: array
    - goals: array
    - bio: string
    - timezone: string
    - style: string
    - experience: string
    - createdAt: timestamp
    - matches: array

conversations/
  {conversationId}  // "uid1_uid2"
    - participants: [uid1, uid2]
    - lastMessage: string
    - lastMessageTime: timestamp
    - updatedAt: timestamp
    
    messages/
      {msgId}
        - senderId: string
        - receiverId: string
        - text: string
        - createdAt: timestamp
        - read: boolean
```

## Important Notes

- **UIDs**: Use `user.uid` not `user.id` (Firebase uses `uid`)
- **Real-time**: All subscriptions auto-update when data changes
- **Auth State**: Automatically persists across page refreshes
- **Security**: Always set proper Firestore rules - never use "allow all"
- **Environment Variables**: Never commit `.env` file to git

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "auth is not defined" | Check firebase.js config |
| Messages not syncing | Verify Firestore rules are published |
| User null on refresh | Clear browser cache and re-login |
| Too many API calls | Optimize subscriptions - unsubscribe when not needed |

## Next Features to Add

- [ ] User avatars/photos (Firebase Storage)
- [ ] Search and discovery
- [ ] Online/offline status
- [ ] Typing indicators
- [ ] Message read receipts
- [ ] User ratings/reviews
- [ ] Notifications
- [ ] File sharing

## Support Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Full Firebase Setup Guide](./FIREBASE_SETUP.md)
