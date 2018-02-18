import async from 'async';
import React, { Component } from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { Card, CircularProgress, DropDownMenu, MenuItem, RaisedButton, Paper, Toggle, TextField } from 'material-ui';
import { grey900, grey500, grey300, grey100, blue500, green500 } from 'material-ui/styles/colors';

import { abi } from '../RegistryABI.json';
import { abi as factoryABI } from '../FactoryABI.json';

import ethJsUtil from 'ethereumjs-util';

const paperStyle = {
  height: 'inherit',
  width: '100%',
  'word-wrap': 'break-word',
  textAlign: 'center',
  display: 'grid',
  padding: 8,
  'grid-template-rows': '50% 25% 25%',
  overflow: 'contain'
};

class MintTokenResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractAddress: props.location.state.contractAddress,
      metadataURL: props.location.state.metadataURL,
      loading: true
    };
  }

  render() {
    if(this && this.state.loading) {
      return <form className="MintTokenResults">
        <CircularProgress className="justify-center" size={60} thickness={7} />
      </form>
    } else {
      return (
        <div className="MintTokenResults">
          <Paper style={paperStyle} zDepth={3} >
            <i className="fa fa-5x fa-check-circle justify-center" style={{ color: green500 }} />
            <p className="break-word justify-center">{this.props.location.state.name} Tokens minted!</p>
            <span className="break-word justify-center">Transaction: <a href={`https://rinkeby.etherscan.io/tx/${this.state.registryContractAddress}`} /></span>
          </Paper>
        </div>
      );
    }
  }

  componentDidMount() {
    const MyContract = new window.web3.eth.Contract(abi, this.state.contractAddress);

    return window.web3.eth.getAccounts(async (error, accounts) => {
      if (error) {
        //handle
        return;
      }

      MyContract.methods.Mint(this.state.metadataURL).send({ from: accounts[0] }, (err, transaction) => {
        if (error) {
          //handle
          return;
        }
        var timer = setInterval(() => {
          window.web3.eth.getTransaction(transaction, (error, data) => {
            if (data && data.blockNumber) {
              this.toggleLoading();
              clearInterval(timer);
              window.location.href = "http://localhost:3000/search/results";
            }
          });
        }, 5000);
      });
    });
  }

  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }
}

export default MintTokenResults;
