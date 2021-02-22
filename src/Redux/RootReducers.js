import { combineReducers} from 'redux'
import TaskListReducer from './tasklistReducer';

const RootReducer =  combineReducers({
    task: TaskListReducer,
})

export default RootReducer;