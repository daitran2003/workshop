export type AddressType = {
  1: string;
  11155111: string;
};

export enum CHAIN_ID {
  MAINNET = 1,
  TESTNET = 11155111,
}

export default function getChainIdFromEnv(): number {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID;
  if (!env) return CHAIN_ID.TESTNET;
  return parseInt(env);
}

export const getRPC = () => {
  if (getChainIdFromEnv() === CHAIN_ID.MAINNET) {
    return process.env.NEXT_PUBLIC_RPC_MAINNET;
  }
  return process.env.NEXT_PUBLIC_RPC_TESTNET;
};

export const SMART_ADDRESS: Record<string, AddressType> = {
  CROWD_SALE: {
    11155111: "0x324EbC86928E765e5362b61E937Ca3957DFa222e",
    1: "",
  },
  USDT: {
    11155111: "0xA1A99Cec445562f081D7461a6de6001A4076aFdE",
    1: "",
  },
  NFT: {
    11155111: "0x786d6744e6B667D2f955102288dBFAAcF1eBC1bD",
    1: "",
  },
  MARKET: {
    11155111: "0xbaC763985e40c5cDcdc027BD609cf613205255AA",
    1: "",
  },
};
