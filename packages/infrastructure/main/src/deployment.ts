import {Provider} from '@pulumi/kubernetes'
import * as k8s from '@pulumi/kubernetes'
import { all, Config, Output } from '@pulumi/pulumi'

export const Deployment = (provider: Provider, rootServer: string, dbUrl: Output<any>, dbPass: Output<any>) => {

    const config = new Config();

    const suffix = config.require('suffix');
    const imageTag = process.env.IMAGE_TAG 

    const appName = `hiveconnect-${suffix}`
    
    const appLabels = { appClass: appName };

    const deployment = new k8s.apps.v1.Deployment(`${appName}-dep`, {
        metadata: { labels: appLabels },
        spec: {
            replicas: 1,
            strategy: { type: "RollingUpdate" },
            selector: { matchLabels: appLabels },
            template: {
                metadata: { labels: appLabels },
                spec: {
                    containers: [{
                        imagePullPolicy: "Always",
                        name: appName,
                        image: `thetechcompany/hiveconnect-backend:${imageTag}`,
                        ports: [{ name: "http", containerPort: 9013 }],
                        volumeMounts: [
                        ],
                        env: [
                            // { name: 'CLIENT_ID', value: process.env.CLIENT_ID || 'test'},
                            // { name: 'CLIENT_SECRET', value: process.env.CLIENT_SECRET || 'secret' },
                            { name: 'AWS_ACCESS_KEY_ID', value: process.env.AWS_ACCESS_KEY_ID },
                            { name: 'AWS_SECRET_ACCESS_KEY', value: process.env.AWS_SECRET_ACCESS_KEY },
                            { name: 'AWS_REGION', value: 'ap-southeast-2' },
                            { name: 'NODE_ENV', value: 'production' },
                            { name: 'ROOT_SERVER', value: `http://${rootServer}` },
                            { name: 'DEVICE_MQ_USER', value: process.env.IOT_USER },
                            { name: 'DEVICE_MQ_PASS', value: process.env.IOT_PASS },
                            { name: "VERSION_SHIM", value: '1.0.10' },

                            { name: 'BACKEND_ENTRYPOINT', value: process.env.BACKEND_ENTRYPOINT },
                            { name: 'ENTRYPOINT', value: process.env.ENTRYPOINT },

                            { name: 'HEXHIVE_SECRET', value: process.env.HEXHIVE_SECRET },

                            { name: "DATABASE_URL", value: all([dbUrl, dbPass]).apply(([url, pass]) => `postgresql://postgres:${pass}@${url}.db-${suffix}.svc.cluster.local:5432/hiveconnect?connect_timeout=100`) },
                            // { name: 'UI_URL',  value: `https://${domainName}/dashboard` },
                            // { name: 'BASE_URL',  value: `https://${domainName}`},
                            // { name: "NEO4J_URI", value: process.env.NEO4J_URI /*neo4Url.apply((url) => `neo4j://${url}.default.svc.cluster.local`)*/ },
                            // { name: "MONGO_URL", value: mongoUrl.apply((url) => `mongodb://${url}.default.svc.cluster.local`) },
                        ],
                        readinessProbe: {
                            httpGet: {
                                path: '/graphql',
                                port: 'http'
                            }
                        },

                        // resources: {
                        //     requests: {
                        //         cpu: '0.5',
                        //         memory: '0.5Gi'
                        //     },
                        //     limits: {
                        //         cpu: '1',
                        //         memory: '1Gi'
                        //     }
                        // }
                        // livenessProbe: {
                        //     httpGet: {
                        //         path: '/graphql',
                        //         port: 'http'
                        //     }
                        // }
                    }],
                    nodeSelector: {
                        role: 'worker'
                    }
                    // volumes: [{
                    //     name: `endpoints-config`,
                    //     configMap: {
                    //         name: configMap.metadata.name,
                    //         items: [{
                    //             key: 'endpoints',
                    //             path: 'endpoints.json'
                    //         }]
                    //     }
                    // }]
                }
            }
        },
    }, { provider: provider });

    return deployment
}