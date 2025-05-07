## Kubernetes MCP server

MCP server for managing a Kubernetes cluster 

## Prerequisities

An active Kubernetes cluster, set as the current context in `~/.kube/config`. The current context can be inspected using `kubectl config current-context`.

The quickest way to get an active cluster running is to use `minikube`. Run `minikube start` once installed.

Without an active cluster set as the current context, the MCP server will not be functional. 

## Running the server

`npm run build && node ./dist/index.js`

## Debugging the server

Using MCP inspector: `npx @modelcontextprotocol/inspector node ./dist/index.js`