import React from 'react';
import {Dashboard, UserList, UserNew} from './../../Base';
import {Route} from 'react-router-dom';

// const window = require('electron').BrowserWindow;

export class Routes extends React.Component {
  render() {

    return (
    <React.Fragment>
      <Route path={'/'} key={1} component={(props)=><Dashboard {...props} />} exact={true} />
      <Route path={'/'} key={1} component={(props)=><Dashboard {...props} />} exact={true} />
      <Route path={'/'} key={1} component={(props)=><Dashboard {...props} />} exact={true} />
      <Route path={'/'} key={1} component={(props)=><Dashboard {...props} />} exact={true} />
      <Route path={'/'} key={1} component={(props)=><Dashboard {...props} />} exact={true} />
      <Route path={'/'} key={1} component={(props)=><Dashboard {...props} />} exact={true} />
      <Route path={'/'} key={1} component={(props)=><Dashboard {...props} />} exact={true} />
      <Route path={'/userLists'} key={2} component={(props)=><UserList {...props} />} exact={true} />
      <Route path={'/userNew'} key={3} component={(props)=><UserNew {...props} />} exact={true} />
    </React.Fragment>
    );
  }
}
