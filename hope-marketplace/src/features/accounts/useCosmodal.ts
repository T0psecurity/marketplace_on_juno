import { coin } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AccountType, setKeplrAccount } from "../accounts/accountsSlice";
import { Keplr } from "@keplr-wallet/types";
import { KeplrWalletConnectV1, useWalletManager } from "cosmodal";

// let savedWallet: Keplr | KeplrWalletConnectV1;

export function useCosmodal(): {
  connect: () => Promise<void>;
} {
  const config = useAppSelector((state) => state.connection.config);
  const { getWallet } = useWalletManager();
  const dispatch = useAppDispatch();

  const connect = useCallback(async () => {
    const wallet: Keplr | KeplrWalletConnectV1 = await getWallet();
    await wallet.enable([config.chainId]);
    const { name: label, bech32Address: address } = await wallet.getKey(
      config.chainId
    );

    dispatch(
      setKeplrAccount({
        label,
        address,
        type: AccountType.Keplr,
        balance: coin(0, config["microDenom"]),
      })
    );
  }, [config, getWallet, dispatch]);
  return { connect };
}
