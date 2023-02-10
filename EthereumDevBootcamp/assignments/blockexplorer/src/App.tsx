import { useState } from "react";
import BlockColumn from "./components/BlockColumn";
import BlockNumbersColumn from "./components/BlockNumbersColumn";
import TransactionColumn from "./components/TransactionColumn";

const App = () => {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [transaction, setTransaction] = useState<string>("");

  return (
    <div className="flex flex-row flex-col md:flex-row w-12/12 h-[80vh]">
      <div className="column-1 w-full md:w-2/12 h-full border-2 border-dashed md:mx-2 my-2 rounded-md">
        <BlockNumbersColumn setBlockNumber={setBlockNumber} />
      </div>
      <div className="column-2 w-full md:w-5/12 h-full border-2 border-dashed md:mx-2 my-2 rounded-md">
        <BlockColumn
          blockNumber={blockNumber}
          setTransaction={setTransaction}
        />
      </div>
      <div className="column-3 w-full md:w-5/12 h-full border-2 border-dashed md:mx-2 my-2 rounded-md">
        <TransactionColumn transaction={transaction} />
      </div>
    </div>
  );
};

export default App;
