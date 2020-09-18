# alert-me
A shell utility that sends you a message by different means (Discord, [Amazon Echo](https://www.thomptronics.com/about/notify-me))

`echo "message" | alert-me`

## Usage

### Installation:
```
npm i -g alert-me
```

### Configuration:

To find where to place `config.json`.
```
alert-me --config
```

Example JSON can be found in [config/config.json.example](config/config.json.example)

### Sending messages (to stdout and the default app):
```
echo "message" | alert-me
```

### Node API:
```
const alertMe = require("alert-me")
alertMe("message")
alertMe("message", "discord")
alertMe("message", "echo")
```
