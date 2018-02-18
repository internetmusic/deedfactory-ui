import async from 'async';
import React, { Component } from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { CircularProgress, DropDownMenu, MenuItem, RaisedButton, Toggle, TextField } from 'material-ui';
import { grey900, grey500, grey300, grey100, blue500 } from 'material-ui/styles/colors';

class SearchTokenFactory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractAddress: '',
    };
  }

  render() {
    if(this && this.state.loading) {
      return <form className="CreateTokenFactory-form">
        <CircularProgress className="justify-center" size={60} thickness={7} />
      </form>
    } else {
      return (
        <form className="SearchTokenFactory-form">
          <TextField className="justify-center full-width" name="contractAddress" floatingLabelText="Contract Address" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.contractAddress} onChange={this.handleContractAddressChange.bind(this)} />
          <Link to={`/search/${this.state.contractAddress}`}>
            <RaisedButton className="justify-center buffer-top-lg full-width button-lg" disableTouchRipple={true} buttonStyle={{ color: '#212121' }} label="Search" primary={true} />
          </Link>
        </form>
      );
    }
  }

  handleContractAddressChange(e, value) {
    this.setState({ contractAddress: value });
  }

  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }
}

export default SearchTokenFactory;
