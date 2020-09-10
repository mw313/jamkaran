import React from 'react';
import {Element} from './Element';

class Select2 extends Element{
  constructor(props){
      super(props);
      this.state = {id:"", divError:""};

      this.createId = this.createId.bind(this);
      this.createSelect2 = this.createSelect2.bind(this);
  }

  createId(){
      let id = "select"+(new Date()).getTime()+Math.ceil(Math.random()*10000);
      this.state.id = id;
  }

  createSelect2(){
      let {label, defaultValue, placeholder, options, data} = this.props;
      let id = this.state.id;
      let self = this;
      let labelTranslated = label;

      if( typeof defaultValue != "number" && typeof defaultValue != "string" && defaultValue != undefined && defaultValue.length > 0){
          let temp = [];
          defaultValue.map((item)=>{
              temp.push(item.id);
          });
          defaultValue = temp;
      }

      window.$(document).ready(function() {
          window.$(`#${id}`).select2({
              width: '100%',
              theme: "bootstrap",
              data: data,
              // rtl: true,
              allowClear: true,
              placeholder: placeholder,
              maximumSelectionSize: 6
          }).on("select2:select",(e)=>{
              if (options!=undefined) {
                  options.onChange(e)
              }
          }).on('focus', function (evt) {
              self.removeError();
          });

          // if(defaultValue != undefined)
          // console.log(`window.$(#${id}).val(${defaultValue}).trigger("change");`);

          if(defaultValue != undefined)
            window.$(`#${id}`).val(defaultValue).trigger("change");
      })
      this.state.divError = this.checkError();
  }

  render(){
      let {label, multiple, className, options, required, help, disabled} = this.props;
      this.createId();
      this.createSelect2();
      let {id, divError} = this.state;
      let helpDiv = '';
      let requiredDiv = '';

      if(required == "true")
      {
          requiredDiv = <sup className="required text-danger"> * </sup>;
      }
      if(help != undefined)
      {
          helpDiv = <a href='#' alt={help}><i className="fa fa-question-circle" aria-hidden="true"></i></a>;
      }

      return(
            <div className={"form-group "+className}>
                <label htmlFor="name">{label}</label>
                <select
                        id = {id}
                        ref="item"
                        className="form-control select2-single"
                        tabIndex="-1"
                        aria-hidden="true"
                        multiple={Boolean(multiple)}
                        disabled={(disabled == undefined)?false:true}
                        data ={(options!=undefined)?options.data:""}
                    >
                    <option value="0"></option>
                    {
                        this.props.children
                    }
                </select>
                <span>
                    {requiredDiv}
                    {helpDiv}
                </span>
                {divError}
            </div>
      );
  }
}

export {Select2};
