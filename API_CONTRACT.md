# SmartStudy AI API Contract

SmartStudy AI uses a React frontend, Firebase Firestore, and AI helper functions for Gemini/OpenAI integration. There is no custom backend server.

This contract defines the function responses and Firestore data shape frontend developers should rely on.

## 1. AI Functions

All AI calls must go through `src/services/aiService.js`.

### `summarizeText(text: string)`

Summarizes study notes.

Response:

```json
{
  "summary": "string"
}
```

### `generateQuiz(text: string)`

Generates quiz questions from study notes.

Response:

```json
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "answer": "string"
  }
]
```

## 2. Function Behavior

### Empty Input

If `text` is empty or only whitespace:

- `summarizeText(text)` always returns an object:

```json
{
  "summary": "Please enter notes first"
}
```

- `generateQuiz(text)` always returns an array:

```json
[]
```

Frontend developers should validate input before calling these functions when possible.

## 3. Firebase Data Structure

Firestore collection:

```text
tasks
```

Task document fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Firestore document ID |
| `title` | `string` | Task title |
| `completed` | `boolean` | Whether the task is complete |
| `createdAt` | `timestamp` | Firestore server timestamp |

Example task:

```json
{
  "id": "abc123",
  "title": "Review biology notes",
  "completed": false,
  "createdAt": "Firestore Timestamp"
}
```

## 4. Usage Rules

- Frontend must call only these AI functions:
  - `summarizeText()`
  - `generateQuiz()`
- Do not make direct Gemini/OpenAI API calls from React components.
- Keep all AI provider logic inside `src/services/aiService.js`.
- Do not change the response format without updating this contract.
- Firestore task reads and writes should use the helpers in `src/firebase/tasks.js`.

## UI Handling Notes

- Frontend should show a loading state while waiting for AI responses.
- Frontend should handle empty quiz arrays gracefully.
- Frontend should display summary text even if it contains an error message.

## Ownership Rules

- Only Person 1 (project lead) can modify `src/services/aiService.js`.
- Other developers must only call `summarizeText()` and `generateQuiz()`.
- Do not change response formats without updating this contract.

## 5. Examples

### Summarize Text

Input:

```js
summarizeText('Photosynthesis is the process plants use to convert sunlight into energy.')
```

Output:

```json
{
  "summary": "Photosynthesis allows plants to convert sunlight into usable energy."
}
```

Empty input output:

```json
{
  "summary": "Please enter notes first"
}
```

### Generate Quiz

Input:

```js
generateQuiz('Photosynthesis happens in chloroplasts and uses sunlight, carbon dioxide, and water.')
```

Output:

```json
[
  {
    "question": "Where does photosynthesis happen?",
    "options": ["Chloroplasts", "Mitochondria", "Nucleus", "Ribosomes"],
    "answer": "Chloroplasts"
  }
]
```

Empty input output:

```json
[]
```
