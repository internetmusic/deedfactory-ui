import React, { Component } from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { CircularProgress, DropDownMenu, MenuItem, RaisedButton, Toggle, TextField } from 'material-ui';
import { grey900, grey500, grey300, grey100, blue500 } from 'material-ui/styles/colors';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="Main">
        <Link className="button-link" to="/create">
          <RaisedButton className="full-width button-lg" disableTouchRipple={true} buttonStyle={{ color: '#212121' }} label="Create" secondary={true} />
        </Link>
        <Link className="button-link" to="/search">
          <RaisedButton className="full-width button-lg" disableTouchRipple={true} buttonStyle={{ color: '#212121' }} label="Search" secondary={true} />
        </Link>
      </div>
    );
  }
}

export default Main;
