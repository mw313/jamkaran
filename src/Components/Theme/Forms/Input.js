import React from 'react';
import {Element} from './Element';

export class Input extends Element {
    constructor(props){
        super(props);
    }

    render(){
        let {label, defaultValue, error, className, type, placeholder, options, disabled, inputClassName , id,
             required, help, max,min , maxlength} = this.props;
        let divError = this.checkError();
        let {rand, previousRef} = this.state;

        // console.log(this.state.previousRef);

        let helpDiv = '';
        let requiredDiv = '';

        if(required == "true")
        {
            requiredDiv = <sup className="required text-danger"> * </sup>;
        }
        if(help != undefined)
        {
            // helpDiv = <div className='alert alert-primary'> {help}</div>;
            helpDiv = <a href='#'  alt={help}><i class="fa fa-question-circle" aria-hidden="true"></i></a>;
        }

        if(type=="hidden"){
            return (
                <input type={type}
                       defaultValue={defaultValue}
                       ref='item'
                       id={id}
                />
            )
        }

        let labelTranslated = label;
        return(
            <div className = {className}>
                <label className={"form-group has-float-label "}>
                    <input className={"form-control "+inputClassName}
                           defaultValue = {defaultValue}
                           key={'input'+rand}
                           ref='item'
                           disabled={disabled}
                           placeholder={(placeholder)?placeholder:""}
                           onFocus={()=>this.removeError()}
                           id={id}
                           max={max}
                           type={type?type:"text"}
                           min={min}
                           maxLength={maxlength}
                           {...options}
                    />
                    <span>
                        {requiredDiv}
                        {labelTranslated}
                        {helpDiv}
                    </span>
                    {divError}
                </label>
            </div>
        );
    }
}
