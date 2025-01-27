import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { Provider } from '@pulumi/kubernetes'
import { all, Config } from "@pulumi/pulumi";
import { Deployment } from './src/deployment'
import { Service } from './src/service'
// import SyncServer from './src/sync-server'
import { config } from 'dotenv';

config();


const main = (async () => {

    const config = new Config();
    const org = config.require('org');

    const suffix = config.require('suffix');

    const stackRef = new pulumi.StackReference(`${org}/base-infrastructure/prod`)
    
    const dbRef = new pulumi.StackReference(`${org}/hexhive-db/db-${suffix}`)

    const gatewayRef = new pulumi.StackReference(`${org}/apps/${suffix}`)

    const vpcId = stackRef.getOutput('vpcId');

    const kubeconfig = stackRef.getOutput('k3sconfig');

    const rootServer = gatewayRef.getOutput('internalGatewayUrl');
    
    const dbUrl = dbRef.getOutput('postgres_name');
    const dbPass = dbRef.getOutput('postgres_pass');

    // const exportLambda = lambdaRef.getOutput('exportFunction');

    const provider = new Provider('eks', { 
        kubeconfig
    });

    const deployment = await all([rootServer]).apply(async ([url]) => await Deployment(provider, url, dbUrl, dbPass));
    const service = await Service(provider)

    return {
        service,
        deployment
        // syncServer
    }
})()

export const deployment = main.then((res) => res.deployment.metadata.name)

export const service = main.then((res) => res.service.metadata.name)