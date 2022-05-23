const SHA256 = require('crypto-js/sha256');

//STEP1: Transaction　クラスの作成

//STEP2: senderAddress, recipientAddress, amountの3つをコンストラクタとして記述







class Block {
    constructor(timestamp, data, previousHash) {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        ).toString();
    }

    mineBlock() {
        while (this.hash.substring(0, 2) !== '00') {
            this.nonce++;
            this.hash = this.calculateHash();
            console.log(this.hash);
        }
        console.log("ブロックがマイニングされました：" + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block("05/02/2019", "GenesisBlock", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.mineBlock();
        this.chain.push(newBlock);
    }

    isChainVaild() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let originalCoin = new Blockchain();

console.log('2番目のブロックをマイニング....')
originalCoin.addBlock(new Block("06/02/2019", { SendCoinToA: 3 }));

console.log('3番目のブロックをマイニング....')
originalCoin.addBlock(new Block("07/03/2019", { SendCoinToB: 8 }));

console.log(JSON.stringify(originalCoin, null, 2));


