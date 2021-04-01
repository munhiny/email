import { AxiosResponse } from "axios"
import { GET_ALL_CONTACTS_REQUEST, GET_ALL_CONTACTS_SUCCUESS, GET_ALL_CONTACTS_FAIL} from "./constants"



export const getAllContactsRequest = () => {
    return {
        type: GET_ALL_CONTACTS_REQUEST
    }
}

export const getAllContactsSuccess = (response: AxiosResponse) => {
    return {

        type: GET_ALL_CONTACTS_SUCCUESS,
        payload: response.data
    }
}

export const getAllContactsFail = (response: AxiosResponse) => ({
    type: GET_ALL_CONTACTS_FAIL,
    payload: response
})

