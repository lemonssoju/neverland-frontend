import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export async function setAccessToken(token: string): Promise<void> {
  await Keychain.setGenericPassword(ACCESS_TOKEN, token, {
    service: ACCESS_TOKEN,
  });
}

export async function setRefreshToken(token: string): Promise<void> {
  await Keychain.setGenericPassword(REFRESH_TOKEN, token, {
    service: REFRESH_TOKEN,
  });
}

export async function getAccessToken(): Promise<string> {
  const data: Keychain.UserCredentials | false =
    await Keychain.getGenericPassword({ service: ACCESS_TOKEN });
  if (!data) {
    return '';
  }
  return data.password;
}

export async function getRefreshToken(): Promise<string> {
  const data: Keychain.UserCredentials | false =
    await Keychain.getGenericPassword({ service: REFRESH_TOKEN });
  if (!data) {
    return '';
  }
  return data.password;
}

export async function resetAllTokens() {
  return await Promise.all([
    Keychain.resetGenericPassword({
      service: ACCESS_TOKEN,
    }),
    Keychain.resetGenericPassword({
      service: REFRESH_TOKEN,
    }),
  ]);
}