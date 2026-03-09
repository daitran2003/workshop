import { BrowserProvider, parseUnits } from "ethers";
import Erc20 from "./interfaces/Erc20Interface";
import { getUsdtAbi } from "./utils/getAbis";
import { getUsdtAddress } from "./utils/getAddress";

export default class UsdtContract extends Erc20 {
  static DECIMALS = 18;

  constructor(provider: BrowserProvider) {
    super(provider, getUsdtAddress(), getUsdtAbi() as any);
  }

  // async approveIfNeeded(

  //   spender: string,
  //   amount: bigint
  // ) {
  //   const allowance = await this.allowance(spender);

  //   if (allowance >= amount) return;

  //  const tx = await this.approve(spender, amount);
  //   await tx.wait();

  // }

}

