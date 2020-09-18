const { Webhook } = require("discord-webhook-node");
const config = require("../config/config.json")

const hook = new Webhook(config.discord.url);

function alert(message) {
  hook.send(message + '\n' + config.discord.ping)
}

module.exports = {
  alert
}
