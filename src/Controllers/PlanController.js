import {remote} from 'electron';
var models = remote.getGlobal('models')
import axios from "axios";
import {QueryBuilder} from './index';

class PlanController {
    static async index(filters = {}, component) {
        let {Plan} = models;
        let serachIn = {
            strings:['title', 'startDate', 'totalCost', 'packetCost'],
            // numbers:['mobile', 'meli_code'],
        };        
        let search = QueryBuilder.processFilter(filters, serachIn);
        let result = await QueryBuilder.findIn(Plan, filters, search, ['executeStatus', 'subject']);
        component.setState(result);
    }

    static async create(data, component){
        let {Plan} = models;

        let relationFields = ['executeStatus', 'subject'];
        relationFields.forEach(element => {
            if(data[element] == ""||data[element] == "-") data[element] = 100
        });

        // let notNullStrings = ['need_materials_detail', 'need_doktor_detail'];
        // notNullStrings.forEach(element => {
        //     if(data[element] == ""||data[element] == undefined) data[element] = '';
        // });

        let plan = await Plan.create(data);

        component.props.history.push("/plans");
        component.setState({saved: true});
    }

    static async needles(component){
        let {PlanExecuteStatus, PlanSubject} = models;

        let needle = {};
        needle.executeStatuses    = await PlanExecuteStatus.find({});
        needle.subjects           = await PlanSubject.find({});

        component.setState({needles:needle});
    }

    static async show(id, component){
        let {Plan} = models;
        let plan = await Plan.find({id: id}).populate(['executeStatus', 'subject']);
        
        component.setState({item: plan[0]});
    }

    static async seed(){
        // console.log(models);
        // return;
        let {PlanExecuteStatus, PlanSubject, PayStatus} = models;
                
        await PlanSubject.create({"title":"بسته غذایی"});
        await PlanSubject.create({"title":"لوازم التحریر"});
        await PlanSubject.create({"title":"گوشت قربانی"});

        // await PlanSubject.create({"title":""});

        await PlanExecuteStatus.create({"title":"در انتظار شروع"});
        await PlanExecuteStatus.create({"title":"در حال اجرا"});
        await PlanExecuteStatus.create({"title":"اتمام یافته"});

        await PayStatus.create({"title":"در صفت دریافت"});
        await PayStatus.create({"title":"دریافت شد"});
        await PayStatus.create({"title":"عدم حضور"});
        await PayStatus.create({"title":"تغییر آدرس"});
        await PayStatus.create({"title":"لغو"});
    }

    static convert(){
        axios.get('http://www.ikvu.ac.ir/main/videoChat/test.php')
             .then((response)=>{
                    console.log(response.data);
                    response.data.map((item)=>{
                        UserController.create(item);
                    });
                });
    }

    static async update(data, id, component){
        let {Plan} = models;

        let planUpdated = await Plan.update({id: id})
            .set(data)
            .fetch();
        if(planUpdated.length > 0)
            component.setState({saved: true});
    }

    static async delete(id, component){
        let {Plan} = models;
        let plan = await Plan.create(data);
        component.setState({saved: true});        
    }
}

export {PlanController};