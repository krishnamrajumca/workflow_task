import { combineReducers } from 'redux'
import { ADD_WORKFLOW, LOGIN, LOGOUT, EDIT_WORKFLOW,DELETE_WORKFLOW} from './actions'
const initialState = {
    workflows: [],
    loggedIn:false
}
function workflowReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_WORKFLOW:
            return { ...state, workflows: [...state.workflows, action.workflow] }
        case EDIT_WORKFLOW:
            return {
                ...state,
                workflows: [
                    ...state.workflows.slice(0, action.index),
                    action.workflow,
                    ...state.workflows.slice(action.index + 1)
                ]
            }
        case DELETE_WORKFLOW:
            return {
                ...state,
                workflows: [
                    ...state.workflows.slice(0, action.index),
                    ...state.workflows.slice(action.index + 1)
                ]
            }
        case LOGIN:
            return { ...state, loggedIn: true }
        case LOGOUT:
            return {...state,loggedIn:false}
        default:
            return state
    }
  }
const rootReducer = combineReducers({
    workflowReducer
  })
  export default rootReducer