// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts@4.7.0/access/Ownable.sol";

contract NFTOfTheDay is Ownable {

    struct NFTOfTheDayDetail {
        uint tokenId;
        string publicationId;
        string nftOftheDayPublicationId;
    }

    mapping(uint => NFTOfTheDayDetail) private dayToNFTOfTheDay;

    function setPublication(uint epochTimestamp, string memory publicationId) public onlyOwner {
        require(bytes(publicationId).length > 0, "Invalid lens publication id");

        require(bytes(dayToNFTOfTheDay[epochTimestamp].publicationId).length < 0, "Record already exists for the timestamp");

        NFTOfTheDayDetail memory NFTForDay;
        NFTForDay.tokenId = 0;
        NFTForDay.publicationId = publicationId;
        dayToNFTOfTheDay[epochTimestamp] = NFTForDay;
    }

    function setNFTOfTheDay(uint epochTimestamp, uint tokenId, string memory nftOftheDayPublicationId) public onlyOwner {
        require(tokenId > 0, "Invalid token id provided");
        require(bytes(dayToNFTOfTheDay[epochTimestamp].publicationId).length > 0, "Record does not exists for the timestamp");

        dayToNFTOfTheDay[epochTimestamp].tokenId = tokenId;
        dayToNFTOfTheDay[epochTimestamp].nftOftheDayPublicationId = nftOftheDayPublicationId;
    }

    function getPublicationIdForTimestamp(uint epochTimestamp) public view returns (string memory) {
        require(bytes(dayToNFTOfTheDay[epochTimestamp].publicationId).length > 0, "Record does not exists for the timestamp");

        return dayToNFTOfTheDay[epochTimestamp].publicationId;
    }

    function getNFTOfTheDayForTimestamp(uint epochTimestamp) public view returns (uint256) {
        require(dayToNFTOfTheDay[epochTimestamp].tokenId > 0, "Record does not exists for the timestamp");

        return dayToNFTOfTheDay[epochTimestamp].tokenId;
    }

    function getNFTOfTheDayPublicationForTimestamp(uint epochTimestamp) public view returns (string memory) {
        require(bytes(dayToNFTOfTheDay[epochTimestamp].nftOftheDayPublicationId).length > 0, "Record does not exists for the timestamp");

        return dayToNFTOfTheDay[epochTimestamp].nftOftheDayPublicationId;
    }
}