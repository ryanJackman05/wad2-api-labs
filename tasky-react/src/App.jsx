import './App.css';
import Task from './components/Task';
import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/Form';
import { v4 as uuidv4 } from 'uuid';
import {getTasks, addTask, deleteTask, updateTask} from "./api/tasky-api";


function App() {
  const [ taskState, setTaskState ] = useState({tasks: []});
  
  useEffect(() => {
    getTasks().then(tasks => {
      setTaskState({tasks: tasks});
    });
  }, []);

  const [ formState, setFormState ] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low"
  }); // default values for form


  const formChangeHandler = (event) => {
    let form = {...formState}; // spread operator makes a copy

    switch(event.target.name) { // change field depending on target component from event
      case "title":
          form.title = event.target.value;
          break;
      case "description":
          form.description = event.target.value;
          break;
      case "deadline":
          form.deadline = event.target.value;
          break;
      case "priority":
          form.priority = event.target.value;
          break;
      default:
          form = formState;
    }
    setFormState(form);
    console.log(formState);
  }
  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    updateTask(tasks[taskIndex]); // API - update task.
    setTaskState({tasks});
  }
  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks]; // spread operator reads taskState.tasks as a whole array
    const id=tasks[taskIndex]._id;
    tasks.splice(taskIndex, 1);
    deleteTask(id); // API - delete task
    setTaskState({tasks}); // assign new tasks object to taskState
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const tasks = taskState.tasks?[...taskState.tasks]:[]; // tasks may be empty
    const form = {...formState};
    
    const newTask = await addTask(form); // addtask from API. Waits until posted successfully
    // why is this the only one that waits?
    tasks.push(newTask); // update local task list
    setTaskState({tasks});
  }


  return (
    <div className="container">
      <h1>Tasky</h1>
      {taskState.tasks.map((task, index) => (              
        <Task 
        title={task.title}
        description={task.description}
        deadline={task.deadline}
        priority={task.priority}
        key={task._id}        
        done={task.done}
        markDone={() => doneHandler(index)} // pass in methods as parameters. It just works.
        deleteTask = {() => deleteHandler(index)}
        />
      ))}
      <AddTaskForm submit={formSubmitHandler} change={formChangeHandler} />/*pass the handler in*/

    </div>
  );
}

export default App;
