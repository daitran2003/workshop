import { Interface } from "ethers";
import {
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
  _provider: BrowserProvider | JsonRpcProvider;
  _contractAddress: string;
  _abis: any; // hoặc InterfaceAbi
  _contract: Contract;
  _option: Overrides;

  constructor(
    provider: BrowserProvider | JsonRpcProvider,
    address: string,
    abi: any
  ) {
    this._provider = provider;
    this._contractAddress = address;
    this._abis = abi;
    this._option = { gasLimit: 300000 };
    this._contract = new Contract(address, abi, provider); 
  }

  _handleTransactionResponse = async (tx: TransactionResponse) => {
    try {
      const receipt = await tx.wait();
      return receipt?.hash; // ethers v6: transactionHash → hash
    } catch (er: any) {
      throw new Error(er?.reason || `${er}`);
    }
  };

  _numberToEth = (amount: number) => {
    return parseEther(amount.toString()); // trả về bigint
  };

  _toNumber = (value: bigint) => {
    try {
      return Number(value); // nếu trong safe range
    } catch {
      return Number.parseFloat(formatEther(value));
    }
  };

  _toEther = (value: bigint) => {
    return Number.parseFloat(formatEther(value));
  };

  _toWei = (amount: number) => {
    return parseUnits(amount.toString(), 18); // trả về bigint (wei)
  };

  _formatFromWei = (value: bigint) => {
    return Number.parseFloat(formatUnits(value, 18)); 
  };
}
