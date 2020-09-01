import React, {Component} from 'react';
import {UserController} from "../../../Controllers";
import {Card} from "../../Theme";

class UserList extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
        };
        this.getInfo = this.getInfo.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount(){
        this.getInfo();
    }

    getInfo(){
        UserController.index({}, this);
    }

    render(){
        let {users} = this.state;
        return (
            <Card title="لیست کاربران">
                <div>
                    {
                        users.map(element => {
                            return <div>{element.name}</div>
                        })
                    }
                </div>
            </Card>
        );
    }
}

export {UserList};
