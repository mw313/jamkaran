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
                {label: "دسته بندی", sort:true, field: "subject.title"},
                {label: "وضعیت", sort:true, field: "executeStatus.title"},
                // {label: "جنسیت", sort:true, field: "gender.title"},
                {label: "عملیات", sort:false,
                    field: `<Icon to={"/plans/"+item.id+"/edit"} materialIcon="edit" title="edit" />
                            <Icon to={"/plans/"+item.id+"/people"} materialIcon="groups" title="person" />
                            <Icon to={"/plans/"+item.id+"/addPeople"} materialIcon="person_add" title="person" />
                            `,
                    width:"120px",
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
        // PlanController.convert();
        // PlanController.seed();
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
