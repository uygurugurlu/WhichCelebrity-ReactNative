import {
  FIRST_TIME_LOGIN,
  SET_LANGUAGE,
  GET_USER_AGENT,
  TRIGGER_SAVINGS_PAGE,
  GET_USER_AVATAR_SOURCE,
  GET_CAPTURED_IMAGE_URI,
  ADD_TO_DELETE_LIST,
  REMOVE_FROM_DELETE_LIST,
  CLEAR_DELETE_LIST,
  CHANGE_SELECTED_TO_DELETE_COUNT,
  CLEAR_SELECTED_TO_DELETE_COUNT,
  GET_DETECTED_FACE_COUNT,
} from '../Actions/ActionTypes';

import update from 'react-addons-update';

const initialState = {
  is_the_login_first_time: null,

  language: {
    languageTag: 'tr',
    isRTL: false,
  },

  user_agent: '',

  captured_image_uri: '',

  savings_page_refresh_trigger: 0,

  userAvatarSource: '',
  userAvatarB64: '',

  selected_to_delete_count: 0,

  delete_list: [],

  detected_face_count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FIRST_TIME_LOGIN:
      return (state = update(state, {
        is_the_login_first_time: {$set: action.is_first},
      }));

    case SET_LANGUAGE:
      return (state = update(state, {
        language: {$set: action.language},
      }));

    case GET_DETECTED_FACE_COUNT:
      return (state = update(state, {
        detected_face_count: {$set: action.count},
      }));

    case GET_USER_AGENT:
      return (state = update(state, {
        user_agent: {$set: action.agent},
      }));

    case TRIGGER_SAVINGS_PAGE:
      return (state = update(state, {
        savings_page_refresh_trigger: {
          $set: state.savings_page_refresh_trigger + 1,
        },
      }));

    case GET_USER_AVATAR_SOURCE:
      return (state = update(state, {
        userAvatarSource: {$set: action.source},
        userAvatarB64: {$set: action.base64_data},
      }));

    case GET_CAPTURED_IMAGE_URI:
      return (state = update(state, {
        captured_image_uri: {$set: action.image_uri},
      }));

    case ADD_TO_DELETE_LIST:
      return (state = update(state, {
        delete_list: {$push: [action.uri]},
      }));

    case REMOVE_FROM_DELETE_LIST:
      const newList = state.delete_list.filter((item) => {
        return item !== action.uri;
      });
      return (state = update(state, {
        delete_list: {$set: newList},
      }));

    case CLEAR_DELETE_LIST:
      return (state = update(state, {
        delete_list: {$set: []},
      }));

    case CHANGE_SELECTED_TO_DELETE_COUNT:
      if (action.bool) {
        state = update(state, {
          selected_to_delete_count: {$set: state.selected_to_delete_count + 1},
        });
      } else {
        state = update(state, {
          selected_to_delete_count: {$set: state.selected_to_delete_count - 1},
        });
      }
      return state;

    case CLEAR_SELECTED_TO_DELETE_COUNT:
      return (state = update(state, {
        selected_to_delete_count: {$set: 0},
      }));

    default:
      return state;
  }
};

export default reducer;
