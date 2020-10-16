var Waterline = require('waterline');

var PayStatusCollection = Waterline.Collection.extend({
    identity: 'payStatus',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      userPlans: {
        collection: 'userPlans',
        via: 'payStatus'
      }
    }
  });

  export {PayStatusCollection}