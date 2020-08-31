import React from 'react';
import {Header, Footer, Sidebar, Main} from './Theme';
import { HashRouter } from 'react-router-dom';

// const window = require('electron').BrowserWindow;

export default class App extends React.Component {
  componentDidMount(){
    // window.loadTheme();
    loadTheme();
  }
  render() {
    return (    
      <HashRouter>
        <Header />
        <Sidebar />
        <Main />
        <Footer />
      </HashRouter>
    );
  }
}
