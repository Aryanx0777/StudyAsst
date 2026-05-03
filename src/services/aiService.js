const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_MODEL = "openrouter/free";

async function callOpenRouter(messages) {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter request failed: ${response.status}`);
  }

  return response.json();
}

export async function summarizeText(text) {
  if (!text.trim()) {
    return { summary: "Please enter notes first" };
  }

  try {
    const data = await callOpenRouter([
      { role: "user", content: "Summarize this text clearly:\n" + text }
    ]);
    const summary = data.choices?.[0]?.message?.content || "Error generating summary";

    return { summary };
  } catch (error) {
    console.error("OpenRouter Error:", error);
    return { summary: "Error generating summary" };
  }
}

export async function generateQuiz(text) {
  if (!text.trim()) {
    return [];
  }

  try {
    const data = await callOpenRouter([
      {
        role: "user",
        content:
          'Generate 2 multiple choice questions in JSON format like:\n[\n{\n"question": "string",\n"options": ["A","B","C","D"],\n"answer": "string"\n}\n]\nText:\n' +
          text
      }
    ]);
    let raw = data.choices?.[0]?.message?.content || "";
    raw = raw.replace(/```json|```/g, "").trim();

    return JSON.parse(raw);
  } catch (error) {
    console.error("OpenRouter Quiz Error:", error);
    return [];
  }
}
