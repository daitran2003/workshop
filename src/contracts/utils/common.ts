export type AddressType = {
    1 : string
    11155111 : string

}
export enum CHAIN_ID {
    TESTNET = 11155111,
    MAINNET = 1,
}

export default function getChainIdFromEnv(): number {
    const env = process.env.NEXT_PUBLIC_CHAIN_ID;
    if (!env) { return 11155111; }
    return parseInt(env) ;
}

export const getRPC = () => {
    if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
        return process.env.NEXT_PUBLIC_RPC_MAINNET;
        return process.env.NEXT_PUBLIC_RPC_TESTNET;

}
export const SMART_ADDRESS = {
    CROWD_SALE: {11155111: '0xb6F3604ccF7775821963CAf13Ab51B0FeDe9C61B' , 1: ''},
    USDT: {11155111: '0x79e3D4a51C856F1bD22a16c49c1FF0D6e1C1E9f8' , 1:''},
}