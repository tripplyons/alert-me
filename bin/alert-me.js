#!/usr/bin/env node
const {program} = require("commander");
program.version(require("../package.json").version, "-v", "output the current version");
const getStdin = require("get-stdin");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const configWizard = require("../config-wizard/config-wizard.js")

program.option("--config", "open the configuration wizard")

program.on("--help", () => {
  console.log("");
  console.log("Default:");
  console.log("  $ echo \"message here\" | alert-me");
  console.log("Choose a provider:");
  console.log("  $ echo \"message here\" | alert-me provider");
  console.log("Use all provideres:");
  console.log("  $ echo \"message here\" | alert-me all");
});

program.parse(process.argv);

if(program.config) {
  configWizard()
} else {
  // Default case: send an alert
  const alertMe = require("..");
  const config = require("../config/config.json");
  (async () => {
    let message = await getStdin();
    // if none provided by shell argument, use the default
    let provider = process.argv[2] || config.default;
    if(provider == "all") {
      let providers = Object.keys(config).filter(key => key != "default");
      providers.map(i => alertMe(message, i))
    } else {
      alertMe(message, provider);
    }
  })();
}
