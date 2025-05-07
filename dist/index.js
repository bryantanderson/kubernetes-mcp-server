"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const tools_1 = require("./tools");
const server = new mcp_js_1.McpServer({
    name: "kubernetes-mcp-server",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    // Register resources, tools, and prompts
    (0, tools_1.registerTools)(server);
    await server.connect(transport);
    console.error("MCP Server running on stdio");
}
main()
    .catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
})
    .finally(() => {
    server.close();
});
