import { AppsV1Api, CoreV1Api, KubeConfig } from "@kubernetes/client-node";
let kubeConfig;
let coreApiClient;
let appsApiClient;
function getKubeConfig() {
    if (!kubeConfig) {
        kubeConfig = new KubeConfig();
        kubeConfig.loadFromDefault();
    }
    return kubeConfig;
}
function getKubernetesCoreApiClient() {
    if (!coreApiClient) {
        coreApiClient = getKubeConfig().makeApiClient(CoreV1Api);
    }
    return coreApiClient;
}
function getKubernetesAppsApiClient() {
    if (!appsApiClient) {
        appsApiClient = getKubeConfig().makeApiClient(AppsV1Api);
    }
    return appsApiClient;
}
export { getKubeConfig, getKubernetesAppsApiClient, getKubernetesCoreApiClient, };
