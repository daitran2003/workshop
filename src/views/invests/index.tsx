declare var window: any;
import React, { useCallback } from "react";
import { BrowserProvider, formatEther, parseUnits,   } from "ethers";
import {
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectWallet, SuccessModal, WalletInfo } from "../../components";
import { IWalletInfo, TOKEN, IRate, IPackage } from "@/_types_";
import { packages } from "@/constants";
import InvestCard from "./components/InvestCard";
import CrowdSaleContract from "@/contracts/CrowdSaleContract";
import UsdtContract from "@/contracts/UsdtContract";

export default function InvestView() {
  const [wallet, setWallet] = React.useState<IWalletInfo>();
  const [rate, setRate] = React.useState<IRate>({ ethRate: 0, usdtRate: 0 });
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [pak, setPak] = React.useState<IPackage>();
  const [txhash, setTxHash] = React.useState<string>();
  const { open, onClose, onOpen } = useDisclosure();
  const [web3Provider, setWeb3Provider] = React.useState<BrowserProvider>();

  // 🟡 ép chain sang Sepolia
  const ensureSepolia = async (provider: BrowserProvider) => {
    const sepoliaHex = "0xaa36a7"; // 11155111
    try {
      await provider.send("wallet_switchEthereumChain", [{ chainId: sepoliaHex }]);
    } catch (err: any) {
      if (err.code === 4902) {
        await provider.send("wallet_addEthereumChain", [
          {
            chainId: sepoliaHex,
            chainName: "Sepolia Testnet",
            nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://sepolia.infura.io/v3/<YOUR_INFURA_KEY>"],
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          },
        ]);
      } else {
        console.error("Switch chain error:", err);
      }
    }
  };

  // 🟢 lấy rate
const getRate = useCallback(async (provider :BrowserProvider) => {
  const crownContract = new CrowdSaleContract(provider); 
  const ethRate = await crownContract.getEthRate();
  const usdtRate = await crownContract.getUsdtRate();
  setRate({ ethRate, usdtRate });
}, []);

const onConnectMetamask = async () => {
  if (!window.ethereum) return alert("⚠️ Hãy cài MetaMask trước.");

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  await ensureSepolia(provider);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const rawBalance = await provider.getBalance(address);
  const ethBalance = parseFloat(formatEther(rawBalance));

  setWallet({ address, eth: ethBalance });
  setWeb3Provider(provider);

  await getRate(provider);
};


// 🔹 mua token
const handleBuyIco = async (pk: IPackage) => {
  if (!web3Provider) return;
  setPak(pk);
  setIsProcessing(true);

  try {
    let hash = "";
    const crownContract = new CrowdSaleContract(web3Provider);

    // Lấy tỷ giá
    const ethRate = await crownContract.getEthRate();   // dùng ở nhánh ETH
    const usdtRate = await crownContract.getUsdtRate(); // tokens per 1 USDT

    if (pk.token === TOKEN.USDT) {
  
      if (!Number.isFinite(usdtRate) || usdtRate <= 0) 
        throw new Error("USDT rate is zero");
      if (!Number.isFinite(pk.amount) || pk.amount <= 0) 
        throw new Error("Bad token amount");

      // Wrapper xử lý toàn bộ: rate + approve + decimals
      //const usdtAmount = parseUnits(pk.amount.toString(), 18);

      const usdtNeed = pk.amount / usdtRate;
      hash = await crownContract.buyTokenByUSDT(usdtNeed);

    } else {
      if (!Number.isFinite(ethRate) || ethRate <= 0) 
        throw new Error("ETH rate is zero");
      if (!Number.isFinite(pk.amount) || pk.amount <= 0) 
        throw new Error("Bad token amount");

      hash = await crownContract.buyTokenByETH(pk.amount);
    }

      setTxHash(hash);
      onOpen();
    } catch (e) {
      console.error(e);
    } finally {
      setPak(undefined);
      setIsProcessing(false);
    }
  };

  return (
    <Flex
      w={{ base: "full", lg: "90%" }}
      flexDirection="column"
      margin="50px auto"
    >
    
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="65px" mt="50px">
        {packages.map((pk, index) => (
          <InvestCard
            pak={pk}
            key={String(index)}
            isBuying={isProcessing && pak?.key === pk.key}
            rate={pk.token === TOKEN.ETH ? rate.ethRate : rate.usdtRate}
            walletInfo={wallet}
            onBuy={() => handleBuyIco(pk)}
          />
        ))}
      </SimpleGrid>

      <SuccessModal
        isOpen={open}
        onClose={onClose}
        hash={txhash}
        title="Buy Ico"
      />
    </Flex>
  );
}
