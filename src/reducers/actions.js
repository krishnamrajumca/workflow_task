
export const ADD_WORKFLOW = 'ADD_WORKFLOW'
export const EDIT_WORKFLOW = "EDIT_WORKFLOW"
export const DELETE_WORKFLOW = "DELETE_WORKFLOW"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export const NODE_STATUS = ["Pending", "In Progress", "Completed"];
export const WORKFLOW_STATUS = ["Pending", "Completed"];

export function addWorkflow(workflow) {
  return {
    type: ADD_WORKFLOW,
    workflow
  }
}
export function editWorkflow(workflow, index) {
  return {
    type: EDIT_WORKFLOW,
    workflow,
    index
  }
}
export function deleteWorkflow(index) {
  return {
    type: DELETE_WORKFLOW,
    index
  }
}
export function loginAction() {
  return {
    type:LOGIN
  }
}
export function logout() {
  return {
    type:LOGOUT
  }
}
