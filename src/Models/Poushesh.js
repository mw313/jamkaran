var Waterline = require('waterline');

var PousheshCollection = Waterline.Collection.extend({
    identity: 'poushesh',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      users: {
        collection: 'users',
        via: 'poushesh'
      }
    }
  });

  export {PousheshCollection}