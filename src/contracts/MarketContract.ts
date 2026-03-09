import { INftItem } from "@/_types_";
import { ethers } from "ethers";
import { ERC721Interface } from "./interfaces";
import { getMarketAddress}  from "./utils/getAddress";
import { getMarketAbi } from "./utils/getAbis";

export default class MarketContract extends ERC721Interface {

  constructor(provider: ethers.BrowserProvider) {
    super(provider, getMarketAddress(), getMarketAbi());
  }

  getNFTListedOnMarketplace = async () => {
    const items = await this._contract.getListedNft();

    const nfts = items.map((item: any) => ({
      tokenId: Number(item.tokenId),
      author: item.author
    }));

    return nfts;
  };

  getMyNftListed = async (address: string) => {
    const nfts = await this.getNFTListedOnMarketplace();
    return nfts.filter((p: any) => p.author === address);
  };

  listNft = async (tokenId: number, price: number) => {
    const tx = await this._contract.listNft(
      tokenId,
      this._toWei(price),
      this._option
    );

    return this._handleTransactionResponse(tx);
  };

  unListNft = async (tokenId: number) => {
    const contract = await this._write();
    const tx = await contract.unListNft(tokenId, this._option);

    return this._handleTransactionResponse(tx);
  };
}