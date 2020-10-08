var Waterline = require('waterline');

var UserCollection = Waterline.Collection.extend({
    identity: 'users',
    datastore: 'default',
    primaryKey: 'id',
    dontUseObjectIds: true,
  
    attributes: {
      id: {type: 'number', autoMigrations: {autoIncrement: true} },
      firstname: {type:'string'},
      lastname: {type:'string'},
      father_name: {type:'string'},
      // gender: {type:'number'},
      form_code: {type:'number'},
      rabet_code: {type:'number'},
      shenasname_code: {type:'string'},
      meli_code: {type:'string'},
      birth_date: {type:'string'},
      birth_place: {type:'string'},
      // marital_status: {type:'number'},
      takafol_number: {type:'number'},

      address: {type:'string'},
      phone: {type:'string'},
      mobile: {type:'string'},
      // house_status: {type:'number'},
      house_price: {type:'string'},
      // comment:"وضعیت سکونت، بومی غیر بومی"
      // residence_status: {type:'number'},
      // comment:"وضعیت توانایی"
      // tavanaei: {type:'number'},
      // comment:"وضعیت پوشش سازمان های مرتبط"
      // poshesh: {type:'number'},
      // status: {type:'number', comment:"وضعیت کلی"},
      // education_status: {type:'number'},
      education_field: {type:'string'},

      job: {type:'string'},
      job_name: {type:'string'},
      // comment:"سمت شغل"
      job_side: {type:'string'},
      job_phone: {type:'string'},
      job_address: {type:'string'},
      // comment:"در آمد"
      job_income: {type:'string'},
      need_materials_detail: {type:'string', defaultsTo: ''},
      need_doktor_detail: {type:'string', defaultsTo: ''},

      arzyab: {type:'string'},

      createdAt: { type: 'number', autoCreatedAt: true },
      updatedAt: { type: 'number', autoUpdatedAt: true },
  
      // Add a reference to Status
      status: {
        model: 'Status',
        columnName: 'status_id'
      },
      gender:{
        model: 'Gender',
        columnName: 'gender_id'
      },
      marital:{
        model: 'Marital',
        columnName: 'marital_status'
      },
      housing:{
        model: 'Housing',
        columnName: 'house_status'
      },
      residence:{
        model: 'Residence',
        columnName: 'residence_status'
      },
      // توانایی انجام کار کردن یا از کار افتاده
      tavanaei:{
        model: 'Need',
        columnName: 'tavanaei_status'
      },
      poushesh:{
        model: 'Poushesh',
        columnName: 'poushesh_status'
      },
      education:{
        model: 'Education',
        columnName: 'education_status'
      },
      need_materials:{
        model: 'Need',
        columnName: 'need_materials_id'
      },
      
      need_moshaver:{
        model: 'Need',
        columnName: 'need_moshaver_id',
      },
      need_farhangi:{
        model: 'Need',
        columnName: 'need_farhangi_id'
      },
      need_job:{
        model: 'Need',
        columnName: 'need_job_id'
      },
      // نیاز به دریافت خدمات پزشکی
      need_doktor:{
        model: 'Need',
        columnName: 'need_doktor_id'
      },
      // نیاز به حمایت تحصیلی
      need_amozesh:{
        model: 'Need',
        columnName: 'need_amozesh_id'
      },
      // نیاز به بسترسازی معنوی
      need_manavi:{
        model: 'Need',
        columnName: 'need_manavi_id'
      },
      userDependant:{
        collection: 'UserDependant',
        via: 'user'
      },

    }
  });

  export {UserCollection};