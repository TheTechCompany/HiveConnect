import { config } from 'dotenv'
config()

import { HiveGraph } from '@hexhive/graphql-server'

import cors from 'cors';
import express from 'express';
import typeDefs from './schema'
import resolvers from './resolvers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {


	// await connect_data()
	
	// const driver = neo4j.driver(
	// 	process.env.NEO4J_URI || "localhost",
	// 	neo4j.auth.basic(process.env.NEO4J_USER || "neo4j", process.env.NEO4J_PASSWORD || "test")
	// )

	// const pool = new Pool({
	// 	host: process.env.TIMESERIES_HOST || 'localhost',
	// 	user: process.env.TIMESERIES_USER || 'postgres',
	// 	password: process.env.TIMESERIES_PASSWORD || 'quest',
	// 	port: 5432,
	// 	keepAlive: true,
	// 	// connectionTimeoutMillis: 60 * 1000,
	// 	max: 10
	// })

	// const mq = await amqp.connect(
	// 	process.env.RABBIT_URL || 'amqp://localhost'
	// )

	// console.log("RabbitMQ")

	// const mqChannel = await mq.createChannel()

	// await mqChannel.assertQueue(`COMMAND:MODE`);
	// await mqChannel.assertQueue(`COMMAND:STATE`);

	// await mqChannel.assertQueue(`COMMAND:DEVICE:CONTROL`)
	// await mqChannel.assertQueue(`COMMAND:DEVICE:MODE`);
	// await mqChannel.assertQueue(`COMMAND:FLOW:PRIORITIZE`);

	//TODO figure out the race condition to get the OGM with merged models from hive-graph

	const resolved = await resolvers(prisma)

	// const neoSchema : Neo4jGraphQL = new Neo4jGraphQL({ typeDefs, resolvers: resolved, driver })

	const graphServer = new HiveGraph({
		dev: false,
		name: 'HiveConnect',
		slug: 'connect',
		backend_url: process.env.BACKEND_ENTRYPOINT || 'http://localhost:9013',
		entrypoint: process.env.ENTRYPOINT || 'http://localhost:8513/hiveconnect-app-frontend.js',
		resources: [
			{
				name: 'Customer',
				actions: ['create', 'read', 'update', 'delete']
			},
			{
				name: 'Order',
				actions: ['create', 'read', 'update', 'delete']
			},
			{
				name: 'Request',
				actions: ['create', 'read', 'update', 'delete']
			}
		],
		rootServer: process.env.ROOT_SERVER || 'http://localhost:7000',
		schema: {
			typeDefs: typeDefs,
			resolvers: resolved,
		}
	})

	await graphServer.init()

	const app = express()

	
	app.use(cors())

	app.use(graphServer.middleware)

	
	app.listen('9013')

})()