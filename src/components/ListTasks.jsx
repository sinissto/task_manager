import "./listTasks.css";
import { useEffect, useState } from "react";
import UpdateTask from "./UpdateTask.jsx";

const ListTasks = () => {
  const [tasksList, setTasksList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  useEffect(() => {
    const existingTasks = localStorage.getItem("tasks");
    if (existingTasks) setTasksList(JSON.parse(existingTasks));
  }, []);

  const handleTaskStatusChange = (task, newStatus) => {
    const taskIndex = tasksList.findIndex((item) => item.id === task.id);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasksList];
      updatedTasks[taskIndex].taskStatus = newStatus;
      setTasksList(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowUpdatePopup(true);
  };

  const handleDeleteTask = (taskId) => {
    const taskToDeleteIndex = tasksList.findIndex((task) => task.id === taskId);
    if (taskToDeleteIndex !== -1) {
      const updatedTasks = [...tasksList];
      updatedTasks.splice(taskToDeleteIndex, 1);
      setTasksList(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const handleCloseUpdatePopup = () => {};

  return (
    <>
      {showUpdatePopup && selectedTask && (
        <div className={"updateTaskOverlay"}>
          <div className="updateTaskPopup">
            <UpdateTask task={selectedTask} onClose={handleCloseUpdatePopup} />
          </div>
        </div>
      )}

      <div className={"tasksContainer"}>
        {!tasksList || tasksList.length === 0 ? (
          <div className={"taskItemContainer"}>
            <p>There are no task</p>
          </div>
        ) : (
          tasksList.map((task, index) => {
            return (
              <div key={index} className={"taskItemContainer"}>
                <div className="infoColumn">
                  <div className="taskRow">
                    <h2 className={"taskTitle"}>{task.taskTitle}</h2>

                    <button
                      className="editBtn"
                      onClick={() => handleEditTask(task)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="row">
                    <p className={"taskRow"}>
                      <span style={{ fontWeight: "bold" }}>
                        Task Description:&nbsp;
                      </span>
                      <span>
                        {task.taskDescription.length > 30
                          ? task.taskDescription.substring(0, 30)
                          : task.taskDescription}
                      </span>
                    </p>
                  </div>

                  <div className="row">
                    <p className={"taskRow"}>
                      <span style={{ fontWeight: "bold" }}>
                        Task Status:&nbsp;
                      </span>
                      <select
                        value={task.taskStatus}
                        onChange={(e) =>
                          handleTaskStatusChange(task, e.target.value)
                        }
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </p>
                  </div>

                  <div className="row">
                    <p className={"taskRow"}>
                      <span style={{ fontWeight: "bold" }}>
                        Task Assignees:&nbsp;
                      </span>
                      {task.emailsList.map((email, index) => (
                        <span key={index} className={"assignerEmail"}>
                          {email.toUpperCase()}
                        </span>
                      ))}
                    </p>
                  </div>

                  <div className="row" style={{ marginTop: "20px" }}>
                    <button
                      type="submit"
                      className="deleteButton"
                      onClick={() => handleDeleteTask(task.id)}
                      data-testid={`deleteButton-${task.id}`}
                    >
                      Delete Task
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default ListTasks;
