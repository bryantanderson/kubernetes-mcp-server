import * as k8s from "@kubernetes/client-node";

const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();

const apiClient = kubeConfig.makeApiClient(k8s.CoreV1Api);

function getKubeConfig() {
  return kubeConfig;
}

function getKubernetesApiClient() {
	return apiClient;
}

export { getKubeConfig, getKubernetesApiClient };
