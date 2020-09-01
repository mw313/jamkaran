class Tools{
  static getArray(obj){
      return (obj != undefined)? obj : [];
  }

  static getObj(obj, message='')
  {
      if(obj==null || obj==undefined || obj=="")
      {
          return  message;
      }
      else
      {
          return  obj;
      }
  }

  static getValue(obj, path, returnIfNull=null) {
      let result = obj;

      let paths = path?path.split('.'):[];
      paths.shift();

      paths.forEach((slice)=>{
          if(result!=null && result[slice] != undefined){
              result = result[slice];
          }
          else{
              result = returnIfNull;
          }
      });
      return result;
  }

  static inArray(search, array=[]){
      let find = false;
      array.forEach((item)=> {
          if(search == item) find = true
      });
      return find;
  }

  static isArray(obj){
      return Object.prototype.toString.call(obj) === '[object Array]';
  }

  static isString(obj){
      if (typeof obj === 'string' || obj instanceof String)
          return true;
      else
          return false;
  }

  static numbersEnToFa(num){
      let numbers = {'0':'۰', '1':'۱', '2':'۲', '3':'۳', '4':'٤',
                    '5':'۵', '6':'۶', '7':'۷', '8':'۸', '9':'۹'};

      if(num != undefined)
      if(Tools.isString(num)){
          Object.keys(numbers).forEach((key, index) => {
              num = num.replace(key, numbers[key]);
          });
      }
      else if(Tools.isArray(num)){
          for(let i=0; i< num.length; i++){
              if(num[i] != undefined)
              Object.keys(numbers).forEach((key, index) => {
                  num[i] = num[i].replace(key, numbers[key]);
              });
          }
      }

      return num;
  }

  static numbersFaToEn(num){
      let numbers = {'۰':'0', '۱':'1', '۲':'2', '۳':'3', '٤':'4',
                    '۵':'5', '۶':'6', '۷':'7', '۸':'8', '۹':'9'};

      if(num != undefined)
      if(Tools.isString(num)){
          Object.keys(numbers).forEach((key, index) => {
              num = num.replace(key, numbers[key]);
          });
      }
      else if(Tools.isArray(num)){
          for(let i=0; i< num.length; i++){
              if(num[i] != undefined)
              Object.keys(numbers).forEach((key, index) => {
                  num[i] = num[i].replace(key, numbers[key]);
              });
          }
      }
      return num;
  }
}

export {Tools};
