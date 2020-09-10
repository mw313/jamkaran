var Waterline = require('waterline');
// var storage = require('electron-localstorage');
let waterline = new Waterline();

import {config, UserCollection, StatusCollection, GenderCollection, EducationCollection,
        HousingCollection, MaritalCollection, ResidentCollection, UserDependantCollection, 
        NeedCollection, PousheshCollection} from './index';

waterline.registerModel(UserCollection);
waterline.registerModel(UserDependantCollection);
waterline.registerModel(StatusCollection);
waterline.registerModel(GenderCollection);
waterline.registerModel(EducationCollection);
waterline.registerModel(HousingCollection);
waterline.registerModel(MaritalCollection);
waterline.registerModel(ResidentCollection);
waterline.registerModel(NeedCollection);
waterline.registerModel(PousheshCollection);

// const loadDB = (calback) => {
const loadDB = (glob) => {
    // let models = JSON.parse(storage.getItem('Models'));
    // console.log("models");
    // console.log(models);
    // if(models == undefined || models == "" || models == null){
        waterline.initialize(config, (err, ontology)=>{
            if (err) {
                console.error(err);
                return;
            }
            models = {
                User:          ontology.collections.users,
                Status:        ontology.collections.status,
                UserDependant: ontology.collections.userDependant,
                Housing:       ontology.collections.housing,
                Gender:        ontology.collections.gender,
                Marital:       ontology.collections.marital,
                Residence:     ontology.collections.residence,
                Need:          ontology.collections.need,
                Poushesh:      ontology.collections.poushesh,
                Education:     ontology.collections.education,
            };

            // console.log("models-init");
            // console.log(models);
            // storage.setItem('Models', models);
            // storage.setItem('Models', JSON.stringify(models));
            // storage.setItem('Models', 'mmnjj');
            glob.models = models;
            // calback(models);
        });
    // }else{
    //     calback(models);
    // }
}

export {loadDB};
