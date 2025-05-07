"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNamespace = createNamespace;
exports.listConfigMaps = listConfigMaps;
exports.listNamespaces = listNamespaces;
exports.scaleDeployment = scaleDeployment;
const constants_1 = require("./constants");
const kubernetesClient_1 = require("./kubernetesClient");
async function listNamespaces() {
    try {
        const apiClient = (0, kubernetesClient_1.getKubernetesCoreApiClient)();
        return await apiClient.listNamespace({
            timeoutSeconds: constants_1.KUBERNETES_API_REQUEST_TIMEOUT_SECONDS,
        });
    }
    catch (error) {
        console.log(`Couldn't list namespaces. Error: ${JSON.stringify(error)}`);
    }
}
async function createNamespace(namespaceName) {
    try {
        const apiClient = (0, kubernetesClient_1.getKubernetesCoreApiClient)();
        const namespace = await apiClient.createNamespace({
            body: {
                metadata: {
                    name: namespaceName,
                },
            },
        });
        return namespace;
    }
    catch (error) {
        console.log(`Couldn't create namespace ${namespaceName}. Error: ${JSON.stringify(error)}`);
    }
}
async function listConfigMaps(namespaceName) {
    try {
        const apiClient = (0, kubernetesClient_1.getKubernetesCoreApiClient)();
        if (namespaceName) {
            return await apiClient.listNamespacedConfigMap({
                namespace: namespaceName,
                timeoutSeconds: constants_1.KUBERNETES_API_REQUEST_TIMEOUT_SECONDS,
            });
        }
        return await apiClient.listConfigMapForAllNamespaces({
            timeoutSeconds: constants_1.KUBERNETES_API_REQUEST_TIMEOUT_SECONDS,
        });
    }
    catch (error) {
        console.log(`Couldn't list configmaps for namespace ${namespaceName}. Error: ${JSON.stringify(error)}`);
    }
}
async function scaleDeployment(params) {
    try {
        const apiClient = (0, kubernetesClient_1.getKubernetesAppsApiClient)();
        const deployment = await apiClient.readNamespacedDeployment({
            name: params.deploymentName,
            namespace: params.namespace,
        });
        if (!deployment) {
            return;
        }
        return await apiClient.patchNamespacedDeployment({
            name: params.deploymentName,
            namespace: params.namespace,
            body: {
                spec: {
                    replicas: params.desiredReplicas,
                },
            },
        });
    }
    catch (error) {
        console.log(`Couldn't scale up deployment ${params.deploymentName} in namespace ${params.namespace}. Error: ${JSON.stringify(error)}`);
    }
}
