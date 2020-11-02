import {

  TourGuideZone, // Main wrapper of highlight component
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'
import { GoogleSigninButton } from '@react-native-community/google-signin'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { translate } from '../I18n'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../common/Constants'
import { getData, storeStringData } from '../common/Functions/ManageAsyncData'
export const GoogleSigninButtonComponent = props => {

  // Use Hooks to control!
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController()

  // Can start at mount 🎉
  // you need to wait until everything is registered 😁
  React.useEffect( () => {
    if (canStart ) {

      // 👈 test if you can start otherwise nothing will happen
      setTimeout(async() => {
        if(await getData('@DrawerAnimation') === null){
          start();
          await storeStringData('@DrawerAnimation',"stored");
        }}, 2500);
    }
  }, [canStart]) // 👈 don't miss it!

  React.useEffect(() => {
    eventEmitter.on('start', () => console.log('start'))
    eventEmitter.on('stop', () => console.log('stop'))
    eventEmitter.on('stepChange', () => console.log(`stepChange`))

    return () => eventEmitter.off('*', null)
  }, [])
  return (
    <View style={styles.container}>

      <TourGuideZone
        zone={0}
        text={translate("dashboard.showcase_title")}
        borderRadius={16}
      >
        <View style={styles.wrapper}>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            color={GoogleSigninButton.Color.Dark}
            onPress={props.handleGoogleSignIn}
          />
        </View>
      </TourGuideZone>

    </View>
  )
}
const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
  },
  wrapper: {
    height: 70,
    width: 200,
    marginBottom: 30,
  },
  modalStyle: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  }
});
