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
                <text>{showSortAddress(address)}</text>
                <Image src='/eth.png' w="25px" alt="eth" ml="20px" />
                <text>{numberFormat(amount)}</text>
            </HStack>

        </Button>
    )
}