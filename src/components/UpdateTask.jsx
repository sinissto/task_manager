import { useEffect, useState } from "react";
import "./updateTask.css";

const UpdateTask = ({ task, onClose }) => {
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [email, setEmail] = useState("");
  const [emailsList, setEmailsList] = useState([""]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTaskTitle(task.taskTitle);
    setTaskDescription(task.taskDescription);
    setTaskStatus(task.taskStatus);
    setEmailsList([...task.emailsList]);
    setTaskCompleted(task.taskCompleted);
    setTaskId(task.id);
  }, [task]);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleAddEmail = () => {
    if (email.trim() !== "") {
      const newEmails = email
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e !== "");

      for (const newEmail of newEmails) {
        if (!validateEmail(newEmail)) {
          setErrorMessage(`Invalid email format: ${newEmail}`);
          return;
        }
      }

      // Update the list of emails
      setEmailsList([...emailsList, ...newEmails]);
      setEmail("");
      setErrorMessage("");
    }
  };

  const handleRemoveEmail = (index) => {
    console.log(index);
    const updatedEmailsList = [...emailsList];
    updatedEmailsList.splice(index, 1);
    setEmailsList(updatedEmailsList);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleEmailKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmails = email
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e);
    const invalidEmails = newEmails.filter((e) => !validateEmail(e));

    if (invalidEmails.length > 0) {
      setErrorMessage(`Invalid email format: ${invalidEmails.join(", ")}`);
      return;
    }

    const updatedEmailsList = [...emailsList, ...newEmails];
    setEmailsList(updatedEmailsList);
    setEmail("");
    setErrorMessage("");

    if (taskTitle.trim() === "") {
      setErrorMessage("Task title is required!");
      return;
    }

    const existingTasks = localStorage.getItem("tasks");
    const tasks = existingTasks ? JSON.parse(existingTasks) : [];

    const taskIndexToUpdate = tasks.findIndex((task) => task.id === taskId);

    if (taskIndexToUpdate !== -1) {
      const updatedTask = {
        ...tasks[taskIndexToUpdate],
        taskTitle,
        taskDescription,
        taskStatus,
        emailsList: updatedEmailsList,
        taskCompleted,
      };

      const updatedTasks = [...tasks];
      updatedTasks[taskIndexToUpdate] = updatedTask;

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    onClose();
  };

  return (
    <div className={"formContainer"}>
      <div className={"mainForm"}>
        <form onSubmit={handleSubmit}>
          <h1 className="addNewTaskHeading">Update task</h1>
          <div className="taskForm">
            <div className={"leftColumn"}>
              <div className={"alignSameLine"}>
                <label htmlFor="taskTitle">Task Title:</label>
                <input
                  type="text"
                  id={"taskTitle"}
                  className={"titleInputField"}
                  value={taskTitle}
                  onChange={(e) => {
                    setTaskTitle(e.target.value);
                  }}
                  required={true}
                />
              </div>

              <div className="alignSameLine">
                <label htmlFor="taskDescription">Task Description:</label>
                <input
                  type="text"
                  id={"taskDescription"}
                  value={taskDescription}
                  onChange={(e) => {
                    setTaskDescription(e.target.value);
                  }}
                  className={"descriptionTextArea"}
                />
              </div>
            </div>

            <div className="rightColumn">
              <div className="alignSameLine">
                <label htmlFor="taskCompleted">Completed:</label>
                <input
                  id={"taskCompleted"}
                  type="checkbox"
                  checked={taskCompleted}
                  onChange={(e) => {
                    setTaskCompleted(e.target.checked);
                  }}
                  className={"completedCheckBox"}
                />
              </div>

              <div className="alignSameLine">
                <label htmlFor="taskStatus">Task Status:</label>
                <select
                  name=""
                  id=""
                  value={taskStatus}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setTaskStatus(e.target.value);
                  }}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div className="alignEmailItems">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id={"email"}
                  className={"emailInput"}
                  value={email}
                  onChange={handleEmailChange}
                  onKeyDown={handleEmailKeyPress}
                />
              </div>

              {errorMessage && <p className={"errorMessage"}>{errorMessage}</p>}

              <div>
                <ul className="emailList">
                  {emailsList.map((email, index) => (
                    <li
                      key={index}
                      data-testid={`email-${index}`}
                      className={"eachEmail"}
                    >
                      {email && (
                        <div>
                          <p>{email.toUpperCase()}</p>
                          <button
                            className={"removeEmailBtn"}
                            type={"button"}
                            onClick={() => handleRemoveEmail(index)}
                            data-testid={`removeEmailBtn-${index}`}
                          >
                            &times;
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="submitButtonRow">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose} data-testid="cancelButton">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
