import axios from 'axios';
import request from 'request';
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
                <img style={{ 'max-width': 180, 'margin-top': 5 }} src={tile.url} />
              </Paper>
            ))}
          </div>
        </div>
        <Link to={{
          pathname: "/mint",
          state: { ...this.state }
        }}>
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
    const FactoryContract = new window.web3.eth.Contract(factoryABI, '0xb33dfc1a9544a952e5e1a98fca1c346f0e5cd29a');

    window.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        //handle
        return;
      }

      FactoryContract.methods.getLastCreated().call({ from: accounts[0] }, (err, lastCreated) => {
        const RegistryContract = new window.web3.eth.Contract(registryABI, lastCreated);

        RegistryContract.methods.totalSupply().call({ from: accounts[0] }, (err, currentSupply) => {
          if (error) {
            //handle
            return;
          }
          async.times(currentSupply, (i, callback) => {
            RegistryContract.methods.getMetadataAtID(i).call({ from: accounts[0] }, (error, url) => {
              if (error) {
                // handle
                return;
              }
              request({ url, method: 'GET' }, (err, resp, body) => {
                callback(err, JSON.parse(body));
              });
              //1. fetch data at url
              //2. put description and image in view
            });
          }, (err, results) => {
            debugger;
            this.setState({
              metadata: results.map(({ Description, Url }) => ({ description: Description, url: `http://159.65.76.159:8080/${Url}`})),
              contractAddress: lastCreated
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
