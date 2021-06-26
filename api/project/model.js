// build your `Project` model here
const environment = require("../../data/dbConfig")

function getProjects() {
    return environment("projects").select("id", "project_name", "project_description", "project_completed")
}

async function add(project) {
    const [id] = await environment("projects").insert(project)
    return getById(id)
}

function getById(id) {
    return environment("projects")
        .select("id", "project_name", "project_description", "project_completed")
        .where({ id })
        .first()
    }


module.exports = {
    getProjects,
    add,
}