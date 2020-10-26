import {

  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'
import { GoogleSigninButton } from '@react-native-community/google-signin'
import React from 'react'
import { View , StyleSheet} from 'react-native'
import { translate } from '../I18n'
export const GoogleSigninButtonComponent = props => {
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
    if (canStart) {
      // 👈 test if you can start otherwise nothing will happen
      setTimeout(() => start(), 0)
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
        zone={2}
        text={translate("dashboard.showcase_title")}
        borderRadius={16}
      >
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={props.handleGoogleSignIn}
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
