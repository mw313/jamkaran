var Waterline = require('waterline');

var HousingCollection = Waterline.Collection.extend({
    identity: 'housing',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      users: {
        collection: 'users',
        via: 'housing'
      }
    }
  });

  export {HousingCollection}