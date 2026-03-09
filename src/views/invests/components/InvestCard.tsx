import React from "react";
import { Box, Image, Text, Button, HStack, Spinner } from "@chakra-ui/react";
import { IPackage, IWalletInfo } from "@/_types_";
import { numberFormat } from "@/utils";

interface IProps {
  pak: IPackage;
  isBuying: boolean;
  rate: number;
  walletInfo?: IWalletInfo;
  onBuy?: () => void;
}

export default function InvestCard({
  pak,
  isBuying,
  rate,
  walletInfo,
  onBuy
}: IProps) {
  
  return (
    <Box
      w="290px"
      bg="bg.secondary"
      borderRadius="16px"
      overflow="hidden"
      padding="10px"
      border="1px solid rgba(254, 223, 86, 0.6)"
      alignItems="center"
      display="flex"
      flexDirection="column"
    >
      {/* Background image */}
      <Box
        bgImage={`url('/${pak?.bg }')`}
        w="275px"
        h="150px"
        borderRadius="16px"
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
      />

      {/* Icon */}
      <Box
        w="120px"
        h="100px"
        mx="auto"
        borderRadius="full"
        mt="-50px"
        position="relative"
        mr="62px"
      >
        <Image
          src={`/${pak?.icon || "default-icon.png"}`}
          alt={pak?.name || "Package icon"}
          w="100px"
          h="100px"
          borderRadius="full"
          objectFit="cover"
          border="5px solid rgba(254, 223, 86, 0.6)"
        />
        <Image
          src="/verified.svg"
          w="25px"
          alt="verified"
          position="absolute"
          bottom="0px"
          right="20px"
        />
      </Box>

      {/* Name */}
      <Text my="20px" fontSize="24px" fontWeight="bold">
        {pak.name}
      </Text>
        
  
  <Button
    //  disabled
      variant="ghost"
      my="10px"
      bg="#3A3A3A"
      border="1px solid #fff"
      color="rgba(255,255,255,0.7)"
  >
    {numberFormat(pak.amount)} IPT
  </Button>
      
      <HStack my="15px">
        <Text color= "gray">Amount of coins to pay: </Text>
        <Text fontSize="16px">
       {numberFormat(pak.amount / rate)} {pak.token}
        </Text>
      </HStack>
      <Button w="full" variant="solid" disabled={!walletInfo?.address || isBuying} onClick = {onBuy}>
      {isBuying ? <Spinner></Spinner> : 'Buy Now'}
      </Button>
    </Box>
  );
}