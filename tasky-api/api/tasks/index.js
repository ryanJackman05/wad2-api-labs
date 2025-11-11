import express from 'express';
import { tasksData } from './tasksData';

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

export default router;
