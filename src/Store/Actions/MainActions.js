import {
    FIRST_TIME_LOGIN,
    SET_LANGUAGE,
    GET_USER_AGENT,
    TRIGGER_SAVINGS_PAGE, GET_USER_AVATAR_SOURCE, GET_CAPTURED_IMAGE_URI
} from './ActionTypes';


export const first_time_login = (is_first) => {
    return {
        type: FIRST_TIME_LOGIN,
        is_first: is_first,
    };
};

export const set_language = (language) => {
    return {
        type: SET_LANGUAGE,
        language: language
    };
};

export const get_user_agent = (agent) => {
    return {
        type: GET_USER_AGENT,
        agent: agent
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
        base64_data: base64_data
    };
};

export const get_captured_image_uri = (image_uri) => {
    return {
        type: GET_CAPTURED_IMAGE_URI,
        image_uri: image_uri,
    };
};
