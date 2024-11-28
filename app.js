const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes')
const adminRoutes=require('./routes/adminRoutes')
require('dotenv').config();

app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use("/user", userRoutes)
app.use("/admin",adminRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})

const port = process.env.PORT||3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})