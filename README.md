# StudyFlash — AI-Powered Flashcard Learning Platform

> Turn your notes into smart flashcards, ace any exam with AI-powered quizzes, and master any subject with ease.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express.js-5-green?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-blue?logo=google)](https://ai.google.dev/)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
  - [Frontend](#frontend-study-flash-card)
  - [Backend](#backend-backed)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Contributor Guide](#contributor-guide)
  - [Claiming Work (Avoid Duplicate Effort)](#claiming-work-avoid-duplicate-effort)
  - [Branching Strategy](#branching-strategy)
  - [Creating a Feature Branch](#creating-a-feature-branch)
  - [Code Conventions](#code-conventions)
  - [Pull Request Process](#pull-request-process)
- [Features](#features)

---

## Project Overview

StudyFlash is a full-stack web application that helps students master subjects faster using:

- **AI-generated flashcards** from your own notes (powered by Google Gemini)
- **Spaced Repetition** algorithm for efficient long-term memory retention
- **AI quiz generation** to test and validate your knowledge
- **Progress tracking** with mastery percentages and daily streaks

The application is split into two separate workspaces:

| Workspace    | Description                                  | Directory           |
| ------------ | -------------------------------------------- | ------------------- |
| **Frontend** | Next.js 15 app (UI, routing, state)          | `study-flash-card/` |
| **Backend**  | Express.js REST API (auth, decks, AI, cards) | `backed/`           |

---

## 🛠 Tech Stack

### Frontend (`study-flash-card/`)

| Technology                | Purpose                      |
| ------------------------- | ---------------------------- |
| **Next.js 15**            | App Router, SSR, routing     |
| **React 19**              | UI components                |
| **TypeScript**            | Type safety                  |
| **Tailwind CSS v4**       | Styling                      |
| **Framer Motion**         | Animations and transitions   |
| **Zustand** (`authStore`) | Global auth state management |
| **Axios**                 | HTTP client for API calls    |

### Backend (`backed/`)

| Technology            | Purpose                             |
| --------------------- | ----------------------------------- |
| **Express.js 5**      | REST API server                     |
| **Prisma ORM**        | Database access layer               |
| **PostgreSQL**        | Primary database                    |
| **Google Gemini API** | AI flashcard & quiz generation      |
| **Zod**               | Request/response validation         |
| **Resend**            | Transactional email (contributions) |
| **JWT**               | Authentication tokens               |
| **bcrypt**            | Password hashing                    |

---

## Project Structure

### Frontend (`study-flash-card/`)

```
study-flash-card/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── (auth)/                 # Auth route group (protected by layout)
│   │   │   ├── login/page.tsx      # Login page
│   │   │   └── signup/page.tsx     # Signup page
│   │   ├── (public)/               # Public route group
│   │   │   └── page.tsx            # Landing page (/)
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Main dashboard (overview, decks, stats)
│   │   ├── decks/
│   │   │   ├── new/page.tsx        # Create a new deck with AI generation
│   │   │   └── [id]/
│   │   │       ├── edit/page.tsx   # View & edit all cards in a deck
│   │   │       ├── study/page.tsx  # Spaced repetition study session
│   │   │       └── quiz/page.tsx   # AI-generated multiple choice quiz
│   │   ├── globals.css             # Global styles, fonts, CSS variables
│   │   └── layout.tsx              # Root layout
│   │
│   ├── components/
│   │   ├── home/                   # Landing page sections
│   │   │   ├── HomeHero.tsx        # Hero section with CTA
│   │   │   ├── Features.tsx        # Feature grid with animated cards
│   │   │   ├── FeatureCard.tsx     # Individual feature card component
│   │   │   ├── ProblemSolution.tsx # Problem vs. solution comparison
│   │   │   └── FAQ.tsx             # Accordion FAQ section
│   │   └── shared/
│   │       ├── auth/
│   │       │   └── DashboardLayout.tsx  # Top navbar for authenticated pages
│   │       └── open/
│   │           ├── Navbar.tsx           # Public landing page navbar
│   │           ├── Footer.tsx           # Landing page footer
│   │           ├── Loading.tsx          # Reusable loading indicator
│   │           └── WantToContribute.tsx # Contribution form section
│   │
│   └── lib/                        # API clients and state
│       ├── api.ts                  # Axios instance with base URL & auth headers
│       ├── authStore.ts            # Zustand store for user auth state
│       ├── auth.api.ts             # Auth API calls (login, signup, me)
│       ├── decks.api.ts            # Deck CRUD API calls
│       ├── cards.api.ts            # Card CRUD & rating API calls
│       ├── llm.api.ts              # AI generation API call
│       ├── quiz.api.ts             # Quiz generation API call
│       └── email.api.ts            # Contribution email API call
│
├── public/                         # Static assets (images, icons)
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
└── package.json
```

### Backend (`backed/`)

```
backed/
├── src/
│   ├── server.js                   # Express app entry point, middleware, route mounting
│   │
│   ├── routes/                     # Route definitions (maps URL to controller)
│   │   ├── auth.routes.js          # POST /api/auth/register, /login, GET /me
│   │   ├── deck.routes.js          # CRUD /api/decks
│   │   ├── card.routes.js          # CRUD /api/cards + POST /rate
│   │   └── llm.routes.js           # POST /apierate, /quiz
│   │
│   ├── controllers/                # Business logic for each route
│   │   ├── auth.controller.js      # Register, login, get current user
│   │   ├── deck.controller.js      # Create, read, update, delete decks
│   │   ├── card.controller.js      # Create, read, update, delete, rate cards
│   │   └── llm.controller.js       # AI flashcard generation, quiz generation
│   │
│   ├── middleware/
│   │   └── auth.middleware.js      # JWT verification middleware (protects routes)
│   │
│   ├── services/
│   │   └── quiz.service.js         # Quiz generation service logic
│   │
│   └── lib/                        # Utility libraries
│       ├── llm.js                  # Google Gemini API client & prompts
│       ├── sendEmail.js            # Resend email client
│       └── spacedRepetition.js     # SM-2 spaced repetition algorithm
│
├── prisma/
│   └── schema.prisma               # Database schema (User, Deck, Card models)
│
├── .env                            # Environment variables (never commit this!)
└── package.json
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher
- **npm** v9 or higher
- **PostgreSQL** running locally or a cloud database (e.g., Neon, Supabase)
- **Git**

---

### Clone the Repository

```bash
# Clone the repo
git clone https://github.com/sankett13/Study-Flash-Card-Project.git
cd Study-Flash-Card-Project

# Switch to the develop branch — all active development happens here
git checkout develop
```

> [!IMPORTANT]
> Always work from `develop`, not `main`. `main` is reserved for stable, production-ready releases only.

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backed

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Then fill in your values (see Environment Variables section)

# 4. Generate Prisma client
npx prisma generate

# 5. Push schema to your database
npx prisma db push

# 6. Start the development server
npm run dev
```

The backend will start at **`http://localhost:4000`** (or the PORT in your `.env`).

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd study-flash-card

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:4000/api

# 4. Start the development server
npm run dev
```

The frontend will start at **`http://localhost:3000`**.

---

## Environment Variables

### Backend (`backed/.env`)

```env
# Server
PORT=4000

# Frontend URL (for OAuth redirects)
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"
SESSION_SECRET="your-super-secret-session-key"

# Google OAuth 2.0
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Gemini AI
GEMINI_API_KEY="your-google-gemini-api-key"

# For Quiz Generation
GROQ_API_KEY="your-groq-api-key"

# Resend (Email)
RESEND_API_KEY="your-resend-api-key"
```

### Frontend (`study-flash-card/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## � Google OAuth Setup

> For detailed setup instructions, see [`GOOGLE_OAUTH_SETUP.md`](GOOGLE_OAUTH_SETUP.md)

**Quick Setup:**

1. **Google Cloud Console**: Create a new project or use existing one
2. **Enable Google+ API**: In APIs & Services dashboard
3. **Create OAuth 2.0 Credentials**:
   - Application type: "Web application"
   - Authorized origins: `http://localhost:4000`
   - Authorized redirect URIs: `http://localhost:4000/api/auth/google/callback`
4. **Update Environment Variables**: Add your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
5. **Test OAuth Flow**: Click "Continue with Google" on login/signup pages

**OAuth Features:**

- ✅ New user registration with Google account
- ✅ Existing user account linking
- ✅ Seamless JWT token generation
- ✅ Profile data synchronization (name, email, avatar)

---

## �📡 API Reference

All backend routes are prefixed with `/api`.

### Authentication — `/api/auth`

| Method | Endpoint                | Description                  | Auth |
| ------ | ----------------------- | ---------------------------- | ---- |
| `POST` | `/auth/register`        | Create a new account         | ❌   |
| `POST` | `/auth/login`           | Login and receive JWT        | ❌   |
| `GET`  | `/auth/me`              | Get current user info        | ✅   |
| `GET`  | `/auth/google`          | Initiate Google OAuth        | ❌   |
| `GET`  | `/auth/google/callback` | Handle Google OAuth callback | ❌   |

### Decks — `/api/decks`

| Method   | Endpoint     | Description                     | Auth |
| -------- | ------------ | ------------------------------- | ---- |
| `GET`    | `/decks`     | Get all decks for user          | ✅   |
| `POST`   | `/decks`     | Create a new deck               | ✅   |
| `GET`    | `/decks/:id` | Get a single deck with cards    | ✅   |
| `PUT`    | `/decks/:id` | Update deck title/description   | ✅   |
| `DELETE` | `/decks/:id` | Delete a deck and all its cards | ✅   |

### Cards — `/api/cards`

| Method   | Endpoint             | Description                           | Auth |
| -------- | -------------------- | ------------------------------------- | ---- |
| `GET`    | `/cards/due/:deckId` | Get cards due for review today        | ✅   |
| `POST`   | `/cards`             | Create a new card manually            | ✅   |
| `PUT`    | `/cards/:id`         | Edit a card's front/back              | ✅   |
| `DELETE` | `/cards/:id`         | Delete a card                         | ✅   |
| `POST`   | `/cards/:id/rate`    | Rate recall (0–3) and update schedule | ✅   |

### AI — `/api/ai`

| Method | Endpoint           | Description                                | Auth |
| ------ | ------------------ | ------------------------------------------ | ---- |
| `POST` | `/ai/generate`     | Generate flashcards from text using Gemini | ✅   |
| `POST` | `/ai/quiz/:deckId` | Generate a multiple-choice quiz for a deck | ✅   |

### Contributions — `/api/contributions`

| Method | Endpoint         | Description                           | Auth |
| ------ | ---------------- | ------------------------------------- | ---- |
| `POST` | `/contributions` | Send a contribution message via email | ❌   |

---

## Contributor Guide

Thank you for wanting to contribute to StudyFlash! Please read this section carefully before making any changes.

---

### Claiming Work (Avoid Duplicate Effort)

Before writing a single line of code, **always check GitHub Issues first**.
This is the single rule that prevents two people from building the same thing.

#### Step 1 — Check existing issues

Go to the [Issues tab](https://github.com/sankett13/Study-Flash-Card-Project/issues) and look for:

- An issue that matches what you want to build
- Check if it already has someone **assigned** to it
- Check for the labels `in-progress` or `claimed` — those are taken

#### Step 2 — Claim an existing issue

If you find an open issue that **is not assigned**:

1. Leave a comment: **"I'd like to work on this."**
2. A maintainer will assign it to you
3. Once assigned, create your branch (see [Creating a Feature Branch](#creating-a-feature-branch))

> [!IMPORTANT]
> Do **not** start a branch for an issue until you are officially assigned. A comment alone does not claim the issue.

#### Step 3 — Create a new issue (if none exists)

If your idea or bug doesn't have an issue yet, open one:

1. Go to [New Issue](https://github.com/sankett13/Study-Flash-Card-Project/issues/new/choose)
2. Choose the appropriate template (**Feature Request** or **Bug Report**)
3. Fill it in with enough detail for others to understand the scope
4. Wait for a maintainer to triage and assign it to you before starting work

#### GitHub Issue Labels

| Label              | Meaning                                     |
| ------------------ | ------------------------------------------- |
| `good first issue` | Beginner-friendly, small scope              |
| `feature`          | New functionality to be added               |
| `bug`              | Something is broken                         |
| `enhancement`      | Improvement to existing functionality       |
| `in-progress`      | Someone is actively working on this         |
| `needs review`     | Implementation done, PR open                |
| `help wanted`      | Maintainers need assistance                 |
| `blocked`          | Cannot proceed until another issue resolves |

---

### Branching Strategy

We follow a structured Git branching model:

| Branch        | Purpose                                                    |
| ------------- | ---------------------------------------------------------- |
| `main`        | Production-ready code. Only merged via approved PRs.       |
| `develop`     | Integration branch. All feature branches merge here first. |
| `feature/...` | New features or enhancements                               |
| `fix/...`     | Bug fixes                                                  |
| `chore/...`   | Maintenance tasks (dependencies, config, refactoring)      |
| `docs/...`    | Documentation updates only                                 |

---

### Creating a Feature Branch

Follow these steps every time you start working on something new:

**Step 1: Sync your local repo with the latest changes**

```bash
git checkout develop
git pull origin develop
```

**Step 2: Create a new branch from `develop`**

Use the appropriate prefix and a short, descriptive name:

```bash
# For a new feature
git checkout -b feature/ai-image-flashcards

# For a bug fix
git checkout -b fix/login-token-expiry

# For a UI improvement
git checkout -b feature/dashboard-dark-mode

# For documentation
git checkout -b docs/update-api-reference
```

**Step 3: Make your changes**

Work only within the scope of your branch. Keep changes focused.

**Step 4: Commit with a clear message**

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
git add .
git commit -m "feat: add AI image generation for flashcards"

# Types: feat | fix | chore | docs | refactor | style | test
```

**Step 5: Push your branch**

```bash
git push origin feature/ai-image-flashcards
```

**Step 6: Open a Pull Request**

- Go to the repository on GitHub.
- Open a PR from your branch **into `develop`** (NOT `main`).
- Fill in the PR template describing your changes.
- Request a review from a maintainer.

---

### Code Conventions

#### Frontend (`study-flash-card/`)

- **Components**: PascalCase files (e.g., `DeckCard.tsx`). One component per file.
- **API calls**: Add all new API functions in `src/lib/*.api.ts` files. Do **not** call `axios` directly in components.
- **State**: Use Zustand for global state. Keep local state in components with `useState`.
- **Styling**: Use Tailwind CSS utility classes. Avoid inline `style` props unless for dynamic values (e.g., progress bar widths).
- **Animations**: Use Framer Motion (`motion.*` components). All animations should have `viewport={{ once: true }}` for scroll-triggered ones.
- **Pages**: All new pages go inside `src/app/`. Use route groups `(auth)` or `(public)` appropriately.
- **UI Development**: UIß reference screens are available in the `study-flash-card/screens` directory for accurate component implementation. Always check existing designs before creating new UI components.

#### Backend (`backed/`)

- **Controllers**: Each controller function handles one specific action. Keep it lean — business logic goes in `services/` or `lib/`.
- **Routes**: Route files only define URL patterns and apply middleware. Logic stays in controllers.
- **Validation**: Use Zod for all incoming request bodies.
- **Auth**: Any route requiring a logged-in user must use the `auth.middleware.js` middleware. Google OAuth routes use Passport.js strategy.
- **Prisma**: All DB access goes through the Prisma client. Do not write raw SQL unless absolutely necessary.
- **AI prompts**: All Gemini and Groq prompts live in `src/lib/llm.js`. Keep them well-commented.
- **OAuth**: Google OAuth implementation uses Passport.js with proper session management and account linking.

---

### Pull Request Process

1. Ensure your branch is up to date with `develop` before submitting.
2. Your PR must not break existing functionality.
3. Add a clear description of **what** your PR does and **why**.
4. Add screenshots for any visual/UI changes.
5. A maintainer will review and either approve or request changes.
6. Once approved and merged into `develop`, it will be included in the next release to `main`.

---

## Features

- ✅ **Authentication**: Email/password login + Google OAuth with Passport.js
- ✅ **AI Generation**: Create flashcard decks from any text/notes using Google Gemini AI
- ✅ **Spaced Repetition**: Study sessions with SM-2 algorithm for optimal retention
- ✅ **AI Quizzes**: AI-powered multiple-choice quiz generation per deck
- ✅ **Manual Cards**: Create and edit flashcards manually
- ✅ **Progress Tracking**: Mastery tracking and daily streak counter
- ✅ **Analytics**: Retention percentage ring chart
- ✅ **Responsive UI**: Animated, responsive landing page
- ✅ **Contact**: Contribution form with email delivery
- ✅ **OAuth Integration**: Seamless Google sign-in with account linking

---

<div align="center">
  <p>Built with ❤️ by the StudyFlash team</p>
</div>
