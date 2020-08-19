import axios from "axios";
import {ResponseHandler} from "../CommunlyUsedFunctions";

export const GetResult = async (userAvatarB64) => {
    try {
        const {data} = await axios({
            method: 'post',
            url: `https://myface.io/compare`,
            data: {
                "query": userAvatarB64,
                "source": [userAvatarB64, userAvatarB64]
            },
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
            },
        })
        return data;
    } catch (error) {
        ResponseHandler("Response: ", error.response);
        console.group('GetResult Error ...');
        console.table({...error.response.data});
        console.groupEnd();
    }

    return {};
};
