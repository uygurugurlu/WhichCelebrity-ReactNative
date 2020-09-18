import I18n from 'i18n-js';
// Use for caching/memoize for better performance
import memoize from 'lodash.memoize';
import {I18nManager} from 'react-native';
import * as RNLocalize from 'react-native-localize';

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  tr: () => require('./tr.json'),
  en: () => require('./en.json'),
};

export const translate = memoize(
  (key, config) => I18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = (setLanguage) => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};
  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;
  const language = {languageTag: languageTag, isRTL: isRTL};
  setLanguage(language);

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  I18n.translations = {[languageTag]: translationGetters[languageTag]()};
  I18n.locale = languageTag;
};

I18n.fallbacks = true;
export default I18n;
