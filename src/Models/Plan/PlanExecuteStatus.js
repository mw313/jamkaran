var Waterline = require('waterline');

var PlanExecuteStatusCollection = Waterline.Collection.extend({
    identity: 'planExecuteStatus',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
  
      // Add a reference to User
      plans: {
        collection: 'plans',
        via: 'executeStatus'
      }
    }
  });

  export {PlanExecuteStatusCollection}