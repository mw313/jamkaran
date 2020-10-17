var Waterline = require('waterline');

var PlanSubjectsCollection = Waterline.Collection.extend({
    identity: 'planSubjects',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
      comments: {type:'string', allowNull: true},
  
      // Add a reference to User
      plans: {
        collection: 'plans',
        via: 'subject'
      }
    }
  });

  export {PlanSubjectsCollection}