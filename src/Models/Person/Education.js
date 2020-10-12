var Waterline = require('waterline');

var EducationCollection = Waterline.Collection.extend({
    identity: 'education',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      users: {
        collection: 'users',
        via: 'education'
      }
    }
  });

  export {EducationCollection}