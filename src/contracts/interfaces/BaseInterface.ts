import { Signer } from "ethers";
import { Interface } from "ethers";
import {
  Provider,
  BrowserProvider,
  JsonRpcProvider,
  Contract,
  TransactionResponse,
  Overrides,
  parseEther,
  formatEther,
  parseUnits,
  formatUnits,
} from "ethers";

export default class BaseInterface {
  protected _provider: Provider;
  protected _contractAddress: string;
  protected _abis: any;
  protected _contract: Contract;
  protected _option: Overrides;

  constructor(
    provider: Provider,
    address: string,
    abi: any,
  ) {
    this._provider = provider;
    this._contractAddress = address;
    this._abis = abi;
    this._option = { };
    this._contract = new Contract(address, abi, provider as any);
  }

  protected async _write(): Promise<any> {
    if (this._provider instanceof BrowserProvider) {
      const signer = await this._provider.getSigner();
      return new Contract(
      this._contractAddress,
      this._abis,
      signer
    );
    }
    throw new Error("Write operation requires BrowserProvider/Signer (wallet connected)");
  }

  protected async _handleTransactionResponse(tx: TransactionResponse): Promise<string> {

    const receipt = await tx.wait();
    if (!receipt) throw new Error("Transaction failed, no receipt");
    return tx.hash;


  };

  // wei -> ETH dạng number làm tròn
  protected _toEth(value: bigint): number {
    return Number.parseFloat(formatEther(value));
  }

  // wei -> ETH dạng string dữ nguyên dữ liệu
  protected _toEthStr(value: bigint): string {
    return formatEther(value);
  }

  /** bigint nhỏ → number tuỳ chỉnh (nếu nằm trong safe range) */
  protected _toNumber(value: bigint): number {
    const n = Number(value);
    if (!Number.isFinite(n)) throw new Error("Value too large for JS Number");
    return n;
  }


  /** ETH → Wei (bigint) */
  protected _toWei(amountEth: string | number): bigint {
    return parseEther(amountEth.toString());
  };

  /** Đổi giá trị user nhập → bigint theo decimals token */
  protected _parseAmount(amount: string | number, decimals = 18): bigint {
    return parseUnits(amount.toString(), decimals);
  };
}