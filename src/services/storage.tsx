import * as Keychain from 'react-native-keychain';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

async function getSecureValue(key: string): Promise<string> {
  const result = await Keychain.getInternetCredentials(key);
  if (result) {
    return result.password;
  }
  return '';
}

function setSecureValue(key: string, value: string) {
  Keychain.setInternetCredentials(key, key, value);
}

function removeSecureValue(key: string) {
  Keychain.resetInternetCredentials(key);
}

export function setAccessToken(token: string) {
  setSecureValue(ACCESS_TOKEN, token);
}

export function setRefreshToken(token: string) {
  setSecureValue(REFRESH_TOKEN, token);
}

export async function getAccessToken(): Promise<string> {
  return await getSecureValue(ACCESS_TOKEN);
}

export async function getRefreshToken(): Promise<string> {
  return await getSecureValue(REFRESH_TOKEN);
}

export function removeAccessToken() {
  removeSecureValue(ACCESS_TOKEN);
}

export function removeRefreshToken() {
  removeSecureValue(REFRESH_TOKEN);
}
