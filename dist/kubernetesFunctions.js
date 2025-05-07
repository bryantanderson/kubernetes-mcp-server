import { KUBERNETES_API_REQUEST_TIMEOUT_SECONDS } from "./constants.js";
import { getKubernetesAppsApiClient, getKubernetesCoreApiClient, } from "./kubernetesClient.js";
async function listNamespaces() {
    try {
        const apiClient = getKubernetesCoreApiClient();
        if (!apiClient) {
            return;
        }
        return await apiClient.listNamespace({
            timeoutSeconds: KUBERNETES_API_REQUEST_TIMEOUT_SECONDS,
        });
    }
    catch (error) {
        console.log(`Couldn't list namespaces. Error: ${JSON.stringify(error)}`);
    }
}
async function createNamespace(namespaceName) {
    try {
        const apiClient = getKubernetesCoreApiClient();
        if (!apiClient) {
            return;
        }
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
        const apiClient = getKubernetesCoreApiClient();
        if (!apiClient) {
            return;
        }
        if (namespaceName) {
            return await apiClient.listNamespacedConfigMap({
                namespace: namespaceName,
                timeoutSeconds: KUBERNETES_API_REQUEST_TIMEOUT_SECONDS,
            });
        }
        return await apiClient.listConfigMapForAllNamespaces({
            timeoutSeconds: KUBERNETES_API_REQUEST_TIMEOUT_SECONDS,
        });
    }
    catch (error) {
        console.log(`Couldn't list configmaps for namespace ${namespaceName}. Error: ${JSON.stringify(error)}`);
    }
}
async function scaleDeployment(params) {
    try {
        const apiClient = getKubernetesAppsApiClient();
        if (!apiClient) {
            return;
        }
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
export { createNamespace, listConfigMaps, listNamespaces, scaleDeployment };
