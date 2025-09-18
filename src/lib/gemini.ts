 const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent`;

// Read the API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
/**
 * Converts a File object to a base64 encoded string.
 * @param file The file to convert.
 * @returns A promise that resolves with the base64 string.
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // The result is a data URL like "data:image/jpeg;base64,LzlqLzRBQ...".
      // We only need the part after the comma.
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Calls the Gemini API with a given prompt and an optional image.
 * @param prompt The text prompt to send to the model.
 * @param imageBase64 The base64 encoded image string (optional).
 * @param useGrounding Whether to use Google Search grounding for up-to-date info (optional).
 * @returns A promise that resolves with the text response from the API.
 */
export async function runGemini(
  prompt: string,
  imageBase64: string | null = null,
  useGrounding: boolean = false,
  imageMimeType: string = "image/jpeg"
): Promise<string> {
  const url = `${GEMINI_API_URL}?key=${API_KEY}`;
  const retries = 3;
  const delay = 1000;

  if (!API_KEY) {
    throw new Error("Missing VITE_GEMINI_API_KEY. Please set it in your environment.");
  }

  const parts = [{ text: prompt }];
  if (imageBase64) {
    parts.push({
      inlineData: {
        mimeType: imageMimeType || "image/jpeg",
        data: imageBase64
      }
    } as any);
  }

  const payload: any = {
    contents: [{ parts: parts }],
    systemInstruction: {
        parts: [{ text: "You are a friendly and knowledgeable agricultural assistant named AgriSage. Provide clear, concise, and helpful advice for farmers. If asked about a disease, identify it, describe its symptoms, suggest organic and chemical treatments, and offer preventative measures." }]
    }
  };

  if (useGrounding) {
    payload.tools = [{ "google_search": {} }];
  }

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const candidate = result.candidates?.[0];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        return candidate.content.parts[0].text;
      } else {
        throw new Error("Invalid response structure from API.");
      }
    } catch (error) {
      console.error(`Gemini API call attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        throw new Error("Failed to get a response from the AI assistant after multiple attempts.");
      }
      await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
    }
  }
  throw new Error("An unexpected error occurred in the Gemini API call.");
}

