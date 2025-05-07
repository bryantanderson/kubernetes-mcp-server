import { z } from "zod";

const ListNamespacesSchema = z.object({});

const ListConfigMapsSchema = z.object({
	namespace: z.string().describe("The Kubernetes namespace").optional(),
});

const CreateNamespaceSchema = z.object({
	namespace: z.string().describe("The Kubernetes namespace"),
});

const ScaleDeploymentSchema = z.object({
	namespace: z.string().describe("The Kubernetes namespace"),
	deploymentName: z.string().describe("The name of the deployment"),
	desiredReplicas: z.number().describe("The desired number of replicas"),
});

const ExecuteCommandInPodSchema = z.object({
	namespace: z.string().describe("The Kubernetes namespace"),
	command: z.string().describe("The command to execute in the pod"),
	fieldSelector: z
		.string()
		.describe(
			"A selector to restrict the list of returned objects by their fields"
		)
		.optional(),
	labelSelector: z
		.string()
		.describe(
			"A selector to restrict the list of returned objects by their labels"
		)
		.optional(),
	containerName: z
		.string()
		.describe("The name of the container to execute the command in")
		.optional(),
});

export {
	CreateNamespaceSchema,
	ExecuteCommandInPodSchema,
	ListConfigMapsSchema,
	ListNamespacesSchema,
	ScaleDeploymentSchema,
};
