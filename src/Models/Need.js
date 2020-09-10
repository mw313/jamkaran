var Waterline = require('waterline');

var NeedCollection = Waterline.Collection.extend({
    identity: 'need',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      /* users: {
        collection: 'users',
        via: 'housing'
      } */
    }
  });

  export {NeedCollection}