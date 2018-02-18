import async from 'async';
import React, { Component } from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { CircularProgress, DropDownMenu, MenuItem, RaisedButton, Toggle, TextField } from 'material-ui';
import { grey900, grey500, grey300, grey100, blue500 } from 'material-ui/styles/colors';

class MintToken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractAddress: props.location.state.contractAddress,
      metadataURL: ''
    };
  }

  render() {
    if(this && this.state.loading) {
      return <form className="MintToken-form">
        <CircularProgress className="justify-center" size={60} thickness={7} />
      </form>
    } else {
      return (
        <form className="MintToken-form">
          <TextField className="justify-center full-width" name="metadataURL" floatingLabelText="Metadata URL" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.metadataURL} onChange={this.handleMetadataURLChange.bind(this)} />
          <Link to={{
            pathname: `/mint/results`,
            state: { ...this.state }
          }}>
            <RaisedButton className="justify-center buffer-top-lg full-width button-lg" disableTouchRipple={true} buttonStyle={{ color: '#212121' }} label="Mint" primary={true} />
          </Link>
        </form>
      );
    }
  }

  handleMetadataURLChange(e, value) {
    this.setState({ metadataURL: value });
  }

  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }
}

export default MintToken;
