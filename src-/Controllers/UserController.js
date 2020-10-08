import {remote} from 'electron';
var models = remote.getGlobal('models')
// import { useHistory } from 'react-router-dom';
// import {loadDB} from "../Models/adapter";
// const remote = require('electron').remote;

class UserController {
    static async index(filters = {}, component) {
        let {User} = models;
        let users = await User.find(filters).paginate({page: 0, limit: 2}).populate(['residence', 'status']);
        let numbers = await User.find(filters);
        let info = {data: users, numbers: numbers.length, pages: Math.ceil(numbers.length/2)}
        console.log(info);

        component.setState({users});
    }

    static async create(data, component){        
        let {User} = models;
        let user = await User.create(data);        
        // let history = useHistory();
        // history.push("/userLists");
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

    static async update(data, id, component){
        let {User} = models;
        let user = await User.create(data);
        component.setState({saved: true});
    }

    static async delete(id, component){
        let {User} = models;
        let user = await User.create(data);
        component.setState({saved: true});        
    }
}

export {UserController};