import axios from 'axios';
import async from 'async';
import React, { Component } from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { Divider, FlatButton, CircularProgress, DropDownMenu, MenuItem, Paper, RaisedButton, Toggle, TextField } from 'material-ui';
import { grey900, grey500, grey300, grey100, blue500 } from 'material-ui/styles/colors';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import { abi as registryABI } from '../RegistryABI.json';
import { abi as factoryABI } from '../FactoryABI.json';

const paperStyle = {
  height: 'inherit',
  'max-height': 300,
  'margin-bottom': 20,
  width: '100%',
  padding: 10,
  'word-wrap': 'break-word',
  textAlign: 'center',
};

class SearchTokenFactory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractAddress: props.match.params.contractAddress,
      loading: true,
      metadata: []
    };
  }

  render() {
    if(this && this.state.loading) {
      return <form className="SearchTokenFactoryResults">
        <CircularProgress className="justify-center" size={60} thickness={7} />
      </form>
    } else {
      return (
        <span>
        <div className="SearchTokenFactoryResults">
          <h1 style={{ color: grey100 }}>{this.state.contractAddress}</h1>
          <div className="SearchTokenFactoryResults-list">
            {this.state.metadata.map(tile => (
              <Paper style={paperStyle} zDepth={3} className="last-child-margin-bottom" >
                <p>{tile.description}</p>
                {/* <p>{tile.image}</p> */}
                <img style={{ 'max-width': 180, 'margin-top': 5 }} src={tile.image} />
              </Paper>
            ))}
          </div>
        </div>
        <Link to="/" style="">
          <FlatButton
            className="button-lg"
            target="_blank"
            primary={true}
            backgroundColor={grey100}
            disableTouchRipple={true}
            label="Mint"
            style={{ margin: '20px', color: grey900 }}
          />
        </Link>
        </span>
        // <img src={this.state.metadata[0].image} />
      );
    }
  }

  componentDidMount() {
    const MyContract = new window.web3.eth.Contract(factoryABI, '0x0ca098bb44a6e97da20355aa5481e53bcef402f5');

    window.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        //handle
        return;
      }

      MyContract.methods.getLastCreated().call({ from: accounts[0] }, (err, lastCreated) => {
        const FactoryContract = new window.web3.eth.Contract(registryABI, lastCreated);

        FactoryContract.methods.totalSupply().call({ from: accounts[0] }, (err, currentSupply) => {
          debugger;
          if (error) {
            //handle
            return;
          }
          debugger;
          async.times(currentSupply, (i, callback) => {
            MyContract.methods.getMetadataAtID(i).send({ from: accounts[0] }, (error, url) => {
              if (error) {
                // handle
                return;
              }
              // axios.get(url)
              //1. fetch data at url
              //2. put description and image in view
              callback(null, url);
            });
          }, (err, results) => {
            this.setState({
              metadata: results
            });
            this.toggleLoading();
          });
        });
      });
    });
  }

  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }
}

export default SearchTokenFactory;
