import { useEffect, useState } from "react";
import type { Block } from "@ethersproject/abstract-provider";
import _ from "lodash";

import { alchemy } from "../providers";

type Props = {
  blockNumber: number;
  setTransaction: React.Dispatch<React.SetStateAction<string>>;
};

const BlockColumn = ({ blockNumber, setTransaction }: Props) => {
  const [block, setBlock] = useState<Block>({} as Block);

  useEffect(() => {
    async function getBlock() {
      setBlock(await alchemy.core.getBlock(blockNumber));
    }

    getBlock();
  }, [blockNumber]);

  return (
    <>
      <h1>Block: {blockNumber}</h1>
      {_(block)
        .toPairs()
        .map(([key, value]) => {
          return (
            <ul key={key}>
              <b>{key}</b>:
              {Array.isArray(value) ? (
                <ul>
                  {_.map(value, (tx) => (
                    <li
                      key={tx}
                      onClick={() => {
                        setTransaction(tx);
                      }}
                    >
                      {tx}
                    </li>
                  ))}
                </ul>
              ) : (
                value.toString()
              )}
            </ul>
          );
        })
        .value()}
    </>
  );
};

export default BlockColumn;
