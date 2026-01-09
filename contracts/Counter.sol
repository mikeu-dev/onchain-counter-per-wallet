// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Counter
 * @dev Smart contract yang menyimpan counter untuk setiap wallet address
 * @notice Setiap address memiliki counter pribadi yang dapat di-increment atau decrement
 */
contract Counter {
    // Mapping untuk menyimpan counter setiap address
    mapping(address => uint256) private counters;

    // Event yang di-emit ketika counter berubah
    event CounterChanged(address indexed user, uint256 newValue);

    /**
     * @dev Increment counter untuk msg.sender sebesar 1
     * @notice Menambah nilai counter Anda sebesar 1
     */
    function increment() external {
        counters[msg.sender] += 1;
        emit CounterChanged(msg.sender, counters[msg.sender]);
    }

    /**
     * @dev Decrement counter untuk msg.sender sebesar 1
     * @notice Mengurangi nilai counter Anda sebesar 1
     * @custom:requirement Counter harus lebih besar dari 0
     */
    function decrement() external {
        require(counters[msg.sender] > 0, "Counter cannot go below zero");
        counters[msg.sender] -= 1;
        emit CounterChanged(msg.sender, counters[msg.sender]);
    }

    /**
     * @dev Mendapatkan nilai counter dari address tertentu
     * @param user Address yang ingin dicek counter-nya
     * @return Nilai counter dari address tersebut
     */
    function getCounter(address user) external view returns (uint256) {
        return counters[user];
    }

    /**
     * @dev Mendapatkan nilai counter dari msg.sender
     * @return Nilai counter Anda saat ini
     */
    function getMyCounter() external view returns (uint256) {
        return counters[msg.sender];
    }

    /**
     * @dev Reset counter ke 0 (optional feature)
     * @notice Mengatur ulang counter Anda ke 0
     */
    function reset() external {
        counters[msg.sender] = 0;
        emit CounterChanged(msg.sender, 0);
    }

    /**
     * @dev Set counter ke nilai tertentu (optional feature)
     * @param value Nilai baru untuk counter
     * @notice Mengatur counter Anda ke nilai tertentu
     */
    function setCounter(uint256 value) external {
        counters[msg.sender] = value;
        emit CounterChanged(msg.sender, value);
    }
}
