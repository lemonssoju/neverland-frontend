
import fs from 'node:fs';
import { STABILITY_API_KEY } from 'react-native-dotenv';

const generateImages = async () => {
  const engineId = 'stable-diffusion-v1-6';
  const apiHost = 'https://api.stability.ai';
  const apiKey = STABILITY_API_KEY;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const formData = new FormData();
  formData.append('init_image', fs.readFileSync('../init_image.png'));
  formData.append('init_image_mode', 'IMAGE_STRENGTH');
  formData.append('image_strength', 0.35);
  formData.append('text_prompts[0][text]', 'Galactic dog wearing a cape');
  formData.append('cfg_scale', 7);
  formData.append('samples', 1);
  formData.append('steps', 30);

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/image-to-image`,
    {
      method: 'POST',
      headers: {
        //...formData.getHeaders(),
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const responseJSON = await response.json();
  const generatedImages = responseJSON.artifacts.map((image: any) => ({
    base64: `data:image/png;base64,${image.base64}`,
  }));
  return generatedImages;
};

export default generateImages;
