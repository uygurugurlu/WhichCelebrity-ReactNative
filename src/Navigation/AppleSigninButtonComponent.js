import {

  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'
import React from 'react'
import { View , StyleSheet} from 'react-native'
import { translate } from '../I18n'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import {getData, storeStringData} from "../common/Functions/ManageAsyncData";
export const AppleSigninButtonComponent = props => {
  const iconProps = { size: 40, color: '#888' }

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
      // 👈 test if you can start otherwise nothing will happen
    setTimeout(async() => {
      if(await getData('@DrawerAnimation') === null){
        start();
        await storeStringData('@DrawerAnimation',"stored");
      }}, 2500);

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
        zone={2}
        text={translate("dashboard.showcase_title")}
        borderRadius={16}
      >
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160, // You must specify a width
            height: 45, // You must specify a height
          }}
          onPress={props.handleAppleSignIn}
        />
      </TourGuideZone>
    </View>
  )
}
const styles= StyleSheet.create({
  container: {
    flex: 1,
  },
});
