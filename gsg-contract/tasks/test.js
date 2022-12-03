const { ethers } = require("ethers");


const provider = "https://wallaby.node.glif.io/rpc/v0";


async function main() {
    const provider = new ethers.providers.getDefaultProvider(provider)

    console.log(provider)

    const contract = new ethers.Contract("",)

}

main()
