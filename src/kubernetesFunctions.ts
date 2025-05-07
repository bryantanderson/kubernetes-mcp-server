import { KUBERNETES_API_REQUEST_TIMEOUT_SECONDS } from "./constants";
import { getKubernetesApiClient } from "./kubernetes";

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
    apiClient.createNamespace({
      body: {
        metadata: {
          name: namespaceName,
        },
      },
    });
  } catch (error) {
    console.log(`Couldn't create namespace ${namespaceName}. Error: ${JSON.stringify(error)}`)
  }
}

export { listNamespaces, createNamespace };
