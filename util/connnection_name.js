const { connect } = require("mongoose")

var username = "marcokhodr116"
var password = "sableye12"
var connection_name = `mongodb+srv://${username}:${password}@cluster0.6s1n3.mongodb.net/?retryWrites=true&w=majority`
var session_name = `mongodb+srv://${username}:${password}@cluster0.6s1n3.mongodb.net/test?`



module.exports.connection_name = connection_name;
module.exports.session_name = session_name;
