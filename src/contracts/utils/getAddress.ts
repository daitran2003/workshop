// utils/getAddress.ts
import getChainIdFromEnv, { AddressType, SMART_ADDRESS } from "./common";

const getAddress = (table: AddressType) => {
  const chainId = getChainIdFromEnv();
  const addr = (table as Record<number, string>)[chainId];
  if (!addr || typeof addr !== "string" || !addr.startsWith("0x") || addr.length !== 42) {
    throw new Error(`Missing/invalid address for chainId=${chainId}. Fix SMART_ADDRESS or .env`);
  }
  return addr;
};

export const getCrowdSaleAddress = () => getAddress(SMART_ADDRESS.CROWD_SALE);
export const getUsdtAddress = () => getAddress(SMART_ADDRESS.USDT);
export const getNFTAddress = () => getAddress(SMART_ADDRESS.NFT);
export const getMarketAddress = () => getAddress(SMART_ADDRESS.MARKET);

