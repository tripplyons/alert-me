const { Webhook } = require("discord-webhook-node");
const config = require("../config/config.json")

const hook = new Webhook(config.url);

function alert(message) {
  hook.send(message)
}

module.exports = {
  alert
}
