import axios from 'axios';
import { useDispatch } from 'react-redux';
import {useEffect} from 'react'


import { getAllContactsRequest, getAllContactsSuccess, getAllContactsFail } from '../reducers/actions';


export const useGetContacts = () => {
    const dispatch  = useDispatch()

    const getContacts = async (dispatch: Function) => {
        dispatch(getAllContactsRequest())
        try {
    
            const loadingResponse = await axios.get("http://localhost/contacts")
            if(loadingResponse.status === 200) {
                dispatch(getAllContactsSuccess(loadingResponse))
                
            } else {
                dispatch(getAllContactsFail(loadingResponse))
            }
            
        } catch(e) {
            dispatch(getAllContactsFail(e))
        }
    }

    const fetchContacts = (dispatch: Function) => {
        return getContacts(dispatch)
    }
    useEffect(() => {
        fetchContacts(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

}
