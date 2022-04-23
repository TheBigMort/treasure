// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Randoms {
    constructor() {}

    function rand1(uint256 number) public view returns (uint256) {
        return uint256(blockhash(block.number - 1)) % number;
    }

    function rand2(uint256 number) public view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % number;
    }

    function arrSum(uint256[] memory arr) private pure returns (uint256 sum) {
        sum = 0;
        for (uint256 i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
    }

    function weightedRandom(string[] memory arr, uint256[] memory weights)
        public
        view
        returns (string memory)
    {
        require(arr.length == weights.length, "lengths dont match");
        uint256 sum = arrSum(weights);
        uint256 target = rand1(sum);
        uint256 total = 0;
        for (uint256 i = 0; i < weights.length; i++) {
            total += weights[i];
            if (target <= total) {
                return arr[i];
            }
        }
    }
}
