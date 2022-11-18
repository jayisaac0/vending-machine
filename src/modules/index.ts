import { DenominationType, DenominationUpdateType, UserSelectionType, VendingMachineType, VendingMachineUpdateType } from "../routes/schemas";
import { denominations, vending } from "../storage";

export const machine = (args: VendingMachineType) =>{
    if (vending.some((el) => el.slot === args.slot)) {
        const item = vending.findIndex((el) => el.slot === args.slot)
        /**
         * in case same slot is added an item increase item number and also update price
         */
        // type key = "item";
        vending[item].items += args?.items;
        vending[item].price = args?.price;
        return vending 
    }
    /**
     * add new stock to the vending machine
     */    
    vending.push(args)
    return vending;
}

export const updateMachine = (args: VendingMachineUpdateType, slot: string) =>{
    
    if (vending.some((el) => el.slot === slot)) {
        const item = vending.findIndex((el) => el.slot === slot)
        /**
         * Obtain object keys to dynamically update vending machine slots
         */
        Object.keys(args).forEach(key => {
            if (key === "price") {
                vending[item].price = args.price;
            }else{
                vending[item].items += args.items;
            }
        });
        return vending 
    }
    /**
     * return up to date vending machine information
     */    
    return vending;
}

export const createDenomination = (args: DenominationType) => {
    if (denominations.some((el) => el.denomination === args.denomination)) {
        const item = denominations.findIndex((el) => el.denomination === args.denomination)
        /**
         * in case same denomination is added an item increase item number
         */
        denominations[item].coins += args?.coins;
        return denominations 
    }
    denominations.push(args);
    
    return denominations;
}

export const updateDenominationCoins = (args: DenominationUpdateType, denomination: number) => {

    if (denominations.some((el) => el.denomination === denomination)) {
        const item = denominations.findIndex((el) => el.denomination === denomination)        
        /**
         * Obtain object keys to dynamically update denominations machine slots
         */
        Object.keys(args).forEach(key => {
            denominations[item].coins += args.coins;
        });
        return denominations;
    }
    return denominations;
}

export const purchase = (input: UserSelectionType) => {
    let expectedChangeDenominationAndCoins = [];
    let change;
    /**
     * Check if selected item quantity selected is greater that 0
     */
    if(input.quantity <= 0) return "Please select a quantity of one item or above";

    /**
     * Check if denomination entered by user is supported by vending machine
     * */
    for (const money of input.money) {        
        if(!denominations.some((el) => el.denomination === money.denomination)) return `Sorry denomination ${money.denomination} entered is not supported in vending machine`;
    }

    /**
     * Calculate amount of money input in the vending machine no matter the denomination
     */
    const totalInputMoney = input.money.reduce((sum: any, currencValue: any) => sum + (currencValue.denomination * currencValue.coins), 0);
    /**
     * Find item from vending machine slot and find total amount to pay by multiplying with quantity required by user
     */
    const findItemSlot = vending.filter((item) => item.slot === input.item);
    
    /**
     * Check if item is not available in vending machine
     */
    if (!findItemSlot) return "Item not available in the vending machine";
    /**
     * Check if vending machine has got required item quantity
     */
    if (input.quantity > findItemSlot[0].items)  return `Selected quantity of ${findItemSlot[0].slot} is more than what is available in the vending machine`;
        
    let totalExpectedPayment = findItemSlot[0].price * input.quantity;
    /**
     * Temporarily add the amount entered by user to the vending machine
     */
    for (const money of input.money) {
        const item = denominations.findIndex((el) => el.denomination === money.denomination);
        denominations[item].coins += money.coins;
    }
    /**
     * Ensure the amount user has entered is enough to make item purchase
     */
    if(totalInputMoney < totalExpectedPayment) {
        /**
         * On failure to have sufficient change, return 
         */
        for (const money of input.money) {
            const item = denominations.findIndex((el) => el.denomination === money.denomination);
            denominations[item].coins -= money.coins;
        }
        return change = {
            message: `Amount entered is not sufficient to complete purchase. You need ${totalExpectedPayment - totalInputMoney} more dollar(s)`,
            returnInputCash: input.money,
        }
    }
    let expectedChange = totalInputMoney - totalExpectedPayment;
    
    /**
     * Get the denominations sorted from largest to smallest
     */
    const sortedDenominations = denominations.sort((a,b) => b.denomination - a.denomination);

    /**
     * Loop through available denominations
     */
    for(let singleDenomination of sortedDenominations) {
    
        /**
         * Get the maximum posible denomination that will be required to pay the expected change
         */
        const maximumPossibleDenomination = Math.floor(expectedChange/singleDenomination.denomination);
        /**
         * If coins available in denomination are enough to pay fully or patially pay use them
         * proceed to the next lower highest denomination and repeat the process till all the change has been paid
         */
        if(singleDenomination.coins >= maximumPossibleDenomination) {
            expectedChange -= singleDenomination.denomination * maximumPossibleDenomination
        } else {
            expectedChange -= singleDenomination.denomination * singleDenomination.coins
        }

        /**
         * Get the change denominations after computation
         */
        if(maximumPossibleDenomination !== 0) {
            expectedChangeDenominationAndCoins.push({ denomination: singleDenomination.denomination, coins: maximumPossibleDenomination })
            
        }
    }
    
    /**
     * If after computation, the expected change returns a amount short for the vending machine to return change
     * return message indicating the vending machine has no enough denominations to return change and return buyer coins
     */
    if(expectedChange > 0) {
        return change = {
            message: "there is no enough change in the vending machine",
            returnInputCash: input.money,
        }
    }

    /**
     * If the machine will comfortably return change, go ahead and make a deduction of the coins from machine
     * and return as change
     */

    for (const el of expectedChangeDenominationAndCoins) {
        const item = denominations.findIndex((el) => el.denomination === el.denomination)        
        denominations[item].coins += el.coins;
    }
    
    /**
     * Return success message of purchase after change has been returned correctly
     */
    change = {
        message: `Thank you for getting a ${input.item}`,
        totalChange: totalInputMoney - totalExpectedPayment,
        changeShord: expectedChange,
        changeDenominations: expectedChangeDenominationAndCoins,
    }
    
    return change
}