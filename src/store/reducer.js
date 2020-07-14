import {combineReducers} from 'redux-immutable'
//全局reducer
import indexReducer from './indexReducer'

const reducer = combineReducers({
    index:indexReducer
});
export default reducer;