import React, {Component} from 'react';
import {UserController} from "../../../Controllers";
import {Card, Grid, Tools} from "../../Theme";

class UserList extends Component{
    constructor(props){
        super(props);        
        this.state = {
            url:`/cities`,
            users: [],
            columns: [
                {label: "نام و نام خانوادگی", sort:true, field: "<span>{item.lastname} {item.firstname}</span>"},
                {label: "کدملی", sort:true, field: "meli_code"},
                {label: "کدرابط", sort:true, field: "rabet_code"},
                {label: "کدفرم", sort:true, field: "form_code"},
                {label: "موبایل", sort:true, field: "mobile"},
                {label: "وضعیت", sort:true, field: "status.title"},
                // {label: "جنسیت", sort:true, field: "gender.title"},
                {label: "عملیات", sort:false,
                    field: `<Icon to={"/userEdit/"+item.id+"/edit"} materialIcon="edit" title="edit" />`,
                    width:"80px",
                },
            ],
            activeSearch: true,
            activeSort: true,
            searchPlaceholder: "جستجو: نام، نام خانوادگی، کدملی، موبایل",
            Controller: UserController,
            // insertLink: "#/cities/new",
            // insertLabel: "newCity"
        };
        // this.getInfo = this.getInfo.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        // UserController.convert();
    }
    
    render(){
        return (
            <Card title="لیست متقاضیان">
                <div>
                    <Grid {...this.state} />
                </div>
            </Card>
        );
    }
}
export {UserList};
