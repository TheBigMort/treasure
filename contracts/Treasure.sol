// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./ERC721Enum.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interfaces/ITreasure.sol";

/**
 * @title Treasure (for Warriors) minting contract
 * @author Maxwell J. Rux
 */
contract Treasure is
    ERC721Enum,
    Ownable,
    ReentrancyGuard,
    PaymentSplitter,
    ITreasure
{
    using Counters for Counters.Counter;
    using Strings for uint256;

    string private _uri;
    string private _contractURI;
    uint256 private constant PRICE = 0.0420 ether;
    uint256 private constant MAX_SUPPLY = 10000;
    uint256 private constant MAX_MULTIMINT = 25;
    uint256 private constant MAX_RESERVE = 100;

    // number of NFTs in reserve that have already been minted
    Counters.Counter private _reserved;

    bool private _status = false;

    constructor(
        string memory __uri,
        address[] memory payees,
        uint256[] memory shares,
        string memory _name,
        string memory _symbol
    ) ERC721M(_name, _symbol) PaymentSplitter(payees, shares) {
        _uri = __uri;
    }

    function plunder(uint256 numMints) external payable override nonReentrant {
        require(_status, "Sale is paused");
        require(msg.value >= price() * numMints, "Not enough ether sent");
        require(
            totalSupply() + numMints <= MAX_SUPPLY,
            "New mint exceeds maximum supply"
        );
        require(
            totalSupply() + numMints <=
                MAX_SUPPLY - MAX_RESERVE + _reserved.current(),
            "New mint exceeds maximum available supply"
        );
        require(numMints <= MAX_MULTIMINT, "Exceeds max mints per transaction");

        uint256 tokenIndex = totalSupply();
        for (uint256 i = 0; i < numMints; ++i) {
            _safeMint(msg.sender, tokenIndex + i);
        }
        delete tokenIndex;
    }

    function mintReserveToAddress(uint256 numMints, address recipient)
        external
        onlyOwner
    {
        require(
            totalSupply() + numMints <= MAX_SUPPLY,
            "New mint exceeds maximum supply"
        );
        require(
            _reserved.current() + numMints <= MAX_RESERVE,
            "New mint exceeds reserve supply"
        );
        uint256 tokenIndex = totalSupply();
        for (uint256 i = 0; i < numMints; ++i) {
            _reserved.increment();
            _safeMint(recipient, tokenIndex + i);
        }
        delete tokenIndex;
    }

    function mintReserve(uint256 numMints) external onlyOwner {
        require(
            totalSupply() + numMints <= MAX_SUPPLY,
            "New mint exceeds maximum supply"
        );
        require(
            _reserved.current() + numMints <= MAX_RESERVE,
            "New mint exceeds reserve supply"
        );
        uint256 tokenIndex = totalSupply();
        for (uint256 i = 0; i < numMints; ++i) {
            _reserved.increment();
            _safeMint(msg.sender, tokenIndex + i);
        }
        delete tokenIndex;
    }

    function setBaseURI(string memory __uri) external onlyOwner {
        _uri = __uri;
    }

    function flipSaleState() external onlyOwner {
        _status = !_status;
    }

    function setContractURI(string memory __contractURI) external onlyOwner {
        _contractURI = __contractURI;
    }

    function status() public view override returns (bool) {
        return _status;
    }

    function contractURI() public view override returns (string memory) {
        return _contractURI;
    }

    function reserved() public view override returns (uint256) {
        return _reserved.current();
    }

    function baseURI() public view override returns (string memory) {
        return _uri;
    }

    function price() public pure override returns (uint256) {
        return PRICE;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _uri;
    }
}
