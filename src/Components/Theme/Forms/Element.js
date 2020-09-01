import React, { Component } from 'react';
// import jsxToString from 'jsx-to-string';
import isEqual from "react-fast-compare";

class Element extends Component{
    constructor(props){
        super(props);
        this.state = {rand: Math.ceil(Math.random()*1000), previousRef:null};
        this.getCurrentRef = this.getCurrentRef.bind(this);
        this.getPreviousRef = this.getPreviousRef.bind(this);
    }

    shouldComponentUpdate(nextProps){
        let changed = false;
        let changedProps = [];
        let propsNeedsTocheck = ['defaultValue', 'label', 'children', 'error', 'className', 'data', 'multiple'];

        propsNeedsTocheck.forEach((key)=>{
            if(typeof nextProps[key] != typeof this.props[key]) {
                changed = true;
                changedProps.push(key);
                this.getCurrentRef();
            }
            else if(nextProps[key] instanceof Array){
                // console.log(key+": ");
                // console.log(this.props[key]);
                if(nextProps[key].length != this.props[key].length){
                    changed = true;
                    changedProps.push(key);
                    this.getCurrentRef();
                }
                else if(key == "children" && nextProps.children != undefined){
                    if(!isEqual(nextProps.children, this.props.children)){
                        changed = true;
                        changedProps.push(key);
                        this.getCurrentRef();
                    }
                }
                else if(this.props[key] != undefined){
                    nextProps[key].forEach((item, index)=>{
                        if(!isEqual(item, this.props[key][index])){
                        // if(JSON.stringify(item) != JSON.stringify(this.props[key][index])){
                            changed = true;
                            changedProps.push(key);
                            this.getCurrentRef();
                        }
                    });
                }
            }
            else if(nextProps[key] instanceof Object){
                let str1 = JSON.stringify(nextProps[key]);
                let str2 = JSON.stringify(this.props[key]);

                if(str1 != str2){
                    changed = true;
                    changedProps.push(key);
                    this.getCurrentRef();
                }
            }
            else{
                if(nextProps[key] != this.props[key]){
                    changed = true;
                    changedProps.push(key);
                    this.getCurrentRef();
                }
            }
        });
        // console.log(changed);

        return(changed);
    }

    checkError(){
        let {error} = this.props;
        let {rand} = this.state;
        this.state.rand = rand;
        let divError = [];
        if(error!=undefined){
            this.getPreviousRef();
            let err = error.join('<br/>');
            divError.push(<div className='invalid-tooltip' id={'error-'+rand} key={rand} style={{display:"block"}}> <span dangerouslySetInnerHTML={{__html: err}}/> </div>);
        }
        return divError;
    }

    removeError(){
        let {rand} = this.state;
        if((window.$('#error-'+rand)).length > 0)
            window.$('#error-'+rand).slideUp(400);

       this.setState({rand: Math.ceil(Math.random()*1000)});
    }

    getCurrentRef(){
        return this.state.previousRef = this.refs.item;
    }

    getPreviousRef(){
        return (this.state.previousRef!=null)?this.state.previousRef.value:"";
    }

    render(){
        return <div>Parent Element!!</div>
    }
}

export {Element};
