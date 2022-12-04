import { BigInt, log } from "@graphprotocol/graph-ts"

import { Transaction, UserAccount } from "../generated/schema"
import { Approval as ApprovalEvent, Transfer as TransferEvent } from "../generated/TetherToken/TetherToken"
import * as constants from "../util/constants"

export function handleStake(event: ApprovalEvent): void {

    log.info("handleApprovalEvent -{}- {}- {}- {}", [event.transaction.hash.toHexString(),event.params.owner.toHexString(), event.params.spender.toHexString(),event.params.value.toString()] );

    let txn = new  Transaction(event.transaction.hash.toHexString())


    txn.from = event.params.owner.toHexString()

    txn.to = event.params.spender.toHexString()
    txn.value = event.params.value
    txn.tokenType = constants.ERC20
    txn.transactionType = constants.APPROVAL;
    txn.network = constants.MAINNET
    txn.save()


    const id = event.params.owner.toHexString();
    let userAccount = UserAccount.load(id)
    if (!userAccount) {
        userAccount = new UserAccount(id)
        userAccount.address = event.params.owner.toHexString();
    }
    userAccount.transaction = [txn.id]
    userAccount.save()
}

export function handleDistribute(event: TransferEvent): void {
    log.info("handleTransfer -{}- {}- {}- {}", [event.transaction.hash.toHexString(),event.params.from.toHexString(), event.params.to.toHexString(),event.params.value.toString()] );
    let txn = new  Transaction(event.transaction.hash.toHexString())
    txn.from = event.params.from.toHexString()

    txn.to = event.params.to.toHexString()
    txn.value = event.params.value
    txn.tokenType = constants.ERC20
    txn.transactionType = constants.TRANSFER;
    txn.network = constants.MAINNET
    txn.save()

    const id = event.params.from.toHexString();
    let userAccount = UserAccount.load(id)
    if (!userAccount) {
        userAccount = new UserAccount(id)
        userAccount.address = event.params.from.toHexString();
    }
    userAccount.transaction = [txn.id]
    userAccount.save()

}

