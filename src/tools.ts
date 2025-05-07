import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { createNamespace, listConfigMaps, listNamespaces } from "./kubernetesFunctions";
import {
	CreateNamespaceSchema,
	ListConfigMapsSchema,
	ListNamespacesSchema,
} from "./schema";

// TODO: Expose more fields than just the names
function registerKubernetesTools(server: McpServer) {
	server.tool(
		"list_namespaces",
		"Lists all namespaces in the Kubernetes cluster",
		ListNamespacesSchema.shape,
		async () => {
			const namespaces = await listNamespaces();

			if (!namespaces) {
				return {
					content: [],
				};
			}

			return {
				content: [
					{
						type: "text",
						text: namespaces.items
							.map((namespace) => namespace.metadata?.name)
							.join("\n"),
					},
				],
			};
		}
	);

	server.tool(
		"create_namespace",
		"Creates a new namespace in the Kubernetes cluster",
		CreateNamespaceSchema.shape,
		async (args) => {
			const namespace = await createNamespace(args.namespace);

			if (!namespace) {
				return {
					content: [],
				};
			}

			return { 
        content: [
          {
            type: 'text',
            text: `Namespace ${namespace?.metadata?.name} created successfully`,
          }
        ]
      }
		}
	);

	server.tool(
		"list_config_maps",
		"Lists all ConfigMaps in the Kubernetes cluster OR namespace (if specified)",
		ListConfigMapsSchema.shape,
		async (args) => {
			const configMaps = await listConfigMaps(args.namespace);

			if (!configMaps) {
				return {
					content: [],
				};
			}

			return {
				content: [
					{
						type: "text",
						text: configMaps.items
							.map((configMap) => configMap.metadata?.name)
							.join("\n"),
					},
				],
			};
		}
	);
}

function registerTools(server: McpServer) {
	registerKubernetesTools(server);
	// TODO: Future tools
}

export { registerTools };
