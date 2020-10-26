import {
  FIRST_TIME_LOGIN,
  SET_LANGUAGE,
  GET_USER_AGENT,
  TRIGGER_SAVINGS_PAGE,
  GET_USER_AVATAR_SOURCE,
  GET_CAPTURED_IMAGE_URI,
  CLEAR_DELETE_LIST,
  ADD_TO_DELETE_LIST,
  REMOVE_FROM_DELETE_LIST,
  CHANGE_SELECTED_TO_DELETE_COUNT,
  CLEAR_SELECTED_TO_DELETE_COUNT,
  GET_DETECTED_FACE_COUNT,
  AUTHENTICATE_USER,
  UNAUTHENTICATE_USER,
  GET_USER_DATA,
  SET_AUTH_TOKEN,
  SET_FACE_SHARING_ACTIVE,
  SET_FACE_SHARING_INACTIVE,
  SET_IN_APP,
} from './ActionTypes';

export const get_detected_face_count = (count) => ({
  type: GET_DETECTED_FACE_COUNT,
  count,
});

export const clear_delete_list = () => ({
  type: CLEAR_DELETE_LIST,
});

export const add_to_delete_list = (uri) => ({
  type: ADD_TO_DELETE_LIST,
  uri,
});

export const remove_from_delete_list = (uri) => ({
  type: REMOVE_FROM_DELETE_LIST,
  uri,
});

export const change_selected_to_delete_count = (bool) => ({
  type: CHANGE_SELECTED_TO_DELETE_COUNT,
  bool,
});

export const clear_selected_to_delete_count = () => ({
  type: CLEAR_SELECTED_TO_DELETE_COUNT,
});

export const first_time_login = (is_first) => ({
  type: FIRST_TIME_LOGIN,
  is_first,
});

export const set_language = (language) => ({
  type: SET_LANGUAGE,
  language,
});

export const get_user_agent = (agent) => ({
  type: GET_USER_AGENT,
  agent,
});

export const trigger_savings_page = () => ({
  type: TRIGGER_SAVINGS_PAGE,
});

export const get_user_avatar_source = (source, base64_data) => ({
  type: GET_USER_AVATAR_SOURCE,
  source,
  base64_data,
});

export const get_captured_image_uri = (image_uri) => ({
  type: GET_CAPTURED_IMAGE_URI,
  image_uri,
});

export const authenticate_user = () => ({
  type: AUTHENTICATE_USER,
});

export const unauthenticate_user = () => ({
  type: UNAUTHENTICATE_USER,
});

export const get_user_data = (user_data) => ({
  type: GET_USER_DATA,
  user_data,
});
export const set_auth_token = (auth_token) => ({
  type: SET_AUTH_TOKEN,
  auth_token,
});
export const set_face_sharing_active = () => ({
  type: SET_FACE_SHARING_ACTIVE,
});
export const set_face_sharing_inactive = () => ({
  type: SET_FACE_SHARING_INACTIVE,
});
export const set_in_app = () => ({
  type: SET_IN_APP,
});
