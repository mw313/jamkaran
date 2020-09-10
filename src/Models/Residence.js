var Waterline = require('waterline');

var ResidentCollection = Waterline.Collection.extend({
    identity: 'residence',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      users: {
        collection: 'users',
        via: 'residence'
      }
    }
  });

  export {ResidentCollection}