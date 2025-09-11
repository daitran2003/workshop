import { ethers } from "ethers";
import BaseInterface from "./BaseInterface";
import { Wallet } from "ethers";
import { BrowserProvider } from "ethers";
import { JsonRpcApiProvider } from "ethers";

class Erc20 extends BaseInterface {
    constructor(
        provider: BrowserProvider | JsonRpcApiProvider,
        address : string, 
        abi: ethers.ContractInterface) {
        super(provider, address, abi)
    }
}

async balanceOf(walletAddress: string): Promise<number> {
    const balance = await this._contract.balanceOf(WalletAddress);
    return this._toNumber(balance);
}