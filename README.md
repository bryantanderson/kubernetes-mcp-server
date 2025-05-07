## Kubernetes MCP server

MCP server for managing a Kubernetes cluster 

## Prerequisities

An active Kubernetes cluster, set as the current context in `~/.kube/config`. The current context can be inspected using `kubectl config current-context`.

The quickest way to get an active cluster running is to use `minikube`. Run `minikube start` once installed.

Without an active cluster set as the current context, the MCP server will not be functional. 

## Running the server

Locally: `npm run build && node ./dist/index.js`

Using Claude Desktop: Add the following to the `mcpServers` key of your `claude_desktop_config.json` file:
```
"kubernetes": {
	"command": "node",
	"args": ["/Users/bry24/Documents/Projects/basic-mcp/dist/index.js"]
}
```

Note that the alias of the server can be anything. The following [guide](https://modelcontextprotocol.io/quickstart/user) is a useful example of how to configure MCP in the Claude Desktop App.

## Debugging the server

Using MCP inspector: `npx @modelcontextprotocol/inspector node ./dist/index.js`