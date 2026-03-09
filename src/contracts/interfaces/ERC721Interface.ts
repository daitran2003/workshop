import { BrowserProvider, TransactionResponse } from "ethers";
import BaseInterface from "./BaseInterface";

export default class ERC721Interface extends BaseInterface {

  constructor(
    provider: BrowserProvider,
    address: string,
    abi: any
  ) {
    super(provider, address, abi);
  }

  // số NFT của 1 ví
  async balanceOf(walletAddress: string): Promise<number> {
    const balance = await this._contract.balanceOf(walletAddress);
    return Number(balance);
  }

  // owner của token
  async ownerOf(tokenId: string | number): Promise<string> {
    return this._contract.ownerOf(tokenId);
  }

  // approve NFT cho address khác
  async approve(
    toAddress: string,
    tokenId: string | number
  ): Promise<TransactionResponse> {
    return this._contract.approve(toAddress, tokenId);
  }

  // lấy approved address của token
  async getApproved(tokenId: string | number): Promise<string> {
    return this._contract.getApproved(tokenId);
  }

  // approve tất cả NFT cho operator
  async setApprovalForAll(
    operator: string,
    approved: boolean
  ): Promise<TransactionResponse> {
    return this._contract.setApprovalForAll(operator, approved);
  }

  // safe transfer NFT
  async safeTransferFrom(
    fromAddress: string,
    toAddress: string,
    tokenId: string | number
  ): Promise<TransactionResponse> {
    return this._contract["safeTransferFrom(address,address,uint256)"](
      fromAddress,
      toAddress,
      tokenId
    );
  }

  // transfer NFT (không safe)
  async transferFrom(
    fromAddress: string,
    toAddress: string,
    tokenId: string | number
  ): Promise<TransactionResponse> {
    return this._contract.transferFrom(
      fromAddress,
      toAddress,
      tokenId
    );
  }

  // metadata URI
  async tokenURI(tokenId: string | number): Promise<string> {
    return this._contract.tokenURI(tokenId);
  }
}