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

        let relationFields = ['executeStatus'];
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

        // console.log("needles");
        // console.log( needle );

        component.setState({needles:needle});
    }

    static async show(id, component){
        let {User} = models;

        let user = await User.find({id: id});
        console.log("user");
        console.log(user);
        component.setState({item: user[0]});
    }

    static async seed(component){
        let {Status, Housing, Marital, Residence, Need, Poushesh, Education} = models;
        // let user = await User.create(data);
        await Marital.create({"title":"مجرد"});
        await Marital.create({"title":"متاهل"});
        await Marital.create({"title":"مطلقه"});
        await Marital.create({"title":"همسر فوت کرده"});            
        
        await Status.create({"title":"سفید"});
        await Status.create({"title":"زرد"});
        await Status.create({"title":"قرمز"});

        await Housing.create({"title":"مالک"});
        await Housing.create({"title":"مستاجر"});
        await Housing.create({"title":"منزل پدری"});
        await Housing.create({"title":"منزل فرزند"});
        
        await Residence.create({"title":"بومی"});
        await Residence.create({"title":"غیر بومی"});
        
        await Need.create({"title":"دارد"});
        await Need.create({"title":"ندارد"});
        
        await Poushesh.create({"title":"تامین اجتماعی"});
        await Poushesh.create({"title":"اداره بهزیستی"});
        
        await Education.create({"title":"بیسواد"});
        await Education.create({"title":"نهضت سواد آموزی"});
        await Education.create({"title":"ابتدایی"});
        await Education.create({"title":"سیکل"});
        await Education.create({"title":"دیپلم"});
        await Education.create({"title":"کاردانی"});
        await Education.create({"title":"کارشناسی"});
        await Education.create({"title":"کارشناسی ارشد"});
        await Education.create({"title":"دکترا"});
        await Education.create({"title":"حوزوی"});
        // component.setState({saved: true});
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
        let {User} = models;
        let userUpdated = await User.update({id: id})
            .set(data)
            .fetch();
        if(userUpdated.length > 0)
            component.setState({saved: true});
    }

    static async delete(id, component){
        let {User} = models;
        let user = await User.create(data);
        component.setState({saved: true});        
    }
}

export {PlanController};