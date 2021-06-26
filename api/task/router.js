// build your `/api/tasks` router here
const express = require("express")
const Tasks = require("./model")

const router = express.Router()

router.get('/api/:id/projects', async (req, res) => {
    try {
        const tasks = await Tasks.getProjectTasks(req.params.id)
        res.json(tasks)
    } catch(err) {
        res.status(500).json(err.message)
    }
})

router.post('/api/projects/:id', async (req, res, next) => {
	try {
		const { {task_id, task_description, task_notes, task_completed, project_name, project_description } = req.params.id
		if(!task_description){return res.status(401).json({message: "Please input a task description."})}
		if(!task_notes){return res.status(401).json({message: "Please input tasks' notes."})}
		if(!project_name){return res.status(401).json({message: "Please input project's name"})}
		if(!project_description){return res.status(401).json({message: "Please input project's description."})}
		const newTask = await Tasks.addTasksForProject( req.params.id, req.body )
		return res.status(201).json(newTask)
	} catch(err) {
		next(err)
	}
});

module.exports = router