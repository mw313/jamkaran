import React from 'react';
import {Dashboard, UserList, UserNew, UserEdit, PlanList, PlanEdit, PlanNew} from './../../Base';
import {Route} from 'react-router-dom';

// const window = require('electron').BrowserWindow;

export class Routes extends React.Component {
  render() {

    return (
    <React.Fragment>
      <Route path={'/'} key={1} component={(props)=><Dashboard {...props} />} exact={true} />
      <Route path={'/users'} key={2} component={(props)=><UserList {...props} />} exact={true} />
      <Route path={'/users/new'} key={3} component={(props)=><UserNew {...props} />} exact={true} />
      <Route path={'/users/:id/edit'} key={4} component={(props)=><UserEdit {...props} />} exact={true} />
      <Route path={'/users/:id/view'} key={5} component={(props)=><UserEdit {...props} />} exact={true} />
      
      <Route path={'/plans'} key={6} component={(props)=><PlanList {...props} />} exact={true} />
      <Route path={'/plans/new'} key={7} component={(props)=><PlanNew {...props} />} exact={true} />
      <Route path={'/plans/:id/edit'} key={8} component={(props)=><PlanEdit {...props} />} exact={true} />
      <Route path={'/plans/:id/view'} key={9} component={(props)=><PlanEdit {...props} />} exact={true} />
      <Route path={'/plans/:id/addPeople'} key={9} component={(props)=><PlanEdit {...props} />} exact={true} />
    </React.Fragment>
    );
  }
}
