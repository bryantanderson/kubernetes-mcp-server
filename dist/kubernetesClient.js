import { AppsV1Api, CoreV1Api, KubeConfig } from "@kubernetes/client-node";
const kubeConfig = new KubeConfig();
kubeConfig.loadFromDefault();
const coreApiClient = kubeConfig.makeApiClient(CoreV1Api);
const appsApiClient = kubeConfig.makeApiClient(AppsV1Api);
function getKubeConfig() {
    return kubeConfig;
}
function getKubernetesCoreApiClient() {
    return coreApiClient;
}
function getKubernetesAppsApiClient() {
    return appsApiClient;
}
export { getKubeConfig, getKubernetesAppsApiClient, getKubernetesCoreApiClient, };
