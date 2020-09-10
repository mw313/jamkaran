import React, {Component} from 'react';

class Alert extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {text,className} = this.props;
        if(className == undefined) className = "";
        let id = "layer-"+Math.round(Math.random()*10000);

        return(
            <div class={"alert alert-warning alert-dismissible fade show rounded mb-0 "+className} role="alert">
                {text}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>            
        );
    }
}

export {Alert};
