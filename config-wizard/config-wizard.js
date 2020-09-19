const ask = require("readline-sync").question;
const properties = require("./properties.json")
const path = require("path");
const fs = require('fs');

module.exports = function() {
  let configPath = path.join(__dirname, "../config/config.json");
  if(!fs.existsSync(configPath)) {
    fs.copyFileSync(configPath + ".default", configPath);
  }
  let config = JSON.parse(fs.readFileSync(configPath));
  let providers = Object.keys(properties);

  let done = false;
  do {
    let choice = ask("Do what? (edit, remove, change-default, save) ");
    switch(choice) {
      case "change-default": {
        let provider = "";
        do {
          provider = ask(`What would you like your default provider to be? (${providers.join(", ")}) `);
        } while(!providers.includes(provider));
        config.default = provider;
        break;
      } case "edit": {
        let provider = "";
        do {
          provider = ask(`Which provider would you like to edit? (${providers.join(", ")}) `);
        } while(!providers.includes(provider));
        let result = {};
        for(let i in properties[provider]) {
          let current = properties[provider][i];
          result[current.property] = ask(current.message);
        }
        config[provider] = result;
        break;
      } case "remove": {
        let provider = "";
        do {
          provider = ask(`Which provider would you like to edit? (${providers.join(", ")}) `);
        } while(!providers.includes(provider));
        delete config[provider];
        break;
      } case "save": {
        fs.writeFileSync(configPath, JSON.stringify(config));
        console.log("config.json saved, quitting");
        done = true;
        break;
      } default:
        break;
    }
  } while(!done);

}
