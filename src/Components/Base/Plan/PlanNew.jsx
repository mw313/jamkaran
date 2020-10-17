import React, {Component} from 'react';
import {Card, Input, Select2, Textarea, Seperator, Button, Data, Radio} from "../../Theme";
import {PlanController} from './../../../Controllers';

class PlanNew extends Component{
    constructor(props){
        super(props);
        this.state = {
            needles: {status:[], housing:[], marital:[], residence:[], need:[], poushesh:[], education:[], gender:[]},
            item: null
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.save = this.save.bind(this);
    }
    
    componentDidMount(){
        PlanController.needles(this);
    }
    
    save(){
        let data = Data.getRefs(this);
        PlanController.create(data, this);
    }

    render(){
        let {executeStatuses, subjects} = this.state.needles;
        let {item} = this.state;
        if(item == null)
        item = {"title":"طرح تست","startDate":"1399/07/21","comment":"طرح حمایت از افراد بی بضاعت",
                "executeStatus":{id: 1},"subject":{id: 1}, "packetCost":"1000", 
                "totalCost":"20000", "founder":"خادمان جمکران"}
        
        return (
            <Card title="طرح جدید">
                <div className="row">
                    <Input className="col-md-6" label="عنوان طرح" ref="title" defaultValue={item.title} />
                    <Input className="col-md-6" label="تاریخ شروع" ref="startDate" defaultValue={item.startDate} />
                    <Textarea className="col-md-12" label="توضیحات" ref="comment" defaultValue={item.comment} />
                    <Radio label="وضعیت اجرا" className="col-md-4" ref="tavanaei" defaultValue={item.executeStatus.id} data={executeStatuses} />
                    <Radio label="موضوع" className="col-md-4" ref="tavanaei" defaultValue={item.subject.id} data={subjects} />
                </div>

                <div className="row">
                    <Seperator label="اطلاعات بسته"/>
                    <Input className="col-md-4" label="ارزش هر بسته" ref="packetCost" defaultValue={item.packetCost} />
                    <Input className="col-md-4" label="ارزش کل" ref="totalCost" defaultValue={item.totalCost} />
                    <Input className="col-md-4" label="بانی" ref="founder" defaultValue={item.founder} />                    
                </div>
                <div className="row">
                    <Seperator label="ذخیره سازی"/>
                    <Button label="ذخیره" onClick={this.save} />
                </div>
            </Card>
        );
    }
}

export {PlanNew};