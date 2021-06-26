// build your `/api/resources` router here
const express = require("express")
const Resources = require("./model")

const router = express.Router()

router.get('/api/resources', async (req, res) => {
    try {
        const resources = await Resources.getResources()
        res.json(resources)
    } catch(err) {
        res.status(500).json(err.message)
    }
})

router.post('/api/resources/:id', async (req, res, next) => {
	try {
		const { resource_name, resource_description } = req.params.id
		if(!resource_name){return res.status(401).json({message: "Please input resource's name"})}
		if(!resource_description){return res.status(401).json({message: "Please input resource's description."})}
		const newResource = await Resources.add( req.params.id, req.body )
		return res.status(201).json(newResource)
	} catch(err) {
		next(err)
	}
});

module.exports = router