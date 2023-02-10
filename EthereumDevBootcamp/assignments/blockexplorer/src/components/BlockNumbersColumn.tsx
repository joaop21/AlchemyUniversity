import { useState } from "react";
import _ from "lodash";
import { useInterval } from "usehooks-ts";

import { alchemy } from "../providers";

type Props = {
  setBlockNumber: React.Dispatch<React.SetStateAction<number>>;
};

const BlockNumbersColumn = ({ setBlockNumber }: Props) => {
  const [blocks, setBlocks] = useState<number[]>([]);
  const [fetchCounter, setFetchCounter] = useState<number>(0);

  useInterval(
    async () => {
      setFetchCounter(fetchCounter + 1);

      const blockNumber = await alchemy.core.getBlockNumber();
      setBlocks(_.range(blockNumber, blockNumber - 10, -1));
    },
    fetchCounter == 0 ? 0 : 10000
  );

  return (
    <div>
      <ul>
        {blocks.map((block) => (
          <li key={block} onClick={() => setBlockNumber(block)}>
            {block}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockNumbersColumn;
