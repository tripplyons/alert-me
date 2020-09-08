const config = require("./config/config.json")

module.exports = function alert(message) {
  const provider = require(`./providers/${config.provider}.js`)
  provider.alert(message)
}
