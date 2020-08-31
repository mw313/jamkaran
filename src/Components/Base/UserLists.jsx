import React, {Component} from 'react';
import {UserController} from "./../../Controllers";

class UserList extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
        }
    }
    componentDidMount(){
        UserController.index({}, this);
    }
    render(){
        let {users} = this.state;
        return (
            <React.Fragment>
                لیست کاربران
                <div>
                    {
                        users.map(element => {
                            return <div>{element.name}</div>
                        })
                    }
                </div>
            </React.Fragment>
        );
    }
}

export {UserList};
