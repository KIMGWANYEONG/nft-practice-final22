// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintNft is ERC721Enumerable {
    mapping(uint => string) metadataUri;
    mapping(uint => uint) voting;

   

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }

    function mintNft(string memory _metadataUri) public {

        uint tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        metadataUri[tokenId] = _metadataUri;
    }

    function tokenURI(uint _tokenId) public view override returns (string memory) {
        return metadataUri[_tokenId];
        }

        function vote(uint _tokenId) public {
            voting[_tokenId]++;
        }
        function checkvote(uint _tokenId) public view returns (uint) {
            return voting[_tokenId];
        }   
    }
