// build your `Project` model here
const db = require("../../data/dbConfig")

function getProjects() {
    return db("projects").select("id", "project_name", "project_description", "project_completed")
}

async function add(project) {
    const [id] = await db("projects").insert(project)
    return getById(id)
}

function getById(id) {
    return db("projects")
        .select("id", "project_name", "project_description", "project_completed")
        .where({ id })
        .first()
    }


module.exports = {
    getProjects,
    add,
}