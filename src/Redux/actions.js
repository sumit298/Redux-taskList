let nextTask = 0;
export const addTask = (taskData) => {
  return {
    type: "ADD_TASK",
    payload: {
      id: ++nextTask,
      taskData,
    },
  };
};

export const deleteTask = (id) => {
  return {
    type: "DELETE_TASK",
    payload: { id, checked: true },
  };
};
