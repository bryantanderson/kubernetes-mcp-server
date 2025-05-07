import * as k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const apiClient = kc.makeApiClient(k8s.CoreV1Api);

function getKubernetesApiClient() {
	return apiClient;
}

export { getKubernetesApiClient };
