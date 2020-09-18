#!/usr/bin/env node
const {program} = require("commander");
program.version("2.0.0", "-v", "output the current version");
const getStdin = require("get-stdin");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

program.option("--config", "find the config file")

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
  console.log(path.join(__dirname, "../config/config.json"))
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
