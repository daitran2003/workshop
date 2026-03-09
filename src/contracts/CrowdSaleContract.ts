import { Provider, ethers, Contract, BrowserProvider, JsonRpcProvider, TransactionResponse,parseUnits } from "ethers";
import { BaseInterface } from "./interfaces";
import { getRPC } from "./utils/common";
import { getCrowdSaleAbi } from "./utils/getAbis";
import { getCrowdSaleAddress } from "./utils/getAddress";
import UsdtContract from "@/contracts/UsdtContract";
export default class CrowdSaleContract extends BaseInterface {
  constructor(provider?: Provider) {
    super(provider ?? new JsonRpcProvider(getRPC()), getCrowdSaleAddress(), getCrowdSaleAbi());

  }


  async getEthRate(): Promise<number> {
    const rate: bigint = await this._contract.ethRate();
    return this._toNumber(rate);
  }

  async getUsdtRate(): Promise<number> {
    const rate: bigint = await this._contract.usdtRate();
    return this._toNumber(rate);
  }

  async buyTokenByETH(amountToken: number): Promise<string> {
    const rate = await this.getEthRate();
    const contract = await this._write();
    const tx: TransactionResponse = await contract.buyTokenByETH({
      value: this._toWei(amountToken / rate),
      ...this._option,
    });

    return this._handleTransactionResponse(tx);
  }


  async buyTokenByUSDT(usdtAmount: number): Promise<string> {
  if (!(this._provider instanceof BrowserProvider))
    throw new Error("Wallet not connected");

  const usdt = new UsdtContract(this._provider);
  await usdt.approve(
    this._contractAddress,
    usdtAmount,
    18
  );
  const usdtValue = parseUnits(usdtAmount.toString(), 18);
  const contract = await this._write();
  const tx = await contract.buyTokenByUSDT(usdtValue);
  return this._handleTransactionResponse(tx);
}

}
