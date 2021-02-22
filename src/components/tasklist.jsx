import React from "react";
import { addTask, deleteTask } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskListInput = () => {
  const initialState = {
    title: "",
    content: "",
  };
  const taskList = useSelector((state) => state.task.taskList);
  const dispatch = useDispatch();
  const [inputData, setInput] = React.useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...inputData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(inputData));
    setInput(initialState);
  };
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  // const [state, setState] = React.useState(taskList);
  console.log(taskList);
  // console.log(state);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    if(result.destination.droppableId === result.source.droppableId && result.destination.index === result.source.index) return
   const items = reorder(
     taskList, result.source.index, result.destination.index
   )
    // Todo find: what i am doing wrong?
    // setState(items);

    // Setting new state to wrong item
    setInput(items);
  };
  

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              required
              value={inputData.title}
              className="title"
              placeholder="Enter task title"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              className="content"
              required
              name="content"
              value={inputData.content}
              placeholder="Enter task content"
              onChange={handleChange}
            />
          </div>
          <button>Add</button>
        </form>
        <h2>Tasks Available: {taskList.length}</h2>
        <Droppable droppableId="tasks" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {taskList.map((task, index) => {
                return (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                    // ref={provided.innerRef}
                  >
                    {(provided) => (
                      <div
                        className="note"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <input
                          type="checkbox"
                          onClick={() => handleDelete(task.id)}
                          value={task.checked}
                        />
                        <h2>{task.taskData.title}</h2>
                        <p>{task.taskData.content}</p>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskListInput;
