const { RestaurentModel } = require("../Models/Restaurant ")

const express = require("express");
const restaurentRoute = express.Router()




restaurentRoute.get("/get", async (req, res) => {
    const data = await RestaurentModel.find()
    res.send(data)
})



restaurentRoute.get("/get/:Id", async (req, res) => {
    const { Id } = req.params
    const data = await RestaurentModel.findById({ _id: Id })
    res.send(data)
})

restaurentRoute.get("/get/:Id/menu", async (req, res) => {
    const { Id } = req.params
    const { menu } = req.params
    const data = await RestaurentModel.find({ _id: Id })
    

    res.send(data[0].menu)
  
})


restaurentRoute.patch("/patch/:Id", async (req, res) => {
    const { Id } = req.params
    const bodydata = req.body
    const data = await RestaurentModel.findByIdAndUpdate({ _id: Id }, bodydata)
    res.send(data)
})


restaurentRoute.delete("/delete/:Id", async (req, res) => {
    const { Id } = req.params
    const bodydata = req.body
    const data = await RestaurentModel.findByIdAndDelete({ _id: Id })
    res.send(data)
})


restaurentRoute.post("/post", async (req, res) => {
    const { name } = req.body
    const prev = await RestaurentModel.findOne({ name })
    const data = req.body
    if (prev) {
        res.send("restaurent already present")
    } else {
        const user = await RestaurentModel.insertMany(data)
        res.send(user)
        console.log("restaurent posted successfully")
    }
})




module.exports = { restaurentRoute }