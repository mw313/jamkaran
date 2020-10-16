import React, {Component} from 'react';
import {PlanController} from "../../../Controllers";
import {Card, Grid, Tools} from "../../Theme";

class PlanList extends Component{
    constructor(props){
        super(props);        
        this.state = {
            columns: [
                {label: "عنوان طرح", sort:true, field: "title"},
                {label: "تاریخ شروع", sort:true, field: "startDate"},
                {label: "بانی", sort:true, field: "founder"},
                {label: "ارزش کل", sort:true, field: "totalCost"},
                {label: "ارزش هر بسته", sort:true, field: "packetCost"},
                {label: "وضعیت", sort:true, field: "status.title"},
                // {label: "جنسیت", sort:true, field: "gender.title"},
                {label: "عملیات", sort:false,
                    field: `<Icon to={"/users/"+item.id+"/edit"} materialIcon="edit" title="edit" />`,
                    width:"80px",
                },
            ],
            activeSearch: true,
            activeSort: true,
            searchPlaceholder: "جستجو: عنوان، بانی، تاریخ شروع، ارزش هر بسته",
            Controller: PlanController,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        // UserController.convert();
    }
    
    render(){
        return (
            <Card title="فهرست طرح های خیریه">
                <div>
                    <Grid {...this.state} />
                </div>
            </Card>
        );
    }
}
export {PlanList};
