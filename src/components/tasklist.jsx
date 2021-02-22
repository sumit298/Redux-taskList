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

  const handleDragEnd = (result)=>{
    if(!result.destination) return;
    console.log(result);
    const items = Array.from(inputData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setInput(items)
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
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
