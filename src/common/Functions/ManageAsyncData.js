import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Async Storage store data error: ', e);
  }
};
export const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('Async Storage store string data error: ', e);
  }
};

export const getData = (key) => {
  try {
    const value = AsyncStorage.getItem(key);
    return value;

  } catch (e) {

    console.log('Error get data: ', e);
  }
}
