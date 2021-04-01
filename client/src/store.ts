import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'


export type RootState = ReturnType<typeof store.getState>

const store = createStore(rootReducer, composeWithDevTools())

export default store;

