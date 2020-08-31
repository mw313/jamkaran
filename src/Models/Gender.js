var Waterline = require('waterline');

var GenderCollection = Waterline.Collection.extend({
    identity: 'gender',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      users: {
        collection: 'users',
        via: 'gender'
      }
    }
  });

  export {GenderCollection}