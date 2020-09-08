# alert-me
A shell utility that sends you a message through instant messaging apps (Discord)

`echo "message" | alert-me`

## Usage

Installation:
```
npm i -g alert-me
```

Configuration:
```
alert-me --config
```

Sending messages (to stdout and the chosen app):
```
echo "message" | alert-me
```

Node API:
```
const alertMe = require("alert-me")
alertMe("message")
```
