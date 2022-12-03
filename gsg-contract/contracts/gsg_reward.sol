// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";

contract GSGReward is Ownable {
    event Stake(
        address indexed _admin,
        uint256 _quizzid,
        uint256 _amountstaked
    );

    event Distribute(
        uint256 _quizzid,
        address[] winnersList,
        string indexed ipfshash
    );

    // admin address to quizzId
    mapping(address => uint256) public _quizzId;
    mapping(uint256 => address) public _quizzAdmin;
    // quizzid to noOfWinners
    mapping(uint256 => uint256) public _noofwinners;
    // quizzId to winnersIPFSHASH
    mapping(uint256 => string) public _winners;
    // quizzid, _quizzAdmin, amount
    mapping(uint256 => mapping(address => uint256)) public _stakeamount;

    // quizzid to boolean is done or not
    mapping(uint256 => bool) public _isdone;

    function stakeAmount(uint256 quizzId, uint256 winners) external payable {
        _quizzId[msg.sender] = quizzId;
        _quizzAdmin[quizzId] = msg.sender;
        _stakeamount[quizzId][msg.sender] = msg.value;
        _noofwinners[quizzId] = winners;
        emit Stake(msg.sender, quizzId, msg.value);
    }

    function distribute(
        uint256 quizzId,
        address[] memory winnersList,
        string memory winnersHash
    ) public {
        require(!_isdone[quizzId], "Already distributed");
        uint256 __amount = _stakeamount[quizzId][_quizzAdmin[quizzId]] /
            _noofwinners[quizzId];
        for (uint256 i = 0; i < _noofwinners[quizzId]; i++) {
            address payable receiver = payable(winnersList[i]);
            sendViaTransfer(receiver, __amount);
        }
        _winners[quizzId] = winnersHash;
        _isdone[quizzId] = true;
        emit Distribute(quizzId, winnersList, winnersHash);
    }

    function sendViaTransfer(address payable _to, uint256 _amount) internal {
        _to.transfer(_amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // temp as of now for testnet amount removed once its went to live
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    receive() external payable {}

    fallback() external payable {}
}
