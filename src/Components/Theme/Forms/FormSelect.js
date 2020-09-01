import React from 'react';
import {Element} from './Element';
import $ from "jquery";

export class FormSelect extends Element {
    constructor(props) {
        super(props);
    }
    render() {
        let {className, selected, placeholder, label, end, start, defaultValue, id} = this.props;
        let result = [];
        for(let i=start; i<=end; i++){
            result.push(<option value={i}>{i}</option>);
        }
        let divError = this.checkError();
        if (typeof defaultValue != "number" && typeof defaultValue != "string" && defaultValue != undefined && defaultValue.length > 0) {
            let temp = [];
            // console.log(defaultValue);
            defaultValue.map((item) => {
                temp.push(item.id);
            });
            defaultValue = temp;
        }
        $(document).ready(function () {
            $(`#${id}`).val(defaultValue).trigger("change");
        });
        return (
            <label className={"form-group has-float-label " + className}>
                <select id={id}  required style={{textAlign:'left'}} ref='item' defaultValue={defaultValue} value={selected}
                className="form-control select2-single" placeholder={placeholder}>
                    {result}
                </select>
                <span>{label}</span>
                {divError}
            </label>

        );
    }
}
