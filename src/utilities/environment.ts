import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

export default function env() {
    const envVars = {
        projectName: process.env.PROJECT_NAME,
        apiPort: Number(process.env.API_PORT),
        apiProtocal: process.env.API_PROTOCAL,
        apiScheme: process.env.API_SCHEME,
        apiVersion: process.env.API_VERSION,
        docUrl: process.env.DOC_URL,
        nodeEnvironment: process.env.NODE_ENVIRONMENT,
        host: process.env.HOST,
        fastify: process.env.FASTIFY,
    }

    return envVars;
}