import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { coins } from "@cosmjs/proto-signing";
import {
  useWallet,
  // useWalletManager
} from "@noahsaso/cosmodal";
import { useCallback } from "react";
import { useSelector } from "react-redux";
// import {
//   // useAppSelector
// } from "../app/hooks";
// import Collections, {
//   MarketplaceContracts,
//   MarketplaceInfo,
//   MintContracts,
// } from "../constants/Collections";
// import {
//   importContract,
//   // contractAccounts,
//   // deleteAccount,
// } from "../features/accounts/accountsSlice";
import connectionManager from "../features/connection/connectionManager";
import { toMicroAmount } from "../util/coins";
import { TokenStatus, TokenType } from "../types/tokens";
import { ChainConfigs, ChainTypes } from "../constants/ChainTypes";

// type TokenContractType = {
//   [key in TokenType]: string;
// };

// interface ContractAddressesType extends TokenContractType {
interface ContractAddressesType {
  MINT_CONTRACT: string;
}

export const contractAddresses: ContractAddressesType = {
  MINT_CONTRACT:
    // "juno1u230upl8ut7vn8uyk7hd9ac2ygwrvk5jygsjzv838hkn2u4xj34slyg2qy",
    "juno17kr4uahqlz8hl8nucx82q4vmlj7lrzzlz0yr0ax9hejaevw6ewqsf8p5ux",
  // [TokenType.JUNO]: "",
  // [TokenType.HOPE]:
  //   // "juno1ckulym5ufeu29kqcqn0pw7qfavdmup9a9kwt9uzgt4arkq84qetssd9ltl",
  //   "juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z",
  // [TokenType.RAW]:
  //   "juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g",
  // [TokenType.NETA]:
  //   "juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr",
};

