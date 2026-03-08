MenMatch — Modern Mentorship, Reimagined
A Hinge‑inspired mentor discovery platform for women in STEM.

📌 Overview

MenMatch is a mentorship platform designed to make finding the right mentor feel intuitive, human, and meaningful. Instead of scrolling through long lists or filling out rigid forms, mentees explore mentors through minimal, elegant swipe cards inspired by Hinge’s clean, intentional design.
The experience is simple:
Mentees swipe through mentor profiles
Swipe right to send a mentorship request
Mentors review and accept requests
Accepted pairs unlock messaging
This creates a thoughtful, modern mentorship flow that feels engaging without being overwhelming or “gamified.”

🎯 Core Concept

MenMatch blends the best parts of dating‑app UX with the professionalism of mentorship programs.
✔ Mentees swipe through mentor profiles
Each mentor card includes:
Photo
Name + age
Area of study
Compatibility score
Short “About Me”
Interests / hobbies
Year of study or experience
A “More Info” panel for full details
✔ Swipe right = send mentorship request
Swipe left = skip
Swipe right = “I’d like this mentor”
A subtle confirmation appears — calm, classy, not flashy.
✔ Mentors receive requests (no swiping required)
Mentors see:
A list of mentees who requested them
Mentee profile previews
Accept / decline buttons
✔ Accepting creates a match
Once a mentor accepts:
Both sides are notified
The match appears in the Messages tab
Chat becomes available
✔ Messaging is only unlocked for accepted matches
This keeps communication intentional and safe.

🧠 Why This Model Works

For mentees:
Fun, modern, low‑pressure discovery
Clear compatibility indicators
Ability to explore mentors at their own pace
For mentors:
No swiping or decision fatigue
Full control over who they mentor
A clean inbox of mentee requests
For the platform:
Simple, scalable matching logic
Professional tone with engaging UX
A unique approach to mentorship that feels fresh and human

🏗 Current Architecture (High‑Level)

MenMatch is built as a single‑page React/Vite application with modular components and clean state management.
Global State Includes:
user (current mentee or mentor)
pendingRequests (for mentors)
acceptedMatches
messages (per‑match chat history)
skills, goals, posts, etc.
Pages:
Dashboard
Swipe Mentors
Messages
Profile
Mentor Request Inbox
Community (optional)
Components:
Avatar
Badge
ScoreBar
ProgressBar
MentorCard (coming soon)
FullProfileSheet (coming soon)

🎨 Design Direction

MenMatch follows a Hinge‑style aesthetic:
Minimal
Classy
Soft shadows
Clean typography
Muted purples and neutrals
Gentle animations
Spacious layouts
The goal is to create a calm, intentional environment that feels welcoming and professional — not loud or gamified.
