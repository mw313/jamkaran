import React, {Component} from 'react';
import {PlanController} from './../../../Controllers';
import {PlanNew} from './PlanNew';

class PlanEdit extends PlanNew{
    constructor(props){
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        let {id} = this.props.match.params;
        this.state.id = id;
        PlanController.show(id, this);
    }

    save(){
        let data = Data.getRefs(this);
        let {id} = this.state;
        // console.log(data);
        PlanController.create(data, this);
    }
}

export {PlanEdit};