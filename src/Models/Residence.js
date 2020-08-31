var Waterline = require('waterline');

var ResidentCollection = Waterline.Collection.extend({
    identity: 'resident',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      users: {
        collection: 'users',
        via: 'resident'
      }
    }
  });

  export {ResidentCollection}