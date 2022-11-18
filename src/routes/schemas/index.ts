import { Static, Type } from "@sinclair/typebox";

export const VendingMachineProp = Type.Object({
    slot: Type.String({
        minLength: 1,
    }),
    price: Type.Number({
        minimum: 1,
    }),
    items: Type.Number({
        minimum: 1,
    }),
});
export type VendingMachineType = Static<typeof VendingMachineProp>;
export const VendingMachineUpdateProp = Type.Object({
    price: Type.Number({
        minimum: 1,
    }),
    items: Type.Number({
        minimum: 1,
    }),
});
export type VendingMachineUpdateType = Static<typeof VendingMachineUpdateProp>;
export const SlotProp = Type.Object({
    slot: Type.String({
        minLength: 1,
    }),
});
export type SlotType = Static<typeof SlotProp>;








export const DenominationProp = Type.Object({
    denomination: Type.Number({
        minimum: 1,
    }),
    coins: Type.Number({
        minimum: 1,
    }),
});
export type DenominationType = Static<typeof DenominationProp>;
export const DenominationUpdateProp = Type.Object({
    coins: Type.Number({
        minimum: 1,
    }),
});
export type DenominationUpdateType = Static<typeof DenominationUpdateProp>;
export const DenominationCoinsProp = Type.Object({
    denomination: Type.Number({
        minimum: 1,
    }),
});
export type DenominationCoinsType = Static<typeof DenominationCoinsProp>;








export const UserSelectionProp = Type.Object({
    item: Type.String({
        minLength: 1,
    }),
    quantity: Type.Number({
        minLength: 1,
    }),
    money: Type.Array(DenominationProp),
});
export type UserSelectionType = Static<typeof UserSelectionProp>;