// src/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';

export const storeAuthToken = async (authToken: string) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken);
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

export const getStoredAuthToken = async () => {
  try {
    const authToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    return authToken;
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return null;
  }
};

export const removeStoredAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};
