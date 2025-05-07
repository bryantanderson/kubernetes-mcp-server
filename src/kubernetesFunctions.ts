import { KUBERNETES_API_REQUEST_TIMEOUT_SECONDS } from "./constants";
import { getKubernetesApiClient } from "./kubernetesClient";

async function listNamespaces() {
  try {
    const apiClient = getKubernetesApiClient();
    return await apiClient.listNamespace({
      timeoutSeconds: KUBERNETES_API_REQUEST_TIMEOUT_SECONDS,
    });
  } catch (error) {
    console.log(`Couldn't list namespaces. Error: ${JSON.stringify(error)}`)
  }
}

async function createNamespace(namespaceName: string) {
  try {
    const apiClient = getKubernetesApiClient();
    const namespace = await apiClient.createNamespace({
      body: {
        metadata: {
          name: namespaceName,
        },
      },
    });
    return namespace;
  } catch (error) {
    console.log(`Couldn't create namespace ${namespaceName}. Error: ${JSON.stringify(error)}`)
  }
}

async function listConfigMaps(namespaceName?: string) {
  try {
    const apiClient = getKubernetesApiClient();
    
    if (namespaceName) {
      return await apiClient.listNamespacedConfigMap({
        namespace: namespaceName,
        timeoutSeconds: KUBERNETES_API_REQUEST_TIMEOUT_SECONDS,
      });
    }

    return await apiClient.listConfigMapForAllNamespaces({
      timeoutSeconds: KUBERNETES_API_REQUEST_TIMEOUT_SECONDS,
    });
  } catch (error) {
    console.log(`Couldn't list configmaps for namespace ${namespaceName}. Error: ${JSON.stringify(error)}`)
  }
}

export { listConfigMaps, listNamespaces, createNamespace };
