module.exports = function alert(message, providerName) {
  if(!providerName) {
    providerName = require('./config/config.json').default
  }
  const provider = require(`./providers/${providerName}.js`)
  provider.alert(message)
}
