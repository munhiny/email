

const intitalState = {
    contacts: {
        isLoading: null,
        error: null,
        data: null
    }

}

type Action = {
    type: string,
    payload: string[]
}


const contactsReducer = (state = intitalState, action: Action) => {
    const { type, payload } = action
    switch(type) {
        case "GET ALL CONTACTS REQUEST":
            return {...state, contacts: {
                isloading: true,
                error:null,
                data:null
            }
        }
        case "GET ALL CONTACTS SUCCESS":
            return {...state, contacts: {
                isloading:false,
                error: false,
                data: payload
            }
        }
        case "GET ALL CONTACTS FAIL":
            return {...state, contacts: {
                isLoading: false,
                error: payload,
                data: false
            }}   
        default: 
            return state
        }
    

    
}

export default contactsReducer