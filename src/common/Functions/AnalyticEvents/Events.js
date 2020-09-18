import analytics from '@react-native-firebase/analytics';

export const SetCelebrityFinderScreenEvent = () => {
  try {
    console.log('celebrity_finder_screen Event çalıştı ...');
    analytics().logEvent('celebrity_finder_screen', {
      description: 'Celebrity Finder Screen Visited',
    });
  } catch (e) {
    console.log('Celebrity finder screen visiting Firebase-Log error: ', e);
  }
};

export const SetCelebritySelectionScreenEvent = () => {
  try {
    console.log('celebrity_selection_screen Event çalıştı ...');
    analytics().logEvent('celebrity_selection_screen', {
      description: 'Celebrity Selection Screen Visited',
    });
  } catch (e) {
    console.log('Celebrity selection screen visiting Firebase-Log error: ', e);
  }
};

export const RandomResultEvent = () => {
  try {
    console.log('random_celebrity_button Event çalıştı ...');
    analytics().logEvent('random_celebrity_button', {
      description: 'Random Celebrity Button Clicked',
    });
  } catch (e) {
    console.log('Random celebrity button click Firebase-Log error: ', e);
  }
};

export const CelebrityFinderResultEvent = (category, gender) => {
  try {
    console.log('celebrity_finder_result_button Event çalıştı ...');
    analytics().logEvent('celebrity_finder_result_button', {
      description: 'Celebrity Finder Result Button Clicked',
      category: category,
      gender: gender,
    });
  } catch (e) {
    console.log('Celebrity Finder Result Button click Firebase-Log error: ', e);
  }
};

export const SelectedCelebrityResultEvent = () => {
  try {
    console.log('selected_celebrity_result_button Event çalıştı ...');
    analytics().logEvent('selected_celebrity_result_button', {
      description: 'Selected Celebrity Result Button Clicked',
    });
  } catch (e) {
    console.log('Random button click Firebase-Log error: ', e);
  }
};

export const SaveResultEvent = () => {
  try {
    console.log('save_result_button Event çalıştı ...');
    analytics().logEvent('save_result_button', {
      description: 'Save Result Button Clicked',
    });
  } catch (e) {
    console.log('Save result button click Firebase-Log error: ', e);
  }
};

export const ShareResultEvent = () => {
  try {
    console.log('share_result_button Event çalıştı ...');
    analytics().logEvent('share_result_button', {
      description: 'Share Result Button Clicked',
    });
  } catch (e) {
    console.log('Share result button click Firebase-Log error: ', e);
  }
};

export const ShareAppEvent = () => {
  try {
    console.log('share_app_button Event çalıştı ...');
    analytics().logEvent('share_app_button', {
      description: 'Share App Button Clicked',
    });
  } catch (e) {
    console.log('Share app button click Firebase-Log error: ', e);
  }
};
