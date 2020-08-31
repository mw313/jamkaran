var Waterline = require('waterline');

var StatusCollection = Waterline.Collection.extend({
    identity: 'status',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      users: {
        collection: 'users',
        via: 'status'
      }
    }
  });

  export {StatusCollection}