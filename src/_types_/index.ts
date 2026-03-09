import { Token } from "@chakra-ui/react";

export interface IWalletInfo {
    address : string;
    eth : number;
}

export interface IRate {
    usdtRate : number;
    ethRate : number;
}

export enum TOKEN {
    ETH = 'ETH',
    USDT = 'USDT'
}

export interface IPackage {
    key : string;
    name : string;
    amount : number;
    icon : string;
    bg : string;
    token : TOKEN;
}

export interface IMenu {
    name : string;
    url : string;
}

export interface IAttribute{
    trait_type: string;
    value: string | number;
}

export interface INftItem {
  id: number;

  name?: string;
  description?: string;
  image: string;

  attributes: IAttribute[];

  priceListing?: number;   // giá từ contract
  author?: string;

  owner?: string;
  ownerImage?: string;

  highestBid?: number;
}

export enum Clarity {
    "A",
    "B",
    "C",
    "D",
    "E",
    "S",
    "SS",
    "SSS",
}
export type ActionType = "LIST" | "UNLIST" | "TRANSFER" | "AUCTION";