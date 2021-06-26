const express = require("express")
const cors = require("cors")
const projectsRouter = require("./api/project/router")
const resourcesRouter = require("./api/resource/router")
const tasksRouter = require("./api/task/router")
const environment = require("./data/dbConfig")

const server = express()

server.use(cors())
server.use(express.json())

server.use(projectsRouter)
server.use(resourcesRouter)
server.use(tasksRouter)

server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server