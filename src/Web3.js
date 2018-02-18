import Web3 from 'web3';
import promisify from 'es6-promisify';

class WrappedWeb3 extends Web3 {
  constructor(props) {
    super(props);
    this.network = props.network;
  }

  get network() {
    return this._network;
  }

  set network(network) {
    this._network = network;
    this.web3 = new Web3(new Web3(window.web3.currentProvider));
    this.attachToWindow(this.web3);
  }

  attachToWindow() {
    window.web3 = this.web3;
  }

  getAddresses() {
    return this.web3.eth.accounts;
  }

  async getAddressBalance(address) {
    const balanceInWeiBN = await promisify(this.web3.eth.getBalance)(address);
    const balanceInEtherBN = this.web3.fromWei(balanceInWeiBN, 'ether');

    const balanceInEther = WrappedWeb3.resolveBigNumber(balanceInEtherBN);

    return balanceInEther;
  }

  getTransaction(address, callback) {
    this.web3.eth.getTransaction(address, callback);
  }

  static resolveBigNumber = ({ c, e, s }) => {
    if (e < 0 && c.length === 1) {
      return Number(`.${c[0]}`);
    } else {
      return Number(c.join('.'));
    }
  }
}

const wrappedWeb3 = new WrappedWeb3({
  network: 'rinkeby'
});

export default wrappedWeb3;

// store.subscribe(() => {

// });

// if (window.web3) {
//   web3 = new Web3(window.web3.currentProvider);
// } else {
//   web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
// }
