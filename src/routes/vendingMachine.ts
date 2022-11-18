import { FastifyInstance } from "fastify";
import { summaryTags } from '../utilities/responses';
import { DenominationCoinsProp, DenominationProp, SlotProp, UserSelectionProp, VendingMachineProp } from './schemas';
import {VendingMachineController} from "../controller/vendingMachineController"

export default function (app: FastifyInstance, options: any, done: () => void){

    const maintenanceUserlabel = "maintenance user";
    const vendingMachinelabel = "View vending machine";
    const userlabel = "Use vending machine";
    /**
     * CREATE ENDPOINT
     */
    const createDenominationRecords = {
        ...summaryTags(maintenanceUserlabel, 'add coin denominations'),
        body: DenominationProp,
    }
    app.post('/denomination/', { schema: createDenominationRecords, }, VendingMachineController.createDenominationRecord)

    const updateDenominationCoinsRecord = {
        ...summaryTags(maintenanceUserlabel, 'Update vending machine slot price and items'),
        params: DenominationCoinsProp,
        body: DenominationProp,
    }
    app.patch('/denomination/:denomination', { schema: updateDenominationCoinsRecord, }, VendingMachineController.updateDenominationCoinsRecord) 
    
    const viewDenominationRecords = {
        ...summaryTags(vendingMachinelabel, 'View complete vending machine denominations'),
    }
    app.get('/denomination/', { schema: viewDenominationRecords, }, VendingMachineController.fetchDenominationRecord) 
        

    const createRecords = {
        ...summaryTags(maintenanceUserlabel, 'add new stock to available free slot'),
        body: VendingMachineProp,
    }
    app.post('/stock/', { schema: createRecords, }, VendingMachineController.createRecord)

    /**
     * FETCH ALL ENDPOINT
     */
     const fetchRecords = {
        ...summaryTags(vendingMachinelabel, 'View complete vending machine items'),
    }
    app.get('/', { schema: fetchRecords, }, VendingMachineController.fetchRecords)

    /**
     * UPDATE SLOT PRICE AND ITEMS
     */
     const updateRecord = {
        ...summaryTags(maintenanceUserlabel, 'Update vending machine slot price and items'),
        params: SlotProp,
        body: VendingMachineProp,
    }
    app.patch('/:slot', { schema: updateRecord, }, VendingMachineController.updateRecord)    
        
    /**
     * MAKE PURCHASE
     */
    const buyItemRecords = {
        ...summaryTags(userlabel, 'add coin denominations'),
        body: UserSelectionProp,
    }
    app.post('/buy/', { schema: buyItemRecords, }, VendingMachineController.makePurchase)

    done();
}