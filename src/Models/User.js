var Waterline = require('waterline');

var UserCollection = Waterline.Collection.extend({
    identity: 'users',
    datastore: 'default',
    primaryKey: 'id',
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      firstname: {type:'string'},
      lastname: {type:'string'},
      father_name: {type:'string'},
      gender: {type:'number'},
      form_code: {type:'number'},
      rabet_code: {type:'number'},
      shenasname_code: {type:'string'},
      meli_code: {type:'string'},
      birth_date: {type:'string'},
      birth_place: {type:'string'},
      marital_status: {type:'number'},
      takafol_number: {type:'number'},

      address: {type:'string'},
      phone: {type:'string'},
      mobile: {type:'string'},
      house_status: {type:'number'},
      house_price: {type:'string'},
      // comment:"وضعیت سکونت، بومی غیر بومی"
      residence_status: {type:'number'},
      // comment:"وضعیت توانایی"
      tavanaei: {type:'number'},
      // comment:"وضعیت پوشش سازمان های مرتبط"
      poshesh: {type:'number'},
      // status: {type:'number', comment:"وضعیت کلی"},
      education_status: {type:'number'},
      education_field: {type:'string'},

      job: {type:'string'},
      job_name: {type:'string'},
      // comment:"سمت شغل"
      job_side: {type:'string'},
      job_phone: {type:'string'},
      job_address: {type:'string'},
      // comment:"در آمد"
      job_income: {type:'string'},

      need_materials: {type:'number'},
      need_moshaver: {type:'number'},
      need_farhangi: {type:'number'},
      need_job: {type:'number'},
      need_doktor: {type:'number'},
      need_amozesh: {type:'number'},
      need_manavi: {type:'number'},

      arzyab: {type:'number'},

      createdAt: { type: 'number', autoCreatedAt: true },
      updatedAt: { type: 'number', autoUpdatedAt: true },
  
      // Add a reference to Status
      status: {
        model: 'Status',
        columnName: 'status_id'
      }
    }
  });

  export {UserCollection};