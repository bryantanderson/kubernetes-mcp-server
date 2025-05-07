## Kubernetes MCP server

MCP server for managing a Kubernetes cluster 

## Prerequisities

A running Kubernetes cluster set as the current context in `~/.kube/config`. The current context can be inspected using `kubectl config current-context`.

The quickest way to get a running cluster is to use `minikube`. Run `minikube start` once installed.

Without a running cluster set as the current context, the MCP server will not be functional. 

Note that while none of the tools contain destructive behavior, it's best to be cautious when exposing access to your cluster.

## Running the server

Locally: `npm run dev`

Using Claude Desktop: Add the following to the `mcpServers` key of your `claude_desktop_config.json` file:
```
"kubernetes": {
	"command": "node",
	"args": ["/Users/bry24/Documents/Projects/basic-mcp/dist/index.js"]
}
```

Note that the alias of the server can be anything. The following [guide](https://modelcontextprotocol.io/quickstart/user) is a useful example of how to configure MCP in the Claude Desktop App.

Once the MCP server is configured correctly, you should be able to use the tools to interact with your cluster. Example:

![Example Screenshot](./assets/Screenshot%202025-05-07%20at%2015.02.59.png)

## Debugging the server

Using MCP inspector: `npm run inspect`