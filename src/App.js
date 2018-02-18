import React, { Component } from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey900, grey500, grey300, grey100, blue500 } from 'material-ui/styles/colors';
import { AppBar, CircularProgress, DropDownMenu, FlatButton, FontIcon, MenuItem, RaisedButton, Toggle, TextField } from 'material-ui';

import CreateTokenFactory from './components/CreateTokenFactory.js'
import Main from './components/Main.js'
import SearchTokenFactory from './components/SearchTokenFactory.js'

import logo from './logo.svg';
import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey300,
    primary2Color: blue500,
    primary3Color: blue500,
    accent1Color: grey300,
    accent2Color: grey300,
    accent3Color: grey300,
    textColor: grey900,
    alternateTextColor: grey900
  },
});

class App extends Component {
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
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <AppBar
            className="App-bar"
            title={
              <Link className="App-title" to="/">
                <FlatButton className="button-lg no-margin" disableTouchRipple={true} label="721 Token Factory"></FlatButton>
              </Link>
            }
            iconElementLeft={<span></span>}
            iconElementRight={
              <FlatButton
                className="button-lg no-margin"
                href="https://github.com/deedfactory"
                target="_blank"
                secondary={true}
                disableTouchRipple={true}
                icon={<i className="fa fa-github no-margin" />}
                style={{ 'font-size': '36px' }}
              />
            }
          />
          <Link to="/">
            <FlatButton
              className="button-lg"
              target="_blank"
              secondary={true}
              disableTouchRipple={true}
              icon={<i className="fa fa-3x fa-arrow-circle-left no-margin" />}
              style={{ margin: '25px' }}
            />
          </Link>
          <Route exact path="/" component={Main} />
          <Route exact path="/create" component={CreateTokenFactory} />
          <Route exact path="/search" component={SearchTokenFactory} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
