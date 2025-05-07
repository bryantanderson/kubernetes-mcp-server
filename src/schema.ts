import { z } from "zod";

const ListNamespacesSchema = z.object({});

const ListConfigMapsSchema = z.object({
  namespace: z.string().optional(),
});

const CreateNamespaceSchema = z.object({
  namespace: z.string(),
});

const ScaleDeploymentSchema = z.object({
  namespace: z.string(),
  deploymentName: z.string(),
  desiredReplicas: z.number(),
});

export {
	ListNamespacesSchema,
	ListConfigMapsSchema,
	CreateNamespaceSchema,
	ScaleDeploymentSchema,
};
