import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface IProps extends ButtonProps {}

export default function ConnectWallet(props: IProps) {
  return (
    <Button variant="solid" {...props}>
      Connect wallet
    </Button>
  );
}