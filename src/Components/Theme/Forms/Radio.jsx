import React from 'react';
import {Element, Tools} from '../index';

export class Radio extends Element {
    constructor(props){
        super(props);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidUpdate(){
        let {rand} = this.state;
        let {defaultValue} = this.props;
        let name = 'input'+rand;
        window.$("input[name='"+name+"'][value='"+defaultValue+"']").prop('checked', true);
    }

    render(){
        let {label, className, options, disabled, inputClassName , id,
             required, help, data} = this.props;
        let divError = this.checkError();
        let {rand, previousRef} = this.state;

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
                <label htmlFor="name" className={"col-md-12"}>{label}</label>
                {
                    Tools.getArray(data).map((item, index)=>{
                        if(item.title != "")
                        return <div className="radio col-md-6" key={index}>
                            <label>
                                    <input className={"form-control1 "+inputClassName}
                                        value={item.id}
                                        key={'input'+rand}
                                        ref={'item'+index==0?"":index}
                                        disabled={disabled}
                                        onFocus={()=>this.removeError()}
                                        type="radio"
                                        id={id}
                                        name={'input'+rand}
                                        {...options}
                                    />{item.title}
                            </label>
                        </div>
                    })
                }
                
                <span>
                    {requiredDiv}
                    {helpDiv}
                </span>
                {divError}
            </div>
        );
    }
}
