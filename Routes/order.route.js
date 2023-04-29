const { OrderModel } = require("../Models/order.model")
const { RestaurentModel } = require("../Models/Restaurant ")
const { UserModel } = require("../Models/user.model")

const express = require("express");

const orderRoute = express.Router()


orderRoute.post("/food", async (req, res) => {
    const user = await UserModel.findOne()
    const rest = await RestaurentModel.findOne()
    const { items } = req.body
    let p = items[0].price * items[0].quantity

    const order = await OrderModel.insertMany({ items: items, totalPrice: p, deliveryAddress: user.address, status: "on the way" })
    console.log(order)

    res.send(order)


})


orderRoute.get("/get", async (req, res) => {
    const order = await OrderModel.find()
    res.send(order)
})


orderRoute.patch("/update/:Id", async (req, res) => {

    const {Id}=req.params
    const data=req.body

    const order = await OrderModel.findByIdAndUpdate({_id:Id},data)
    res.send(order)
})



module.exports = { orderRoute }