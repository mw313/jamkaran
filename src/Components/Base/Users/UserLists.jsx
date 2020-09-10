import React, {Component} from 'react';
import {UserController} from "../../../Controllers";
import {Card, Grid, Tools} from "../../Theme";

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
            <Card title="لیست محرومان">
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>نام و نام خانوادگی</th>
                                <th>کدملی</th>
                                <th>کدرابط</th>
                                <th>کدفرم</th>
                                <th>تعدادافراد تحت تکلف</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{user.firstname} {user.lastname}</td>
                                        <td>{user.meli_code}</td>
                                        <td>{user.rabet_code}</td>
                                        <td>{user.form_code}</td>
                                        <td>{Tools.getValue(user, "user.residence.title")}</td>
                                        <td>{Tools.getValue(user, "user.status.title")}</td>
                                        <td>  </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        );
    }
}

export {UserList};
