// build your `/api/projects` router here
const express = require("express")
const Projects = require("./model")
const environment = require("../../data/dbConfig")

const router = express.Router()

router.get('/api/projects', async (req, res) => {
    try {
        const projects = await Projects.getProjects()
        res.json(projects)
    } catch(err) {
        res.status(500).json(err.message)
    }
})

router.post('/api/projects/:id', async (req, res, next) => {
	try {
		const { project_name, project_description, project_completed } = req.params.id
		if(!project_name){return res.status(401).json({message: "Please input project's name"})}
		if(!project_description){return res.status(401).json({message: "Please input project's description."})}
		const newProject = await Projects.add( req.params.id, req.body )
		return res.status(201).json(newProject)
	} catch(err) {
		next(err)
	}
});

module.exports = router