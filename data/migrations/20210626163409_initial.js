
exports.up = async function(knex) {
    await knex.schema.createTable("projects", (table) => {
        table.increments("id")
        table.text("project_name").notNull().unique()
        table.text("project_description")
        table.boolean("project_completed")
    })

    await knex.schema.createTable("resources", (table) => {
        table.increments("id")
        table.text("resource_name").unique()
        table.text("resource_description")
    })
    
    await knex.schema.createTable("tasks", (table) => {
        table.increments("id")
        table.text("task_description").notNull()
        table.text("task_notes")
        table.boolean("task_completed")
        table.integer("project_id")
            .references("id")
            .inTable("projects")
            .onDelete("SET NULL")
    })

    await knex.schema.createTable("projects_resources", (table) => {
        table.integer("proj_id")
            .notNull()
            .references("id")
            .inTable("projects")
            .onDelete("SET NULL")
            .onUpdate("SET NULL")
        table.integer("resource_id")
            .notNull()
            .references("id")
            .inTable("resources")
            .onDelete("SET NULL")
            .onUpdate("SET NULL")
        table.primary(["proj_id", "resource_id"])
    })
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("projects_resources")
    await knex.schema.dropTableIfExists("tasks")
    await knex.schema.dropTableIfExists("resources")
    await knex.schema.dropTableIfExists("projects")
}
