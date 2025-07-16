// src/functions/CohereAssistant.ts
const COHERE_API_KEY = 'jWfa8SqGFIjN3vsbvACjdu0JjIMSlYgPiOI7nNOG'; // ← pon tu key real
const COHERE_CHAT_ENDPOINT = 'https://api.cohere.ai/v1/chat';

let callCount = 0;
const MAX_CALLS_PER_MINUTE = 5;

function canMakeCall(): boolean {
  return callCount < MAX_CALLS_PER_MINUTE;
}

function incrementCallCount() {
  callCount++;
  setTimeout(() => callCount--, 60000);
}

interface WeatherData {
  ciudad: string;
  temperatura: string;
  humedad: string;
  condición: string;
}

export async function askCohere(
  userMessage: string,
  weatherData: WeatherData
): Promise<{ answer?: string; error?: string }> {
  if (!canMakeCall()) {
    return { error: 'Límite de llamadas alcanzado. Intenta en un minuto.' };
  }

  incrementCallCount();

  try {
    const response = await fetch(COHERE_CHAT_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command-r-plus',
        message: userMessage,
        temperature: 0.3,
        chat_history: [],
        documents: [
          {
            title: 'weather-data',
            text: `Clima actual: ${JSON.stringify(weatherData)}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return { error: `Error HTTP: ${response.status}` };
    }

    const result = await response.json();
    return { answer: result.text };
  } catch (error: any) {
    return { error: `Error de red: ${error.message}` };
  }
}
