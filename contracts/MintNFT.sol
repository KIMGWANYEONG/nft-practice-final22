// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintNft is ERC721Enumerable {
    mapping(uint => string) metadataUri;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }

    function mintNft(string memory _metadataUri) public  {
        require(_tokenId < 17, "Not exist token.");

        _mint(msg.sender, _tokenId, _amount, "");

        metadataUri[tokenId] = _metadataUri;
    }

    function tokenURI(uint _tokenId) public view override returns (string memory) {
        return metadataUri[_tokenId];
    }
       function uri(uint _tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(metadataUri, Strings.toString(_tokenId), ".json"));
    }

    function balanceOfNfts(address _owner) public view returns (uint[16] memory) {
        uint[16] memory result;

        for(uint i = 0; i < 16; i++) {
            result[i] = balanceOf(_owner, i + 1);
        }

        return result;
    }
}
