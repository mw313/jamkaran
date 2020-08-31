var Waterline = require('waterline');

var PetCollection = Waterline.Collection.extend({
    identity: 'pet',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {
          type: 'number',
          autoMigrations: {autoIncrement: true}
      },
      breed: {type:'string'},
      type: {type:'string'},
      name: {type:'string'},
  
      // Add a reference to User
      owner: {
        model: 'user'
      }
    }
  });

  export {PetCollection}