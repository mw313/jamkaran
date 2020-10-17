var Waterline = require('waterline');

var PlanCollection = Waterline.Collection.extend({
    identity: 'plans',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      title: {type:'string'},
      comment: {type:'string', allowNull: true},
      startDate: {type:'string', allowNull: true},
      totalCost: {type:'string', allowNull: true},
      packetCost: {type:'string', allowNull: true},      
      founder: {type:'string', allowNull: true}, // بانی
        
      executeStatus: {
        model: 'planExecuteStatus',
        columnName: 'status_id'
      },
      
      subject: {
        model: 'planSubjects',
        columnName: 'subject_id'
      },

      userPlans: {
        collection: 'userPlans',
        via: 'plan'
      },

    }
  });

  export {PlanCollection}