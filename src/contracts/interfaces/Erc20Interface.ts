import { ethers } from "ethers";
import BaseInterface from "./BaseInterface";
import { parseUnits } from "ethers";
import { BrowserProvider, TransactionResponse, JsonRpcProvider,Contract } from "ethers";


class Erc20 extends BaseInterface {
    constructor(
        provider: BrowserProvider | JsonRpcProvider,
        address: string,
        abi: ethers.ContractInterface) {
        super(provider, address, abi, )
    }

    async balanceOf(WalletAdress: string): Promise<number> {
        const balance = await this._contract.balanceOf(WalletAdress)
        return this._toNumber(balance);
    }
    async owner(): Promise<string> {
        return this._contract.owner();
    }
    async totalSupply(): Promise<number> {
        const total = await this._contract.totalSupply();
        return this._toNumber(total)
    }
    async name(): Promise<string> {
        return this._contract.name();
    }
    async symbol(): Promise<string> {
        return this._contract.symbol();
    }
    async allowance( spender: string): Promise<bigint> {
        return await this._contract.allowance( spender);
    }
    async approve(spender: string, amount: number | String | bigint, decimals = 18): Promise<string> {
        const c = await this._write(); // <- QUAN TRỌNG: signer
        const value = parseUnits(amount.toString(), decimals); // bigint
        const tx: TransactionResponse = await c.approve(spender, value, this._option);
        return this._handleTransactionResponse(tx); // trả về tx.hash
    }
}
export default Erc20;