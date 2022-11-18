import { FastifyInstance } from "fastify";
import coreRoutes from './vendingMachine';

export default function (app: FastifyInstance) {
    
    app.register(coreRoutes, { prefix: '/machine' });
}