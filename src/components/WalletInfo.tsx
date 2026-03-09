import React from "react"
import { Button, HStack, Image, Text } from "@chakra-ui/react";
import { numberFormat, showSortAddress } from "@/utils";

interface IProps {
    address? : string;
    amount : number;
}

export default function WalletInfo({address, amount}: IProps) {
    return (
        <Button variant={"outline"} ml ="10px">
            <HStack>
                <Text>{showSortAddress(address)}</Text>
                <Image src='/eth.png' w="25px" alt="eth" ml="20px" />
                <Text>{numberFormat(amount)}</Text>
            </HStack>

        </Button>
    )
}