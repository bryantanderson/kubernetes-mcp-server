import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
	createNamespace,
	listConfigMaps,
	listNamespaces,
	scaleDeployment,
  executeCommandInPod,
} from "./kubernetesFunctions.js";
import {
  ExecuteCommandInPodSchema,
	CreateNamespaceSchema,
	ListConfigMapsSchema,
	ListNamespacesSchema,
	ScaleDeploymentSchema,
} from "./schema.js";

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
					content: [
						{
							type: "text",
							text: "Failed to list namespaces",
						},
					],
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
					content: [
						{
							type: "text",
							text: `Failed to create namespace ${args.namespace}`,
						},
					],
				};
			}

			return {
				content: [
					{
						type: "text",
						text: `Namespace ${namespace?.metadata?.name} created successfully`,
					},
				],
			};
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
					content: [
						{
							type: "text",
							text: `Failed to list configmaps for namespace ${args.namespace}`,
						},
					],
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

	server.tool(
		"scale_deployment",
		"Scales the replica count of a deployment in a Kubernetes namespace",
		ScaleDeploymentSchema.shape,
		async (args) => {
			const deployment = await scaleDeployment(args);

			if (!deployment) {
				return {
					content: [
            {
              type: "text",
              text: `Failed to scale deployment ${args.deploymentName} in namespace ${args.namespace} to ${args.desiredReplicas} replicas`,
            }
          ],
				};
			}

			return {
				content: [
					{
						type: "text",
						text: `Successfully scaled deployment ${args.deploymentName} in namespace ${args.namespace} to ${args.desiredReplicas} replicas`,
					},
				],
			};
		}
	);

  server.tool(
    'execute_command_in_pod',
    'Executes a command in a pod in a Kubernetes namespace',
    ExecuteCommandInPodSchema.shape,
    async (args) => {
      const result = await executeCommandInPod(args);

      if (!result) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to execute command in pod in namespace ${args.namespace}`,
            }
          ]
        }
      }
      
      return {
        content: [
          {
            type: "text",
            text: `Successfully executed command in pod in namespace ${args.namespace}`,
          }
        ]
      }
    }
  )
}

function registerTools(server: McpServer) {
	registerKubernetesTools(server);
	// TODO: Future tools
}

export { registerTools };
