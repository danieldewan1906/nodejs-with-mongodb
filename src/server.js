const express = require("express")
const server = express()
const { Connect } = require("./config/mongoose")
const route = require("./api/route")
const { errorMiddleware } = require("./middleware/errorMiddleware")

const port = process.env.PORT || 3000

server.use(express.json())
server.use(route())
server.use(errorMiddleware)
server.listen(port, () => {
    Connect()
    console.log("Application listening on port " + port);
})
