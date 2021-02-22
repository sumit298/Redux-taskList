const initialState = {
  taskList: [],
};
export const TaskListReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case "ADD_TASK":
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };

    case "DELETE_TASK":
      return {
        ...state,
        taskList: state.taskList.filter(
          (task) => task.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default TaskListReducer;
