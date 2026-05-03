# SmartStudy AI

A minimal React + Vite hackathon app for summarizing notes and generating quiz questions, with Firebase Firestore helpers included.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and add your Firebase project values.

3. Start the app:

   ```bash
   npm run dev
   ```

## Firebase

Firestore task helpers live in `src/firebase/tasks.js`.

- `addTask(title)` stores `{ title, completed: false }`
- `fetchTasks()` returns tasks from the `tasks` collection

## AI Placeholders

Dummy AI functions live in `src/services/aiService.js`.

- `summarizeText(text)`
- `generateQuiz(text)`
