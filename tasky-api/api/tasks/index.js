import express from 'express';
import { tasksData } from './tasksData'; // import the tasksData object from tasksData.js
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (req, res) => { // makes a http GET handler for the /api/tasks route. "/" simply means the end of the current route (i.e, the folder, /api/tasks)
    res.json(tasksData);
});
// Get task details, with id parameter added to the end of the api/tasks route
router.get('/:id', (req, res) => {
    const { id } = req.params
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) { // if no task is found with that id, return a 404 status code with a message
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});
//Add a task
router.post('/', (req, res) => { // http POST handler for adding a new task, and then returning it with a 201 status code
    const { title, description, deadline, priority, done } = req.body; // look for params in request body
    const newTask = { // receive object from request body,
        id: uuidv4(), // add unique id
        title,
        description,
        deadline,
        priority,
        done
    };
    tasksData.tasks.push(newTask); // NOT instance. the tasksData object was imported from tasksData.js, but now exists as a variable accessible here.
    res.status(201).json(newTask); // can these methods be swapped? YES
    tasksData.total_results++;
});
//Update an existing task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id); 
    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    const updatedTask = { ...tasksData.tasks[taskIndex], ...req.body, id:id }; // overwrites the task's body with request body. (if request has a field that task does, that field is the new value for task)
    tasksData.tasks[taskIndex] = updatedTask; // overwrite the task in tasksData with updatedTask
    res.json(updatedTask);
});
//Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params; // like update, looks specifically for id param
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return res.status(404).json({status:404,message:'Task not found'});
    
    tasksData.tasks.splice(taskIndex, 1);
    res.status(204).send(); // 204 - no content
    tasksData.total_results--;
});

export default router;
