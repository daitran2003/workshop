declare var window: any;
import React from "react";
import { BrowserProvider, formatEther, Wallet } from "ethers";
import { Flex, Heading, SimpleGrid, Spacer } from "@chakra-ui/react";
import { ConnectWallet, WalletInfo } from "../../components";
import { IWalletInfo, TOKEN ,IRate, IPackage } from "@/_types_";
import { packages } from "@/constants";
import InvestCard from "./components/InvestCard";

export default function InvestView() {
  const [wallet, setWallet] = React.useState<IWalletInfo>();
  const [web3Provider, setWeb3Provider] = React.useState<BrowserProvider>();
  const [rate, setRate] = React.useState<IRate>({ ethRate: 0, usdtRate: 0 });
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [pak,setPak] = React.useState<IPackage>();
  const onConnectMetamask = async () => {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const rawBalance = await provider.getBalance(address);
      const ethBalance = parseFloat(formatEther(rawBalance));

      setWallet({ address, eth: ethBalance });
      setWeb3Provider(provider);
    }
  };

  return (
    <Flex
      w={{ base: "full", lg: "70%" }}
      flexDirection="column"
      margin="50px auto"
    >
      <Flex>
        <Heading size="lg" fontWeight="bold" mb="4">
          Blockchain Trainee
        </Heading>
        <Spacer />
        {!wallet && <ConnectWallet onClick={onConnectMetamask} />}
        {wallet &&
          <WalletInfo address={wallet?.address} amount={wallet?.eth || 0} />}
      </Flex>
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="65px" mt="50px">
        {packages.map((pk, index) => (
          <InvestCard
            pak={pk}
            key={String(index)}
            isBuying={isProcessing && pak?.key === pk.key}
            rate={pk.token === TOKEN.ETH ? rate.ethRate : rate.usdtRate}
            walletInfo={wallet}
            //onBuy={() => handleBuyIco(pk)}
            onBuy={() => {}}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}