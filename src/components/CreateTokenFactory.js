import React, { Component } from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { CircularProgress, DropDownMenu, MenuItem, RaisedButton, Toggle, TextField } from 'material-ui';
import { grey900, grey500, grey300, grey100, blue500 } from 'material-ui/styles/colors';

import CreateTokenFactoryResults from './CreateTokenFactoryResults';

class CreateTokenFactory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      name: '',
      symbol: '',
      maxSupply: ''
    };
  }

  render() {
    return <form className="CreateTokenFactory-form">
      <TextField className="justify-center full-width" name="name" floatingLabelText="Name" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.name} onChange={this.handleNameChange.bind(this)} />
      <TextField className="justify-center full-width" name="symbol" floatingLabelText="Symbol" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.symbol} onChange={this.handleSymbolChange.bind(this)} />
      <TextField className="justify-center full-width" name="description" floatingLabelText="Description" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />
      <TextField className="justify-center full-width" name="maxSupply" floatingLabelText="Maximum Supply" inputStyle={{ color: '#E0E0E0' }} floatingLabelStyle={{ color: '#E0E0E0' }} value={this.state.maxSupply} onChange={this.handleMaxSupplyChange.bind(this)} />
      <Link to={{
        pathname: `/create/results`,
        state: { ...this.state }
      }}
      >
        <RaisedButton className="justify-center buffer-top-lg button-lg full-width" disableTouchRipple={true} buttonStyle={{ color: '#212121' }} label="Create" primary={true} />
      </Link>
    </form>
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

  handleMaxSupplyChange(e, value) {
    this.setState({ maxSupply: value });
  }
}

export default CreateTokenFactory;
