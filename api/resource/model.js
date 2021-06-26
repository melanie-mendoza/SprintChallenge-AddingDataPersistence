// build your `Resource` model here
const db = require("../../data/dbConfig")

function getResources() {
    return db("resources").select("id", "resource_name", "resource_description")
}

async function add(project) {
    const [id] = await db("resources").insert(resource)
    return getById(id)
}

function getById(id) {
    return db("resources")
        .select("id", "resource_name", "resource_description")
        .where({ id })
        .first()
    }


module.exports = {
    getResources,
    add,
}