const useContract = () => {
  // const contracts = useAppSelector(contractAccounts);
  // const { connect } = useWalletManager();

  const state = useSelector((state: any) => state);
  const { offlineSigner, signingCosmWasmClient } = useWallet(
    ChainConfigs[ChainTypes.JUNO].chainId
  );

  // const initContracts = useCallback(() => {
  //   // remove existing contracts
  //   // if (contracts.length) {
  //   //   for (let i = 0; i < contracts.length; i++) {
  //   //     const contract = contracts[i];
  //   //     dispatch(deleteAccount(contract.address));
  //   //   }
  //   // }

  //   // import target contracts
  //   let targetContractAddresses: string[] = [];
  //   Object.keys(contractAddresses).forEach((key: string) => {
  //     targetContractAddresses.push(
  //       contractAddresses[key as keyof ContractAddressesType]
  //     );
  //   });
  //   Collections.forEach((collection: MarketplaceInfo) => {
  //     if (collection.nftContract)
  //       targetContractAddresses.push(collection.nftContract);
  //     if (collection.mintContract)
  //       targetContractAddresses.push(collection.mintContract);
  //     if (collection.marketplaceContract.length)
  //       collection.marketplaceContract.forEach((contract: string) => {
  //         if (contract) targetContractAddresses.push(contract);
  //       });
  //   });
  //   MarketplaceContracts.forEach((contract: string) =>
  //     targetContractAddresses.push(contract)
  //   );
  //   MintContracts.forEach((contract: string) =>
  //     targetContractAddresses.push(contract)
  //   );

  //   dispatch(importContract(targetContractAddresses));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Collections]);

  const runQuery = useCallback(
    // async (contractAddress: string, queryMsg: any) => {
    async (contractAddress: string, queryMsg: any) => {
      // const contract = state.accounts.accountList[contractAddress];
      // const contract = state.accounts.accountList[contractAddress];
      // if (!contract) {
      //   if (contractAddress) dispatch(importContract([contractAddress]));
      //   console.error("contract selection error", contractAddress);
      //   throw new Error("No contract selected");
      // }
      if (signingCosmWasmClient) {
        const result = await signingCosmWasmClient?.queryContractSmart(
          // contract.address,
          contractAddress,
          queryMsg
        );
        return result;
      } else {
        const client = await connectionManager.getQueryClient(
          ChainConfigs[ChainTypes.JUNO]
        );
        const result = await client.queryContractSmart(
          contractAddress,
          queryMsg
        );
        return result;
      }
    },
    [signingCosmWasmClient]
  );

  const runExecute = useCallback(
    async (
      contractAddress: string,
      executeMsg: any,
      option?: {
        memo?: string;
        funds?: string;
      }
    ) => {
      if (!offlineSigner) {
        // connect();
        throw new Error("No account selected");
      }
      // const contract = state.accounts.accountList[contractAddress];
      const account = state.accounts.keplrAccount;
      // if (!contract) {
      //   if (contractAddress) dispatch(importContract([contractAddress]));
      //   console.error("contract selection error");
      //   throw new Error("No contract selected");
      // }

      // const client = await connectionManager.getSigningClient(
      //   account,
      //   state.connection.config
      // );

      const executeOptions = state.console.executeOptions;
      const executeMemo = option?.memo ?? executeOptions?.memo;
      const executeFunds = option?.funds ?? executeOptions?.funds;

      // --mobile connection
      // const { client } = connectedWallet;
      // const offlineSigner =
      //   client instanceof KeplrWalletConnectV1
      //     ? await client.getOfflineSignerOnlyAmino(config.chainId)
      //     : await client.getOfflineSignerAuto(config.chainId);
      const config = ChainConfigs[ChainTypes.JUNO];

      const cwClient = await SigningCosmWasmClient.connectWithSigner(
        config["rpcEndpoint"],
        offlineSigner,
        {
          gasPrice: GasPrice.fromString(
            `${config["gasPrice"]}${config["microDenom"]}`
          ),
        }
      );

      // return client.execute(
      //   account.address,
      //   contract.address,
      //   executeMsg,
      //   "auto",
      //   executeMemo,
      //   executeFunds
      //     ? coins(
      //         toMicroAmount(
      //           executeFunds,
      //           state.connection.config["coinDecimals"]
      //         ),
      //         state.connection.config["microDenom"]
      //       )
      //     : undefined
      // );
      return cwClient.execute(
        account.address,
        // contract.address,
        contractAddress,
        executeMsg,
        "auto",
        executeMemo,
        executeFunds
          ? coins(
              toMicroAmount(
                executeFunds,
                ChainConfigs[ChainTypes.JUNO]["coinDecimals"]
              ),
              ChainConfigs[ChainTypes.JUNO]["microDenom"]
            )
          : undefined
      );
    },
    [state, offlineSigner]
  );

  const getBalances = useCallback(async () => {
    if (!offlineSigner) return {};
    const account = state.accounts.keplrAccount;
    const config = ChainConfigs[ChainTypes.JUNO];

    const cwClient = await SigningCosmWasmClient.connectWithSigner(
      config["rpcEndpoint"],
      offlineSigner,
      {
        gasPrice: GasPrice.fromString(
          `${config["gasPrice"]}${config["microDenom"]}`
        ),
      }
    );
    const denoms: { denom: TokenType; isNativeCoin: boolean }[] = [];
    const queries = (
      Object.keys(TokenType) as Array<keyof typeof TokenType>
    ).map((key) => {
      const tokenStatus = TokenStatus[TokenType[key]];
      denoms.push({
        denom: TokenType[key],
        isNativeCoin: tokenStatus.isNativeCoin,
      });
      return !tokenStatus.isNativeCoin && tokenStatus.contractAddress
        ? runQuery(tokenStatus.contractAddress, {
            balance: { address: account.address },
          })
        : cwClient.getBalance(account.address, TokenType[key]);
    });
    return await Promise.all(queries)
      .then((results: any) => {
        let returnValue: { [key in TokenType]: any } = {} as {
          [key in TokenType]: any;
        };
        denoms.forEach(
          (
            denom: { denom: TokenType; isNativeCoin: boolean },
            index: number
          ) => {
            const crrResult = results[index];
            returnValue[denom.denom] = {
              denom: denom.denom,
              amount: Number(
                denom.isNativeCoin ? crrResult.amount : crrResult.balance
              ),
            };
          }
        );
        return returnValue;
      })
      .catch((err: any) => {
        console.error(err);
        return {};
      });
  }, [offlineSigner, runQuery, state.accounts.keplrAccount]);

  return {
    // initContracts,
    getBalances,
    runQuery,
    runExecute,
  };
};

export default useContract;
