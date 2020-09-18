const config = require("../config/config.json")
const r2 = require('r2')

function alert(message) {
  r2(`https://api.notifymyecho.com/v1/NotifyMe?notification=${encodeURI(message)}&accessCode=${config.echo.code}`)
}

module.exports = {
  alert
}
