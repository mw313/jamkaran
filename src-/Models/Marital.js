var Waterline = require('waterline');

var MaritalCollection = Waterline.Collection.extend({
    identity: 'marital',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      users: {
        collection: 'users',
        via: 'marital'
      }
    }
  });

  export {MaritalCollection}