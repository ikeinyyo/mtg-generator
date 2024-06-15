import { useMutation } from "@tanstack/react-query";
import { CardRequest } from "./domain";

export type CardData = {
  name: string;
  type: string;
  text: string;
  manaCost: string;
  attackDefense: string;
  cardImage: string;
  color: string;
};

const gpt = async (system: string, prompt: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AZURE_OPENAPI_ENDPOINT}/openai/deployments/${process.env.NEXT_PUBLIC_AZURE_OPENAPI_GPT_DEPLOYMENT}/chat/completions?api-version=2024-02-15-preview`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_AZURE_OPENAPI_KEY || "",
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
  return (await response.json()).choices[0].message.content;
};

const dalle = async (prompt: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AZURE_OPENAPI_ENDPOINT}/openai/deployments/${process.env.NEXT_PUBLIC_AZURE_OPENAPI_DALLE_DEPLOYMENT}/images/generations?api-version=2024-02-01`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_AZURE_OPENAPI_KEY || "",
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
  return (await response.json()).data[0].url;
};

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

Los colores posibles son "artifact" | "black" | "blue" | "multi" | "red" | "white"
General todo en español, includo el name, type and text (a menos que se indique lo contrario)

Si la carta no es una criatura deja attackDefense en blanco
Si generas texto de ambientación (no es obligatorio) ponlo entre etiquetas <i> de HTML

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
Dalle Prompt:`;

const generateCard = async (cardRequest: CardRequest) => {
  const cardData = JSON.parse(
    await gpt(generateCardSystem(), generateCardPrompt(cardRequest.prompt))
  );
  const dallePrompt = await gpt(
    generateRefinePromptSystem(),
    generateRefinePromptPrompt(cardRequest.prompt, cardData)
  );
  const imageUrl = await dalle(dallePrompt);
  return {
    ...cardData,
    cardImage: imageUrl,
  } as CardData;
};

const useCardData = (
  onSuccess: (cardData: CardData) => void,
  onError: () => void
) =>
  useMutation<CardData, Error, CardRequest>({
    mutationFn: (cardRequest: CardRequest) => {
      return generateCard(cardRequest).then((cardData) => cardData);
    },
    onSuccess: onSuccess,
    onError: onError,
  });

export default useCardData;
