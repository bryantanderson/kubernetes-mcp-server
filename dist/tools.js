"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTools = registerTools;
const kubernetesFunctions_1 = require("./kubernetesFunctions");
const schema_1 = require("./schema");
// TODO: Expose more fields than just the names
function registerKubernetesTools(server) {
    server.tool("list_namespaces", "Lists all namespaces in the Kubernetes cluster", schema_1.ListNamespacesSchema.shape, async () => {
        const namespaces = await (0, kubernetesFunctions_1.listNamespaces)();
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
    });
    server.tool("create_namespace", "Creates a new namespace in the Kubernetes cluster", schema_1.CreateNamespaceSchema.shape, async (args) => {
        const namespace = await (0, kubernetesFunctions_1.createNamespace)(args.namespace);
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
    });
    server.tool("list_config_maps", "Lists all ConfigMaps in the Kubernetes cluster OR namespace (if specified)", schema_1.ListConfigMapsSchema.shape, async (args) => {
        const configMaps = await (0, kubernetesFunctions_1.listConfigMaps)(args.namespace);
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
    });
    server.tool("scale_deployment", "Scales the replica count of a deployment in a Kubernetes namespace", schema_1.ScaleDeploymentSchema.shape, async (args) => {
        const deployment = await (0, kubernetesFunctions_1.scaleDeployment)(args);
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
    });
}
function registerTools(server) {
    registerKubernetesTools(server);
    // TODO: Future tools
}
