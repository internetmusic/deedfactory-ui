import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router'
import { CircularProgress, DropDownMenu, MenuItem, RaisedButton, Toggle, TextField } from 'material-ui';
import { grey900, grey500, grey300, grey100, blue500 } from 'material-ui/styles/colors';

class CreateTokenFactory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      loading: false,
      mintable: true,
      name: '',
      symbol: '',
      initialSupply: ''
    };
  }

  render() {
    if(this && this.state.loading) {
      return <form className="CreateTokenFactory-form">
        <CircularProgress className="justify-center" size={60} thickness={7} />
      </form>
    } else {
      return <form className="CreateTokenFactory-form">
        <TextField className="justify-center full-width" name="name" floatingLabelText="Name" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        <TextField className="justify-center full-width" name="symbol" floatingLabelText="Symbol" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.symbol} onChange={this.handleSymbolChange.bind(this)} />
        <TextField className="justify-center full-width" name="description" floatingLabelText="Description" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />
        <TextField className="justify-center full-width" name="metadataURL" floatingLabelText="Metadata URL" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.metadataURL} onChange={this.handleMetadataURL.bind(this)} />
        <TextField className="justify-center full-width" name="initialSupply" floatingLabelText="Initial Supply" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.initialSupply} onChange={this.handleInitialSupplyChange.bind(this)} />
        <Toggle
          className="buffer-top-lg"
          label="Mintable"
          style={{ twidth: '100%', display: 'grid', 'grid-template-rows': '1fr 0', 'justify-content': 'center' }}
          labelStyle={{ color: grey300 }}
        />
        <RaisedButton className="justify-center buffer-top-lg button-lg full-width" disableTouchRipple={true} buttonStyle={{ color: '#212121' }} label="Create" primary={true} onClick={this.handleSubmit.bind(this)} />
      </form>
    }
  }

  handleMintableChange(e, i, value) {
    this.setState({ mintable: value });
  }

  handleNameChange(e, value) {
    this.setState({ name: value });
  }

  handleSymbolChange(e, value) {
    this.setState({ symbol: value });
  }

  handleDescriptionChange(e, value) {
    this.setState({ description: value });
  }

  handleMetadataURL(e, value) {
    this.setState({ metadataURL: value });
  }

  handleInitialSupplyChange(e, value) {
    this.setState({ initialSupply: value });
  }


  handleSubmit() {
    this.toggleLoading();
  }

  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }
}

export default CreateTokenFactory;
