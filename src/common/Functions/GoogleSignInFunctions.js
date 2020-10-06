import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

export const signInFunction = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log("Log in succesful, userInfo: ",userInfo)
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Google signin error: ', error.code);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Google signin error: ', error.code);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google signin error: ', error.code);
    } else {
      console.log('Google signin error: ', error.code);
    }
  }
};
export const getCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      console.log('Google signin error: ', error.code);
    } else {
      console.log('Google signin error: ', error.code);
    }
  }
};
export const isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  return isSignedIn;
};
export const getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  return currentUser;
};
export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};
