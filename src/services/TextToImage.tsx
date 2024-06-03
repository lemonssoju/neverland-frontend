import { STABILITY_API_KEY } from 'react-native-dotenv';

interface generateImagesProps {
  text: string;
  style?: string;
}

export const generateTextToImage = async ({
  text,
  style,
}: generateImagesProps) => {
  const engineId = 'stable-diffusion-v1-6';
  const apiHost = 'https://api.stability.ai';
  const apiKey = STABILITY_API_KEY;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const requestBody = {
    text_prompts: [
      {
        text: text,
      },
    ],
    cfg_scale: 7,
    steps: 30,
    samples: 1,
    style_preset: style,
  };

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    },
  );

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const responseJSON = await response.json();
  const generatedImageURL = {
    base64: `data:image/png;base64,${responseJSON.artifacts[0].base64}`,
  };

  return generatedImageURL;
};
