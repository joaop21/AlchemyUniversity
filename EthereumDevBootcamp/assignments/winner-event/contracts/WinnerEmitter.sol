// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IWinner {
    function attempt() external;
}

contract WinnerEmitter {
    constructor(address _winner) {
        IWinner(_winner).attempt();
        selfdestruct(payable(msg.sender));
    }
}
