var Waterline = require('waterline');

var UserDependantCollection = Waterline.Collection.extend({
    identity: 'userDependant',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      user: {
        model: 'users',
        columnName: 'user_id'
      }
    }
  });

  export {UserDependantCollection}