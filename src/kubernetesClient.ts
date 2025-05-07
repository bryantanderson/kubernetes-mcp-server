import * as k8s from "@kubernetes/client-node";

const kubeConfig = new k8s.KubeConfig();
kubeConfig.loadFromDefault();

const coreApiClient = kubeConfig.makeApiClient(k8s.CoreV1Api);
const appsApiClient = kubeConfig.makeApiClient(k8s.AppsV1Api);

function getKubeConfig() {
	return kubeConfig;
}

function getKubernetesCoreApiClient() {
	return coreApiClient;
}

function getKubernetesAppsApiClient() {
	return appsApiClient;
}

export {
	getKubeConfig,
	getKubernetesAppsApiClient,
	getKubernetesCoreApiClient,
};
