const express = require("express")
const server = express()
const { Connect } = require("./config/mongoose")
const route = require("./api/route")
const { errorMiddleware } = require("./middleware/errorMiddleware")
const bodyParser = require("body-parser")

const port = process.env.PORT || 3000

server.use(bodyParser.urlencoded({
    extended: true
}))
server.use(bodyParser.json())
server.use("/api", route())
server.use(errorMiddleware)
server.listen(port, () => {
    Connect()
    console.log("Application listening on port " + port);
})
