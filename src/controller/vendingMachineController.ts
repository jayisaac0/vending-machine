import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { createDenomination, machine, purchase, updateDenominationCoins, updateMachine } from "../modules";
import { DenominationCoinsType, DenominationType, DenominationUpdateType, SlotType, UserSelectionType, VendingMachineType, VendingMachineUpdateType } from "../routes/schemas";
import { denominations, vending } from "../storage";

export class VendingMachineController {

    static async createRecord(request: FastifyRequest<{Body: VendingMachineType}>, reply: FastifyReply) {
        const records = machine(request.body);
                
        return reply.code(200).send(records)
    }

    static async createDenominationRecord(request: FastifyRequest<{Body: DenominationType}>, reply: FastifyReply) {
        const denomination = await createDenomination(request.body);
                
        return reply.code(200).send(denomination)
    }

    static async updateDenominationCoinsRecord(request: FastifyRequest<{Body: DenominationUpdateType, Params: DenominationCoinsType}>, reply: FastifyReply) {
        const denomination = updateDenominationCoins(request.body, request.params.denomination);
                
        return reply.code(200).send(denomination)
    }

    static async fetchDenominationRecord(request: FastifyRequest<{Body: VendingMachineType}>, reply: FastifyReply) {
        const records = await denominations;
                
        return reply.code(200).send(records)
    }

    static async fetchRecords(request: FastifyRequest<{Body: VendingMachineType}>, reply: FastifyReply) {
        const records = await vending;

        reply.code(200).send(records)
    }

    static async updateRecord(request: FastifyRequest<{Body: VendingMachineUpdateType, Params: SlotType}>, reply: FastifyReply) {
        const records = await updateMachine(request.body, request.params.slot)
        
        reply.code(200).send(records)
    }

    static async makePurchase(request: FastifyRequest<{Body: UserSelectionType}>, reply: FastifyReply) {
        
        const response = await purchase(request.body);
        
        reply.code(200).send(response)

    }
}