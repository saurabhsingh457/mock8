const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserModel } = require("../Models/user.model")

const userRouter = express.Router()




userRouter.post("/register", async (req, res) => {
    const { name, email, password, address } = req.body

    const old = await UserModel.findOne({ email })
    if (old) {
        res.send("user already registered")
    } else {
        try {

            bcrypt.hash(password, 4, async (err, newpass) => {
                if (err) {
                    res.send(err)
                } else {
                    const data = new UserModel({ name, email, password: newpass, address })
                    await data.save()
                    res.send("registered successfully")
                }
            })
        } catch (error) {
            res.send("error while registering")
            console.log(error)
        }
    }

})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    // console.log(user)

    if (user) {
        let secpass = user.password
        bcrypt.compare(password, secpass, (err, result) => {
            if (result) {
                var token = jwt.sign({ userId: user._id }, "key")
                res.send({ "msg": "login success", "token": token })
            } else {
                res.send({ "msg": "wrong credentials" })
            }
        })
    }
})


userRouter.patch("/update/:Id", async (req, res) => {
    const { Id } = req.params
    const { password } = req.body
    const data = await UserModel.findOne({ _id: Id })

    try {
        bcrypt.hash(password, 4, async (err, newpass) => {
            if (err) {
                res.send(err)
            } else {
                // const data=new UserModel({name,email,password:newpass,address})

                // await data.save()
                const user = await UserModel.findByIdAndUpdate({ _id: Id }, { password: newpass })
                res.send("password updated successfully")
            }
        })
    } catch (error) {
        res.send(error)
    }

    // const user=await UserModel.findByIdAndUpdate({_id:Id},datas)

})


module.exports = { userRouter }