var Waterline = require('waterline');

var UserPlanCollection = Waterline.Collection.extend({
    identity: 'userPlans',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      date: {type:'string', allowNull: true},
      cost: {type:'string', allowNull: true},
        
      plan: {
        model: 'Plan',
        columnName: 'plan_id'
      },

      user: {
        model: 'User',
        columnName: 'user_id'
      },

      payStatus: {
        model: 'PayStatus',
        columnName: 'pay_status_id'
      },
    }
  });

  export {UserPlanCollection}