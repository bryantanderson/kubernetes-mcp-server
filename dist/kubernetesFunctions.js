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
        console.error(`Couldn't list namespaces. Error: ${JSON.stringify(error)}`);
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
        console.error(`Couldn't create namespace ${namespaceName}. Error: ${JSON.stringify(error)}`);
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
        console.error(`Couldn't list configmaps for namespace ${namespaceName}. Error: ${JSON.stringify(error)}`);
    }
}
async function scaleDeployment(params) {
    try {
        const { deploymentName, namespace, desiredReplicas } = params;
        const apiClient = getKubernetesAppsApiClient();
        if (!apiClient) {
            return;
        }
        const deployment = await apiClient.readNamespacedDeployment({
            namespace,
            name: deploymentName,
        });
        if (!deployment) {
            return;
        }
        return await apiClient.patchNamespacedDeployment({
            namespace,
            name: deploymentName,
            body: {
                spec: {
                    replicas: desiredReplicas,
                },
            },
        });
    }
    catch (error) {
        console.error(`Couldn't scale up deployment ${params.deploymentName} in namespace ${params.namespace}. Error: ${JSON.stringify(error)}`);
    }
}
async function executeCommandInPod(params) {
    try {
        const { namespace, command, fieldSelector, labelSelector, containerName, } = params;
        const apiClient = getKubernetesCoreApiClient();
        if (!apiClient) {
            return;
        }
        const pod = await apiClient.listNamespacedPod({
            namespace,
            fieldSelector,
            labelSelector,
            timeoutSeconds: KUBERNETES_API_REQUEST_TIMEOUT_SECONDS,
        });
        if (!pod || !pod.items?.length) {
            return;
        }
        return await apiClient.connectPostNamespacedPodExec({
            namespace,
            command,
            name: pod.items[0].metadata?.name || "pod",
            container: containerName || pod.items[0].spec?.containers[0].name,
        });
    }
    catch (error) {
        console.error(`Couldn't execute command in pod. Error: ${JSON.stringify(error)}`);
    }
}
export { createNamespace, executeCommandInPod, listConfigMaps, listNamespaces, scaleDeployment, };
