const gpt = async (system: string, prompt: string) => {
  const response = await fetch(
    `${process.env.AZURE_OPENAPI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAPI_GPT_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAPI_KEY || "",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: system,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 4000,
        stop: null,
      }),
    }
  );
  if (!response.ok) throw await response.json();
  return (await response.json()).choices[0].message.content;
};

const dalle = async (prompt: string, retry: boolean = true) => {
  const response = await fetch(
    `${process.env.AZURE_OPENAPI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAPI_DALLE_DEPLOYMENT}/images/generations?api-version=2024-02-01`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAPI_KEY || "",
      },
      body: JSON.stringify({
        prompt: prompt,
        size: "1024x1024",
        n: 1,
        quality: "standard",
        style: "vivid",
      }),
    }
  );
  const body = await response.json();
  if (retry && body?.error?.inner_error?.revised_prompt) {
    return await dalle(body.error.inner_error.revised_prompt, false);
  }
  if (!response.ok) throw body;
  return body.data[0].url;
};

const clearCardData = (cardData: string) =>
  cardData.replace("```json", "").replace("```", "");

const generateCardSystem = () =>
  "Eres una IA que genera los datos de Magic: The Gatheric ficticias o modificadas según la descipción del usuario en formato JSON";

const generateCardPrompt = (
  prompt: string
) => `Quiero que generes los datos de una criatura de Magic: The Gathering basándote en la descripción que te proporciono. La carta debe ser inventada y no debe existir en la vida real o una modificación de una carta real si el usuario así lo indica. 
  
  La respuesta debe estar en formato JSON y debe incluir los siguientes campos: color, name, type, text, manaCost, attackDefense.
  
  Aquí tienes un ejemplo de respuesta JSON:
  {
      "color": "green",
      "name": "Rin and Seri, Inseparable",
      "type": "Legendary Creature — Dog Cat",
      "text": "Whenever you cast a Dog spell, create a 1/1 green Cat creature token.<br/>Whenever you cast a Cat spell, create a 1/1 white Dog creature token.<br/>{R}{G}{W}, {T}: Rin and Seri, Inseparable deals damage to any target equal to the number of Dogs you control. You gain life equal to the number of Cats you control.",
      "manaCost": "{1}{R}{G}{W}",
      "attackDefense": "4/4",
  }
  
  Los colores posibles son "artifact" | "black" | "blue" | "multi" | "red" | "white" | "land"
  Si una carta tiene más de un color de maná en cualquier parte de la carta, debe ser "multi"
  General todo en español, includo el name, type and text (a menos que se indique lo contrario)
  
  Si la carta no es una criatura deja attackDefense en blanco
  Si generas texto de ambientación (no es obligatorio) ponlo entre etiquetas <i> de HTML y añade un salto de línea antes del texto de ambientación.
  
  Instrucciones del usuario ${prompt}
  Genera solo el JSON, nada más. JSON:
  `;

const generateRefinePromptSystem = () =>
  "Eres una IA que genera un prompt para que Dalle genere ilustraciones de criaturas, objeto o paisaje de fantasía al estilo Magic: The Gathering. Asegúrate que el prompt no incumple las reglas de contenido de Dalle.";

const generateRefinePromptPrompt = (
  prompt: string,
  cardData: string
) => `Las idicaciones del usuario son: '${prompt}'.
  Y estos son los datos de la carta  ${cardData}.
  Asegúrate que el prompt no incumple las reglas de contenido de Dalle y que el Dalle solo crea la ilustración pero no la carta ni los bordes ni nada. Tiene que generar una ilustración de la criatura, objeto o paisaje que se descirba.
  Es importante que la parte importante de la ilustración esté centrada. Y que solo incluya la ilustración.
  Dalle Prompt:`;

export async function POST(request: Request) {
  const { prompt, previousCardData } = await request.json();
  try {
    const cardData = previousCardData
      ? previousCardData
      : JSON.parse(
          clearCardData(
            await gpt(generateCardSystem(), generateCardPrompt(prompt))
          )
        );
    const dallePrompt = await gpt(
      generateRefinePromptSystem(),
      generateRefinePromptPrompt(prompt, cardData)
    );
    const imageUrl = await dalle(dallePrompt);
    return new Response(
      JSON.stringify({
        ...cardData,
        cardImage: imageUrl,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
