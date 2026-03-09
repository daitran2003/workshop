import React from "react";
import MarketContract from '@/contracts/MarketContract';
import NftContract from '@/contracts/NftContract';
import { useAppSelector } from '@/reduxs/hooks';
import { INftItem } from '@/_types_';
import { Flex, Select, SimpleGrid, Tabs } from "@chakra-ui/react";
import { SuccessModal } from "@/components";

export default function MarketView() {
    const { web3Provider, wallet } = useAppSelector((state) => state.account);
    const [nfts, setNfts] = React.useState<INftItem[]>([]);
    const [nftsListed, setNftsListed] = React.useState<INftItem[]>([]);
    const getListNft = React.useCallback(async () => {
    if (!web3Provider || !wallet) return;
    const nftContract = new NftContract(web3Provider);

    // NFT của user
    const userNfts = await nftContract.getListNFT(wallet.address);
    setNfts(userNfts.filter((p) => p.name));

    // NFT đang list trên marketplace
    const marketContract = new MarketContract(web3Provider);
    const listedItems = await marketContract.getNFTListedOnMarketplace();

    const ids = listedItems.map((i: any) => i.tokenId);

    const listedNfts = await nftContract.getNftInfo(ids);

    setNftsListed(listedNfts);

  }, [web3Provider, wallet]);

  React.useEffect(() => {
    getListNft();
  }, [getListNft]);

   return (
  <Flex w="full">
  <Tabs>
    <TabList borderBottomColor="#5A5A5A" borderBottomRadius={2} mx="15px">
      <Tab
        textTransform="uppercase"
        color="#5A5A5A"
        _selected={{ borderBottomColor: "white", color: "white" }}
      >
        ALL ITEMS
      </Tab>

      <Tab
        textTransform="uppercase"
        color="#5A5A5A"
        _selected={{ borderBottomColor: "white", color: "white" }}
      >
        ACTIVE LISTINGS
      </Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <SimpleGrid w="full" columns={4} spacing={10}>
          {nfts.map((nft, index) => (
            <Nft
              item={nft}
              key={index}
              index={index}
              isAuction
            //   onAuction={(a) => selectAuction(a, nft)}
            />
          ))}
        </SimpleGrid>
      </TabPanel>

      <TabPanel>
        <SimpleGrid w="full" columns={4} spacing={10}>
          {nftsListed.map((nft, index) => (
            <Nft
              item={nft}
              key={index}
              index={index}
            />
          ))}
        </SimpleGrid>
      </TabPanel>
    </TabPanels>
  </Tabs>

  {/* <ProcessingModal isOpen={isUnlist} onClose={() => {}} />

  <ListModal
    isOpen={isOpen}
    nft={nft}
    isListing={isListing}
    onClose={() => setIsOpen(false)}
    onList={(amount) => handleListNft(amount)}
  />

  <SuccessModal
    hash={txHash}
    title="LIST - UNLIST NFT"
    isOpen={isSuccess}
    onClose={onCloseSuccess}
  />
</Flex> */}
}   

