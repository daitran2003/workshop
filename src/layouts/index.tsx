declare var window: any;

import { ConnectWallet, WalletInfo } from "@/components";
import { menus } from "@/constants";
import { setWalletInfo, setWeb3Provider } from "@/reduxs/accounts/account.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { ethers } from "ethers";

interface IProps {
  children: ReactNode;
}

export default function MainLayout({ children }: IProps) {
  const dispatch = useAppDispatch();
  const { wallet } = useAppSelector((state) => state.account);

  const onConnectMetamask = async () => {
    if (!window.ethereum) {
      alert("Metamask not installed");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();

      const address = await signer.getAddress();

      const balance = await provider.getBalance(address);

      const ethBalance = Number.parseFloat(
        ethers.formatEther(balance)
      );

      dispatch(setWalletInfo({ address, eth: ethBalance }));
      dispatch(setWeb3Provider(provider));

    } catch (error) {
      console.error("Connect wallet error:", error);
    }
  };

  return (
    <Flex
      w={{ base: "full", lg: "70%" }}
      flexDirection="column"
      margin="50px auto"
    >
      <Flex w="full" alignItems="center" justifyContent="center">
        <Heading size="xl" fontWeight="bold">
          Blockchain Trainee
        </Heading>

        <Spacer />

        {menus.map((menu) => (
          <Link href={menu.url} key={menu.url}>
            <Text mx="20px" fontSize="20px">
              {menu.name}
            </Text>
          </Link>
        ))}
      {!wallet && (
        <ConnectWallet
          onClick={onConnectMetamask}
        />
      )}
    
      {wallet && (
        <WalletInfo
          address={wallet?.address}
          amount={wallet?.eth || 0}
        />
      )}
</Flex>
      <Flex w="full" flexDirection="column" py="50px">
        {children}
      </Flex>
    </Flex>
  );
}