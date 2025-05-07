"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleDeploymentSchema = exports.CreateNamespaceSchema = exports.ListConfigMapsSchema = exports.ListNamespacesSchema = void 0;
const zod_1 = require("zod");
const ListNamespacesSchema = zod_1.z.object({});
exports.ListNamespacesSchema = ListNamespacesSchema;
const ListConfigMapsSchema = zod_1.z.object({
    namespace: zod_1.z.string().optional(),
});
exports.ListConfigMapsSchema = ListConfigMapsSchema;
const CreateNamespaceSchema = zod_1.z.object({
    namespace: zod_1.z.string(),
});
exports.CreateNamespaceSchema = CreateNamespaceSchema;
const ScaleDeploymentSchema = zod_1.z.object({
    namespace: zod_1.z.string(),
    deploymentName: zod_1.z.string(),
    desiredReplicas: zod_1.z.number(),
});
exports.ScaleDeploymentSchema = ScaleDeploymentSchema;
