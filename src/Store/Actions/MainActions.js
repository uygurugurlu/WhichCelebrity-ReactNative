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
} from './ActionTypes';

export const get_detected_face_count = (count) => {
  return {
    type: GET_DETECTED_FACE_COUNT,
    count: count,
  };
};

export const clear_delete_list = () => {
  return {
    type: CLEAR_DELETE_LIST,
  };
};

export const add_to_delete_list = (uri) => {
  return {
    type: ADD_TO_DELETE_LIST,
    uri: uri,
  };
};

export const remove_from_delete_list = (uri) => {
  return {
    type: REMOVE_FROM_DELETE_LIST,
    uri: uri,
  };
};

export const change_selected_to_delete_count = (bool) => {
  return {
    type: CHANGE_SELECTED_TO_DELETE_COUNT,
    bool: bool,
  };
};

export const clear_selected_to_delete_count = () => {
  return {
    type: CLEAR_SELECTED_TO_DELETE_COUNT,
  };
};

export const first_time_login = (is_first) => {
  return {
    type: FIRST_TIME_LOGIN,
    is_first: is_first,
  };
};

export const set_language = (language) => {
  return {
    type: SET_LANGUAGE,
    language: language,
  };
};

export const get_user_agent = (agent) => {
  return {
    type: GET_USER_AGENT,
    agent: agent,
  };
};

export const trigger_savings_page = () => {
  return {
    type: TRIGGER_SAVINGS_PAGE,
  };
};

export const get_user_avatar_source = (source, base64_data) => {
  return {
    type: GET_USER_AVATAR_SOURCE,
    source: source,
    base64_data: base64_data,
  };
};

export const get_captured_image_uri = (image_uri) => {
  return {
    type: GET_CAPTURED_IMAGE_URI,
    image_uri: image_uri,
  };
};
