import { BrowserProvider, Contract } from "ethers";
import { ERC721Interface } from "./interfaces";
import { getNFTAddress } from "./utils/getAddress";
import { getNftAbi } from "./utils/getAbis";
import { INftItem } from "@/_types_";

export default class NftContract extends ERC721Interface {

    constructor(provider: BrowserProvider) {
        super(provider, getNFTAddress(), getNftAbi());
    }

    private _listTokenIds = async (address: string): Promise<number[]> => {
        const ids: bigint[] = await this._contract.listTokenIds(address);

        return ids.map((id) => Number(id));
    };

    getListNFT = async (address: string): Promise<INftItem[]> => {
        const ids = await this._listTokenIds(address);

        return Promise.all(
            ids.map(async (id) => {
                const tokenURI: string = await this._contract.tokenURI(id);

                const metadata = await fetch(tokenURI);
                const obj = await metadata.json();

                const item: INftItem = {
                    ...obj,
                    id
                };

                return item;
            })
        );
    };

    getNftInfo = async (nfts: any[]): Promise<INftItem[]> => {
        return Promise.all(
            nfts.map(async (o) => {
                const tokenURI: string = await this._contract.tokenURI(o.tokenId);

                const metadata = await fetch(tokenURI);
                const obj = await metadata.json();

                const item: INftItem = {
                    ...obj,
                    id: Number(o.tokenId),
                    author: o.author
                };

                return item;
            })
        );
    };
}
