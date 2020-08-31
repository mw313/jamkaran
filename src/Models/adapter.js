var Waterline = require('waterline');
var waterline = new Waterline();

import {config, UserCollection, StatusCollection, GenderCollection, EducationCollection,
        HousingCollection, MaritalCollection, ResidentCollection, UserDependantCollection} from './index';

waterline.registerModel(UserCollection);
// waterline.registerModel(UserDependantCollection);
waterline.registerModel(StatusCollection);
// waterline.registerModel(GenderCollection);
// waterline.registerModel(EducationCollection);
// waterline.registerModel(HousingCollection);
// waterline.registerModel(MaritalCollection);
// waterline.registerModel(ResidentCollection);


const loadDB = (calback) => {
    // console.log(Waterline.getModel);
    
    waterline.initialize(config, (err, ontology)=>{
        if (err) {
            console.error(err);
            return;
        }
        let models = {
            User: ontology.collections.users,
            Status: ontology.collections.status,
        };

        calback(models);
    });    
}

export {loadDB};

/*==========================================================================================

Waterline.getModel('user', orm);

export const test = ()=>{
    waterline.initialize(config, (err, ontology)=>{
        if (err) {
            console.error(err);
            return;
        }

        // Tease out fully initialized models.
        var User = ontology.collections.user;
        var Pet = ontology.collections.pet;

        // Since we're using `await`, we'll scope our selves an async IIFE:
        (async ()=>{
            // First we create a user
            var user = await User.create({
                firstName: 'Neil',
                lastName: 'Armstrong'
            });

            // Then we create the pet
            var pet = await Pet.create({
                breed: 'beagle',
                type: 'dog',
                name: 'Astro',
                owner: user.id
            });

            // Then we grab all users and their pets
            var users = await User.find().populate('pets');
            console.log(users);
        })()
        .then(()=>{
            console.error('All done!!');
        })
        .catch((err)=>{
            console.error(err);
        });//_∏_
    });

}

*/