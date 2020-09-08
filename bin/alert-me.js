#!/usr/bin/env node
const {program} = require("commander");
program.version("1.0.0", "-v", "output the current version");
const getStdin = require("get-stdin");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

program.option("--config", "configure program")

program.on("--help", () => {
  console.log("");
  console.log("Default:");
  console.log("  $ echo \"message here\" | alert-me");
});

program.parse(process.argv);

function writeConfig(settings) {
  fs.writeFile(path.join(__dirname, "../config/config.json"), JSON.stringify(settings), (err) => err && console.error(err))
}

if(program.config) {
  // Change/create the config/config.json file
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Provider? (discord) ", (provider) => {
    switch (provider) {
      case "discord":
      case "":
        rl.question("Webhook URL? ", (url) => {
          writeConfig({provider: "discord", url})
          rl.close()
        })
        break;
      default:
        rl.close()
        console.log("")
        break;
    }
  });
} else if(process.argv.length === 2) {
  // Default case: send an alert
  const alertMe = require("..");
  (async () => {
    alertMe(await getStdin());
  })();
}
