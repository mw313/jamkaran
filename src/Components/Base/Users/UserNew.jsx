import React, {Component} from 'react';
import {Card, Input, Select2, Textarea, Seperator, Button, Data, Radio} from "../../Theme";
import {UserController} from './../../../Controllers';

class UserNew extends Component{
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
        UserController.needles(this);
    }
    
    save(){
        let data = Data.getRefs(this);
        // console.log(data);
        UserController.create(data, this);
    }

    render(){
        let {status, housing, marital, residence, need, poushesh, education, gender} = this.state.needles;
        let {item} = this.state;
        if(item == null)
        item = {"firstname":"علی","lastname":"علوی","father_name":"محمد","form_code":0,"rabet_code":125,
                          "shenasname_code":"22535","meli_code":"0215","birth_date":"1380","birth_place":"قم","takafol_number":5,"address":"455",
                          "phone":"09191919","mobile":"1213546","house_price":"250000","education_field":"121","job":"آزاد","job_name":"بنا",
                          "job_side":"عادی","job_phone":"223232","job_address":"قم، امام","job_income":"250000","arzyab":545,
                          "createdAt":1599549330007,"updatedAt":1599549330007,"tavanaei_status":1,"status_id":1,"gender_id":1,"marital_status":1,
                          "house_status":1,"residence_status":1,"poushesh_status":1,"education_status":1,"need_materials_id":2,"need_moshaver_id":1,
                          "need_farhangi_id":1,"need_job_id":1,"need_doktor_id":1,"need_amozesh_id":1,"need_manavi_id":1,"_id":1}

        // console.log("item");
        // console.log(item);
        return (
            <Card title="متقاضی جدید">
                <div className="row">
                    <Input className="col-md-6" label="کد فرم" ref="form_code" defaultValue={item.form_code} />
                    <Input className="col-md-6" label="کد رابط" ref="rabet_code" defaultValue={item.rabet_code} />
                </div>

                <div className="row">
                    <Seperator label="اطلاعات هویتی"/>
                    <Input className="col-md-4" label="نام" ref="firstname" defaultValue={item.firstname} />
                    <Input className="col-md-4" label="نام خانوادگی" ref="lastname" defaultValue={item.lastname} />
                    <Input className="col-md-4" label="نام پدر" ref="father_name" defaultValue={item.father_name} />                    
                </div>

                <div className="row">
                    <Input className="col-md-6" label="کد ملی" ref="meli_code" defaultValue={item.meli_code} />
                    <Input className="col-md-6" label="شماره شناسنامه" ref="shenasname_code" defaultValue={item.shenasname_code} />
                    <Input className="col-md-6" label="تاریخ تولد" ref="birth_date" defaultValue={item.birth_date} />
                    <Input className="col-md-6" label="محل تولد" ref="birth_place" defaultValue={item.birth_place} />
                    <Radio label="جنسیت" className="col-md-4" ref="gender" defaultValue={item.gender} data={gender} />
                    <Select2 label="وضعیت تاهل" className="col-md-4" ref="marital" defaultValue={item.marital}>
                        {marital.map((gs,index)=>{
                            return <option key={index} value={gs.id}>{gs.title}</option>
                        })}
                    </Select2>
                    <Input className="col-md-4" label="شماره موبایل" ref="mobile" defaultValue={item.mobile} />
                </div>
                <div className="row">
                    <Seperator label="اطلاعات محل سکونت"/>
                    <Select2 label="وضعیت مسکن" className="col-md-4" ref="housing" defaultValue={item.housing}>
                        {housing.map((gs,index)=>{
                            return <option key={index} value={gs.id}>{gs.title}</option>
                        })}
                    </Select2>
                    <Radio label="وضعیت سکونت" className="col-md-4" ref="residence" defaultValue={item.residence} data={residence} />
                    <Input className="col-md-4" label="تلفن ثابت" ref="phone" defaultValue={item.phone} />
                    <Textarea className="col-md-8" label="آدرس" ref="address" defaultValue={item.address} />
                    <Input className="col-md-4" label="ارزش منزل" ref="house_price" defaultValue={item.house_price} />
                </div>

                <div className="row">
                    <Seperator label="اطلاعات شغلی"/>
                    <Input className="col-md-4" label="شغل" ref="job" defaultValue={item.job} />
                    <Input className="col-md-4" label="عنوان" ref="job_name" defaultValue={item.job_name} />
                    <Input className="col-md-4" label="سمت شغلی" ref="job_side" defaultValue={item.job_side} />
                    <Textarea className="col-md-4" label="آدرس محل کار" ref="job_address" defaultValue={item.job_address} />
                    <Input className="col-md-4" label="تلفن محل کار" ref="job_phone" defaultValue={item.job_phone} />
                    <Input className="col-md-4" label="میزان درآمد" ref="job_income" defaultValue={item.job_income} />
                </div>

                <div className="row">
                    <Seperator label="اطلاعات تحصیلی"/>
                    <Select2 label="نوع مدرک تحصیلی" className="col-md-4" ref="education" defaultValue={item.education}>
                        {education.map((gs,index)=>{
                            return <option key={index} value={gs.id}>{gs.title}</option>
                        })}
                    </Select2>
                    <Input className="col-md-4" label="رشته تحصیلی" ref="education_field" defaultValue={item.education_field} />
                </div>

                <div className="row">
                    <Seperator label="اطلاعات نیازمندی"/>
                    <Select2 label="وضعیت" className="col-md-4" ref="status" defaultValue={item.status}>
                        {status.map((gs,index)=>{
                            return <option key={index} value={gs.id}>{gs.title}</option>
                        })}
                    </Select2>
                    <Select2 label="تحت پوشش" className="col-md-4" ref="poushesh" defaultValue={item.poushesh}>
                        {poushesh.map((gs,index)=>{
                            return <option key={index} value={gs.id}>{gs.title}</option>
                        })}
                    </Select2>
                    <Input className="col-md-4" label="تعداد افراد تحت تکفل" ref="takafol_number" defaultValue={item.takafol_number} />
                    <Radio label="توانایی انجام کار دارد؟" className="col-md-4" ref="tavanaei" defaultValue={item.tavanaei} data={need} />
                    <Radio label="نیاز مادی دارد؟" className="col-md-4" ref="need_materials" defaultValue={item.need_materials} data={need} />
                    <Radio label="نیاز به مشاور دارد؟" className="col-md-4" ref="need_moshaver" defaultValue={item.need_moshaver} data={need} />
                    <Radio label="نیاز فرهنگی دارد؟" className="col-md-4" ref="need_farhangi" defaultValue={item.need_farhangi} data={need} />
                    <Radio label="نیاز به شغل دارد؟" className="col-md-4" ref="need_job" defaultValue={item.need_job} data={need} />
                    <Radio label="نیاز به خدمات پزشکی دارد؟" className="col-md-4" ref="need_doktor" defaultValue={item.need_doktor} data={need} />
                    <Radio label="نیاز به حمایت تحصیلی دارد؟" className="col-md-4" ref="need_amozesh" defaultValue={item.need_amozesh} data={need} />
                    <Radio label="نیاز به بسترسازی معنوی دارد؟" className="col-md-4" ref="need_manavi" defaultValue={item.need_manavi} data={need} />
                    <Textarea className="col-md-12" label="نظر ارزیاب" ref="arzyab" defaultValue={item.arzyab} />
                </div>
                <div className="row">
                    <Seperator label="ذخیره سازی"/>
                    <Button label="ذخیره" onClick={this.save} />
                </div>
            </Card>
        );
    }
}

export {UserNew};
