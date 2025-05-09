import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools.js";

const server = new McpServer({
	name: "kubernetes-mcp-server",
	version: "1.0.0",
	capabilities: {
		resources: {},
		tools: {},
	},
});

async function main() {
	const transport = new StdioServerTransport();

	// Register resources, tools, and prompts
	registerTools(server);

	await server.connect(transport);

  process.on('SIGINT', () => {
    try {
      transport.close();
      server.close();
      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  })

  // NOTE: We cannot log to stdout while using StdioServerTransport
  // The MCP Client will attempt to parse the log as JSON, fail, and throw an error
	console.error("MCP Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
