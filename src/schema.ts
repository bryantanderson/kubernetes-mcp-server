import { z } from "zod";

const ListNamespacesSchema = z.object({});

const ListConfigMapsSchema = z.object({
  namespace: z.string().optional(),
});

const CreateNamespaceSchema = z.object({
  namespace: z.string(),
});

export { ListNamespacesSchema, ListConfigMapsSchema, CreateNamespaceSchema };

