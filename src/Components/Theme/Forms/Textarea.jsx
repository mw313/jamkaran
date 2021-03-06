import React from 'react';
import {Element} from './Element';

class Textarea extends Element {
    constructor(props){
        super(props);
        this.state = {value:""};
    }

    render(){
        let {label, defaultValue, className, row, options, required, help, placeholder, disabled} = this.props;
        let divError = this.checkError();
        let requiredDiv = '';
        let helpDiv = '';

        if(required == "true")
        {
            requiredDiv = <sup className="required text-danger"> * </sup>;
        }
        if(help != undefined)
        {
            helpDiv = <a href='#' alt={help}><i className="fa fa-question-circle" aria-hidden="true"></i></a>;
        }
        if (row==undefined) row = 5;
                
        return(
            <div className={"form-group "+className}>
                <label htmlFor="name">{label}</label>
                <textarea disabled={(disabled == undefined)?false:true} className="form-control" key={Math.random()*1000}
                        style={{paddingTop: '10px'}}
                        rows={row}
                        placeholder={placeholder}
                        defaultValue = {defaultValue} ref='item'
                        onFocus = {()=>this.removeError()}
                        {...options}></textarea>
                <span>
                    {requiredDiv}
                    {helpDiv}
                </span>
                {divError}
            </div>
        );
    }
}

export {Textarea};
