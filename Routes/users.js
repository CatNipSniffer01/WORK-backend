const express = require("express")
const router = express.Router()
const users = require("../Services/backend")

router.get("/",
    async function(req, res, next){
        try{ res.json(await users.getUsers()) }
        catch(err){ next(err)}
})
router.post("/",
    async function(req, res, next){
        console.log("Post Body", req.body)
        try{ res.json(await users.create(req.body))}
        catch(err){ next(err)}
})
router.put("/:id",
    async function(req, res, next){
        console.log("Post Body", req.body)
        try{ res.json(await users.update(req.params.id, req.body))}
        catch(err){ next(err)}
})
router.patch("/:id",
    async function(req, res, next){
        console.log("Patch Body", req.body)
        try{ res.json(await users.patch(req.params.id, req.body))}
        catch(err){ next(err)}
})
router.delete("/:id",
    async function(req, res, next){
        console.log("Delete Body", req.body)
        try{ res.json(await users.removve(req.params.id))}
        catch(err){ next(err)}
})