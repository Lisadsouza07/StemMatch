# 🌸 MenMatch — Modern Mentorship, Reimagined

A platform connecting **women in STEM** with mentors who empower, guide, and uplift.

---

# ✨ Overview

**MenMatch** is a modern mentorship platform designed to make finding the right mentor feel **intuitive, human, and meaningful**.

Instead of scrolling through long lists or filling out rigid forms, mentees explore mentors through **minimal, elegant swipe cards** inspired by modern matching apps. The experience is simple and intentional:

1. Mentees swipe through mentor profiles
2. Swipe right to send a mentorship request
3. Mentors review incoming requests
4. Accepted pairs unlock messaging

This creates a **thoughtful mentorship flow** that is engaging while still maintaining a professional and supportive environment.

Our goal is to build a **safe, inclusive space where women in STEM can connect with mentors who understand their journey**.

---

# 🎯 Core Concept

MenMatch blends the best parts of **modern discovery UX** with the structure of traditional mentorship programs.

### ✔ Swipe-Based Mentor Discovery

Mentees explore mentors through **profile cards** containing:

* Photo
* Name + age
* Area of study or industry
* Compatibility score
* Short “About Me”
* Interests / hobbies
* Years of experience
* Expandable **More Info** panel

---

### ✔ Mentorship Requests

Mentees can:

* **Swipe left** → Skip
* **Swipe right** → Send mentorship request

A subtle confirmation appears to keep the experience calm and professional rather than overly gamified.

---

### ✔ Mentor Request Inbox

Mentors **do not swipe**.

Instead, they receive a list of mentees who requested them, including:

* Mentee profile previews
* Accept / Decline options

This reduces decision fatigue and gives mentors **full control over who they mentor**.

---

### ✔ Match & Messaging

When a mentor accepts a request:

* Both users are notified
* The match appears in the **Messages tab**
* **Private chat unlocks**

Messaging is **only available for accepted matches**, keeping communication intentional and safe.

---

# 🧠 Why This Model Works

### For Mentees

* Fun, modern mentor discovery
* Clear compatibility indicators
* Explore mentors at their own pace
* Less intimidating than traditional mentorship signups

### For Mentors

* No swiping or endless browsing
* Full control over requests
* Clean inbox of potential mentees
* Flexible mentorship commitment

### For the Platform

* Simple matching logic
* Engaging but professional UX
* Scalable architecture
* Encourages meaningful mentorship relationships

---

# 🏗 Application Architecture

MenMatch is built as a **single-page React application** with modular components and centralized state management.

## Global State

The app manages core data such as:

* `user` (current mentee or mentor)
* `pendingRequests`
* `acceptedMatches`
* `messages`
* `skills`
* `goals`
* `posts`

---

## Pages

* **Dashboard**
* **Swipe Mentors**
* **Messages**
* **Profile**
* **Mentor Request Inbox**
* **Community (optional)**

---

## Components

Reusable UI components include:

* `Avatar`
* `Badge`
* `ScoreBar`
* `ProgressBar`
* `MentorCard` *(coming soon)*
* `FullProfileSheet` *(coming soon)*

---

# 🧰 Tech Stack

Core technologies used in the project:

* **React**
* **TypeScript**
* **Vite**
* **SWC** (fast compiler)
* **Node.js + npm**
* **Tailwind CSS** *(for styling and responsive UI)*

---

# 📱 Features

### Current / In Progress

* Swipe-based mentor discovery
* Mentor request system
* Profile cards with compatibility indicators
* Responsive modern UI
* Modular React component architecture

### Planned Features

* Authentication (secure login for mentors and mentees)
* Meeting scheduling
* Mentor-mentee progress tracking
* Community discussion space
* Smart compatibility matching

---

# 🌱 Vision

Women in STEM often struggle to find accessible mentorship opportunities. MenMatch aims to **bridge that gap by making mentorship discovery approachable, modern, and human-centered.**

By combining **technology, community, and mentorship**, the platform helps create meaningful relationships that support women in achieving their academic and professional goals.

---

# 🚀 Future Improvements

* AI-powered mentor compatibility scoring
* Calendar integrations
* Video mentorship sessions
* Community networking events
* University partnerships

