# Firebase Architecture for MenMatch

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Your React App                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         FirebaseAuthProvider (Context)                │ │
│  │  • Manages auth state (user, loading, logout)         │ │
│  │  • Listens to Firebase auth changes                   │ │
│  └────────────────────────────────────────────────────────┘ │
│           │                                                   │
│           ▼                                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              App Container & Pages                    │ │
│  │ • AuthPage (signup/login)                             │ │
│  │ • SwipePage (discover mentors)                        │ │
│  │ • ChatPage (real-time messages)                       │ │
│  │ • MatchesPage, ProfilePage, etc.                      │ │
│  └────────────────────────────────────────────────────────┘ │
│           │                                                   │
│           ├─────────────────────┬──────────────────────────┐ │
│           ▼                     ▼                          ▼ │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  │ authService  │      │ messaging    │      │  firebase.js │
│  │              │      │ Service      │      │              │
│  │ • register   │      │              │      │ • auth       │
│  │ • login      │      │ • send       │      │ • db         │
│  │ • logout     │      │ • subscribe  │      │   (Firestore)│
│  │ • getProfile │      │               │      │              │
│  └──────────────┘      └──────────────┘      └──────────────┘
│           │                     │                     │        │
│           └─────────────────────┴─────────────────────┘        │
│                         │                                       │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                   (Firebase SDK)
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Firebase (Cloud)                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────┐            ┌──────────────────────────┐ │
│  │ Authentication │            │  Firestore Database      │ │
│  │                │            │                          │ │
│  │ • Email/Pass   │            │  Collections:            │ │
│  │ • User Accounts│            │  • users/                │ │
│  │ • Sessions     │            │  • conversations/        │ │
│  │ • Auth State   │            │    └─ messages/          │ │
│  │                │            │                          │ │
│  └────────────────┘            └──────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### Signup/Login Flow

```
User Enters Email & Password
        │
        ▼
    AuthPage.jsx
        │
        ├─ registerUser() ──┐
        │                   │
        └─ loginUser() ─────┤
                            ▼
                    authService.js
                            │
                            ├─ Firebase Auth
                            │  (createUserWithEmailAndPassword
                            │   or signInWithEmailAndPassword)
                            │
                            └─ Firestore
                               (Create/Read user profile)
                            │
                            ▼
                    FirebaseAuthContext
                    (Updates user state)
                            │
                            ▼
                    App Container
                    (Shows app pages)
```

### Real-Time Messaging Flow

```
User Sends Message
        │
        ▼
    ChatPage.jsx
        │
        └─ sendMessage()
                │
                ▼
        messagingService.js
                │
                └─ Firestore
                   Create message in:
                   conversations/{id}/messages/
                   │
                   ▼
                   Update conversation metadata
                   lastMessage, lastMessageTime
                   │
                   ▼
            subscribeToMessages()
            (Listener returns new messages)
                   │
                   ▼
            Re-render ChatPage
            with latest messages
```

## Firestore Data Structure

```
Firestore
├── users/ (collection)
│   └── {uid} (document - one per user)
│       ├── name: "John Doe"
│       ├── email: "john@example.com"
│       ├── role: "mentor" or "mentee"
│       ├── avatar: "JD"
│       ├── color: "#1B5BE8"
│       ├── skills: ["Python", "React"]
│       ├── goals: ["Learn web dev"]
│       ├── bio: "I love coding..."
│       ├── timezone: "PST"
│       ├── style: "Weekly check-ins"
│       ├── experience: "5 years"
│       ├── createdAt: Timestamp
│       └── matches: ["uid2", "uid3"]
│
└── conversations/ (collection)
    └── {conversationId} (document)
        ├── participants: ["uid1", "uid2"]
        ├── lastMessage: "See you soon!"
        ├── lastMessageTime: Timestamp
        ├── updatedAt: Timestamp
        │
        └── messages/ (subcollection)
            └── {messageId} (document)
                ├── senderId: "uid1"
                ├── receiverId: "uid2"
                ├── text: "Hello, how are you?"
                ├── createdAt: Timestamp
                └── read: false
```

## Component Communication

```
App.jsx (Root)
├── FirebaseAuthProvider
│   └── AppContent
│       ├── Sidebar
│       │   └── Uses user from useFirebaseAuth()
│       │
│       ├── AuthPage
│       │   └── Calls authService (register/login)
│       │       └── Updates FirebaseAuthContext
│       │
│       ├── SwipePage
│       │   └── Calls authService (getAllUsers)
│       │
│       ├── ChatPage
│       │   └── Calls messagingService
│       │       ├── sendMessage() - Save to Firestore
│       │       └── subscribeToMessages() - Listen for updates
│       │
│       └── MatchesPage
│           └── Shows user's matches
```

## Authentication State Management

```
Firebase Auth
     │
     ├─ onAuthStateChanged()
     │  (Listens for auth changes)
     │
     ▼
FirebaseAuthContext
     │
     ├─ user: null | { uid, name, email, ... }
     ├─ loading: true | false
     └─ logout: async () => void
     │
     ▼
useFirebaseAuth() Hook
     │
     └─ Used in any component
        const { user, loading, logout } = useFirebaseAuth();
```

## Real-Time Message Subscription

```
Firestore Query
conversations/{conversationId}/messages/ (ordered by createdAt)
     │
     ▼
onSnapshot() Listener
(Fires on initial load + any changes)
     │
     ▼
Callback with messages array
     │
     ▼
Update React state
     │
     ▼
Component re-renders
     │
     ▼
User sees new message!
```

## Security Flow

### Authentication
```
User Password → Firebase Auth → JWT Token → Browser Storage
  │
  └─ Verified by Firebase on every API call
```

### Database Access
```
User Makes Request
     │
     ▼
Firebase Security Rules
     │
     ├─ Check: Is user logged in?
     ├─ Check: Is user the document owner?
     ├─ Check: Is user in participants array?
     │
     ▼
Allow or Deny
```

## Technology Stack

```
Frontend:
├── React (UI framework)
├── Vite (Build tool)
├── React Context (State management)
└── Firebase SDK (Backend integration)

Backend (Firebase):
├── Firebase Authentication
│   └── Email/Password auth
├── Firestore Database
│   └── Real-time syncing
└── Firebase Hosting (optional for deployment)

Protocols:
├── HTTPS (secure communication)
├── WebSocket (real-time updates)
└── JWT (authentication tokens)
```

## Performance Optimizations

### Current Implementation
- ✅ Real-time listeners only when needed
- ✅ Unsubscribe on component unmount
- ✅ Efficient queries (indexed)
- ✅ Lazy loading of components

### Potential Enhancements
- [ ] Offline persistence
- [ ] Caching with IndexedDB
- [ ] Pagination for large lists
- [ ] Debouncing for rapid updates
- [ ] Service worker for PWA

## Deployment Ready? ✅

Your Firebase setup is production-ready when you:
1. ✅ Replace placeholder config with real credentials
2. ✅ Set proper Firestore security rules
3. ✅ Enable Firebase Authentication
4. ✅ Enable Firestore Database
5. ✅ Test signup/login/messaging
6. ✅ Add `.env` to `.gitignore`
7. ✅ (Optional) Deploy to Firebase Hosting or Vercel

That's it! You're ready to go! 🚀
