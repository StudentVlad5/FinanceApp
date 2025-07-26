import { getFromStorage, saveToStorage } from 'services/localStorService';

export const generateTemporaryToken = () => {
  const token = Math.random().toString(36).substr(2, 10);
  return token;
};

export const setTemporaryToken = token => {
  saveToStorage('temporaryToken', token);
};

export const getTemporaryToken = () => {
  return getFromStorage('temporaryToken');
};

const storedToken = getTemporaryToken();

if (!storedToken) {
  const temporaryToken = generateTemporaryToken();
  setTemporaryToken(temporaryToken);
}
