import { useEffect, useState } from "react";
import type { TransactionResponse } from "@ethersproject/abstract-provider";
import _, { values } from "lodash";

import { alchemy } from "../providers";

type Props = {
  transaction: string;
};

const TransactionColumn = ({ transaction: transactionHash }: Props) => {
  const [transaction, setTransaction] = useState<TransactionResponse | null>(
    {} as TransactionResponse
  );
  useEffect(() => {
    async function getTransaction() {
      setTransaction(await alchemy.core.getTransaction(transactionHash));
    }

    getTransaction();
  }, [transactionHash]);

  return (
    <ul>
      {_(transaction)
        .toPairs()
        .map(([key, value]) =>
          !!value ? (
            <li key={key}>
              <b>{key}:</b> {value.toString()}
            </li>
          ) : (
            <></>
          )
        )
        .value()}
    </ul>
  );
};

export default TransactionColumn;
