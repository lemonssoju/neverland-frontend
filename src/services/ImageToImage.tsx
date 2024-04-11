<<<<<<< HEAD

import fs from 'node:fs';
import { STABILITY_API_KEY } from 'react-native-dotenv';

const generateImages = async () => {
=======
import { STABILITY_API_KEY } from 'react-native-dotenv';

interface generateImagesProps {
  imageUri: string;
  text: string;
  style?: string;
}

const generateImages = async ({ imageUri, text, style }: generateImagesProps) => {
>>>>>>> 5b788d2 (#62 feat: 스테이블 디퓨전 연결)
  const engineId = 'stable-diffusion-v1-6';
  const apiHost = 'https://api.stability.ai';
  const apiKey = STABILITY_API_KEY;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const formData = new FormData();
<<<<<<< HEAD
  formData.append('init_image', fs.readFileSync('../init_image.png'));
  formData.append('init_image_mode', 'IMAGE_STRENGTH');
  formData.append('image_strength', 0.35);
  formData.append('text_prompts[0][text]', 'Galactic dog wearing a cape');
  formData.append('cfg_scale', 7);
  formData.append('samples', 1);
  formData.append('steps', 30);
=======
  formData.append('init_image', {
    uri: imageUri,
    name: 'init_image.png',
    type: 'image/png',
  });
  formData.append('init_image_mode', 'IMAGE_STRENGTH');
  formData.append('image_strength', 0.35);
  formData.append('text_prompts[0][text]', text);
  formData.append('cfg_scale', 7);
  formData.append('samples', 1);
  formData.append('steps', 30);
  style && formData.append('style_preset', style);
>>>>>>> 5b788d2 (#62 feat: 스테이블 디퓨전 연결)

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/image-to-image`,
    {
      method: 'POST',
      headers: {
<<<<<<< HEAD
        //...formData.getHeaders(),
=======
>>>>>>> 5b788d2 (#62 feat: 스테이블 디퓨전 연결)
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
<<<<<<< HEAD
    }
=======
    },
>>>>>>> 5b788d2 (#62 feat: 스테이블 디퓨전 연결)
  );

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const responseJSON = await response.json();
<<<<<<< HEAD
  const generatedImages = responseJSON.artifacts.map((image: any) => ({
    base64: `data:image/png;base64,${image.base64}`,
  }));
=======
  const generatedImages = {
    base64: `data:image/png;base64,${responseJSON.artifacts[0].base64}`,
  };
>>>>>>> 5b788d2 (#62 feat: 스테이블 디퓨전 연결)
  return generatedImages;
};

export default generateImages;
