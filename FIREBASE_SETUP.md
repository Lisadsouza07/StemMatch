# Firebase Setup Guide for MenMatch

## Overview
Your MenMatch app now has Firebase integration for:
- ✅ User authentication (signup/login with email & password)
- ✅ Real-time messaging between mentors and mentees
- ✅ Persistent user profiles and data

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `MenMatch`
4. Follow the setup wizard
5. Enable Google Analytics (optional)
6. Click "Create project"

## Step 2: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ → **Project Settings**
2. Scroll down to "Your apps" section
3. Click the web icon `</>` to create a web app
4. Register app with name: `MenMatch Web`
5. Copy your Firebase configuration object

Your config will look like:
```javascript
{
  apiKey: "AIzaSyD...",
  authDomain: "menmatch-xxxxx.firebaseapp.com",
  projectId: "menmatch-xxxxx",
  storageBucket: "menmatch-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
}
```

## Step 3: Update Firebase Configuration

1. Open `src/config/firebase.js`
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",  // <- Paste your values here
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## Step 4: Enable Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **Get Started**
3. Under "Sign-in method", click **Email/Password**
4. Enable "Email/Password"
5. Click **Save**

## Step 5: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click **Create Database**
3. Choose **Start in production mode** (you'll set security rules below)
4. Select your preferred location
5. Click **Create**

## Step 6: Configure Firestore Security Rules

1. In Firestore, go to the **Rules** tab
2. Replace the default rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can read/write their own profile
    match /users/{userId} {
      allow read: if request.auth.uid != null;
      allow create: if request.auth.uid == userId;
      allow update, delete: if request.auth.uid == userId;
    }
    
    // Conversations collection - users can read/write their conversations
    match /conversations/{conversationId} {
      allow read: if request.auth.uid in resource.data.participants;
      allow create: if request.auth.uid in request.resource.data.participants;
      
      // Messages subcollection
      match /messages/{messageId} {
        allow read: if request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        allow create: if request.auth.uid == request.resource.data.senderId;
      }
    }
  }
}
```

3. Click **Publish**

## Step 7: Update App.jsx to Use Firebase Auth

Your `App.jsx` or main component should now use the Firebase auth context. Update it to:

```jsx
import { FirebaseAuthProvider } from "./config/FirebaseAuthContext.jsx";

function YourApp() {
  return (
    <FirebaseAuthProvider>
      {/* Your app content */}
    </FirebaseAuthProvider>
  );
}
```

## Usage in Components

### AuthPage
The AuthPage component now automatically uses Firebase authentication. No changes needed from your end.

### ChatPage
Messages are now synced in real-time using Firestore:
- Uses `user.uid` instead of `user.id`
- Uses `mentor.uid` instead of `mentor.id`
- Messages update in real-time via `subscribeToMessages()`

### Sending Messages
```javascript
import { sendMessage } from "../config/messagingService.js";

// Send a message
await sendMessage(currentUserUid, receiverUid, "Hello!");
```

### Getting User Data
```javascript
import { getAllUsers, getCurrentUserProfile } from "../config/authService.js";

// Get current user profile
const userProfile = await getCurrentUserProfile(uid);

// Get all users (for finding mentors/mentees)
const allUsers = await getAllUsers();
```

## File Structure

```
src/
├── config/
│   ├── firebase.js              # Firebase initialization
│   ├── authService.js           # Authentication functions
│   ├── messagingService.js      # Real-time messaging
│   └── FirebaseAuthContext.jsx  # Auth context provider
├── pages/
│   ├── AuthPage.jsx             # Updated with Firebase
│   ├── ChatPage.jsx             # Updated with real-time messaging
│   └── ...
└── ...
```

## Key Changes Made

1. **`src/config/firebase.js`** - Firebase initialization
2. **`src/config/authService.js`** - Register, login, profile management
3. **`src/config/messagingService.js`** - Real-time messaging
4. **`src/config/FirebaseAuthContext.jsx`** - Auth state context
5. **`src/pages/AuthPage.jsx`** - Now uses Firebase auth
6. **`src/pages/ChatPage.jsx`** - Now uses Firebase Firestore for messages

## Testing

1. Start your app: `npm run dev`
2. Create a new account with email/password
3. Create another account (mentor or mentee)
4. Send messages - they should appear in real-time!

## Troubleshooting

### "auth is not defined"
Make sure you've updated your Firebase config in `src/config/firebase.js`

### Messages not showing
1. Check Firestore is enabled
2. Verify security rules are published
3. Check browser console for errors
4. Ensure both users have Firebase UIDs

### Real-time updates not working
1. Confirm Firebase config is correct
2. Check network tab in DevTools
3. Verify Firestore rules allow read access

## Next Steps

- Add user avatars/photos to Firestore Storage
- Implement user search/discovery
- Add presence indicators (online/offline)
- Add typing indicators
- Add read receipts
- Implement message reactions/emoji

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all Firebase settings match your config
3. Check Firestore rules are correctly published
4. Ensure Firebase project has Authentication and Firestore enabled
