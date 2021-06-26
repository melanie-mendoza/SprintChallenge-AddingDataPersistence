// build your `Task` model here
const db = require("../../data/dbConfig")

function getProjectTasks(id) {
    return db("projects as p")
        .join("tasks as t", "t.project_id", "p.id")
        .where("p.id", id)
}

async function addTasksForProject(tasks) {
    const [id] = await db("tasks").insert(tasks)
    return getProjectTasks(id)
}

module.exports = {
    getProjectTasks,
    addTasksForProject,
}