import {remote} from 'electron';
var models = remote.getGlobal('models')
import axios from "axios";

class PlanController {
    static async index(filters = {}, component) {
        let {Plan} = models;

        console.log(models);
        
        let search = {};
        let word = filters.search, wordNum = parseInt(filters.search);
        
        if(filters.search != ""){
            search = {
                where: {
                    or: [
                        {lastname: {contains: word}}, 
                        {firstname: {contains: word}},
                    ]
                }
            };

            if(Number.isInteger(wordNum)){
                search.where.or.push({mobile: {contains: wordNum}});
                search.where.or.push({meli_code: {contains: wordNum}});
            }
        }

        if(filters.sort == "") filters.sort = "id";
        if(filters.sortType == "") filters.sortType = "ASC";
                
        let sort = {};
        sort[filters.sort] = filters.sortType;
        search.sort = [];
        search.sort.push(sort);
        // console.log('search');
        // console.log(search);

        let users = await User.find(search)
                              .paginate({page: filters.page-1, limit: filters.number})
                              .populate(['residence', 'status']);
        let numbers = await User.find(search);
        let info = {
            current_page: filters.page, 
            last_page: Math.ceil(numbers.length/filters.number), 
            from: (filters.page-1)*filters.number + 1}

        component.setState({items: users, pageInfo:info});
    }

    static async create(data, component){        
        let {User} = models;

        let relationFields = ['housing', 'gender', 'status', 'marital', 'residence', 'tavanaei', 'poushesh', 'education',
                     'need_materials', 'need_moshaver', 'need_farhangi', 'need_job', 'need_doktor', 'need_amozesh',
                     'need_manavi'];
        relationFields.forEach(element => {
            if(data[element] == ""||data[element] == "-") data[element] = 100
        });

        let notNullStrings = ['need_materials_detail', 'need_doktor_detail'];
        notNullStrings.forEach(element => {
            if(data[element] == ""||data[element] == undefined) data[element] = '';
        });

        let user = await User.create(data);

        component.props.history.push("/userLists");
        component.setState({saved: true});
    }

    static async needles(component){
        let {Status, Housing, Marital, Residence, Need, Poushesh, Education, Gender} = models;

        let needle = {};
        needle.status    = await Status.find({});
        needle.housing   = await Housing.find({});
        needle.marital   = await Marital.find({});
        needle.residence = await Residence.find({});
        needle.need      = await Need.find({});
        needle.poushesh  = await Poushesh.find({});
        needle.education = await Education.find({});
        needle.gender    = await Gender.find({});

        // console.log("models");
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