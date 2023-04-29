const express = require('express')
const app = express()
const { connection } = require("./database/db")

app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome to food delivery app")
})


const { userRouter } = require("./Routes/user.route")
app.use("/user", userRouter)

const { restaurentRoute } = require("./Routes/resturent.route")
app.use("/restaurants", restaurentRoute)

const {orderRoute}=require("./Routes/order.route")
app.use("/order",orderRoute)




app.listen(3500, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("server running on port 3500")
})