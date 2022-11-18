import Fastify from "fastify";
import path from "path";
import environments from './utilities/environment';
import routes from "./routes"
import helmet from "fastify-helmet"
import fastifyFormbody from '@fastify/formbody';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastswagger from 'fastify-swagger';

const environment = environments();


const app = Fastify({
    logger: true,
    pluginTimeout: 100000,
    trustProxy: true,
});

app.register(helmet, { contentSecurityPolicy: false });
app.register(cors);
app.register(fastifyFormbody);
app.register(fastifyStatic, {
    root: path.join(__dirname, '/../public'),
});
// app.register(corePackage);

// @ts-ignore
app.register(fastswagger, {
    exposeRoute: environment.fastify ? true : false,
    routePrefix: `/${environment.docUrl}`,
    swagger: {
        info: {
            title: 'Vending machine server',
            description: 'Vending machine fastify rest api service',
            version: environment.apiVersion,
        },
        host: environment.host + ':' + environment.apiPort,
        schemes: [environment.apiScheme],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [],
        securityDefinitions: {
            Authorization: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            },
        },
    },
});

routes(app);


app.listen({ port: environment.apiPort, host: environment.host }, (error, address) => {
    if (error) {
        console.log(error);
        app.log.error(error);
        process.exit(1)
    }
    console.log("Server running on "+ address);
})

