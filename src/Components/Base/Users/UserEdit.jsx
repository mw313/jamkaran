import React, {Component} from 'react';
import {UserController} from './../../../Controllers';
import {UserNew} from './UserNew';

class UserEdit extends UserNew{
    constructor(props){
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        let {id} = this.props.match.params;
        UserController.show(id, this);
    }
}

export {UserEdit};