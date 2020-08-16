import React from 'react';
import {Header, Footer, Sidebar, Main} from './Theme';

// const window = require('electron').BrowserWindow;

export default class App extends React.Component {
  componentDidMount(){
    // window.loadTheme();
    loadTheme();
  }
  render() {
    return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </React.Fragment>);
  }
}
