const { connect } = require("mongoose")

var username = "marcokhodr116"
var password = "sableye12"
var connection_name = `mongodb+srv://${username}:${password}@cluster0.6s1n3.mongodb.net/?retryWrites=true&w=majority`

module.exports = connection_name;