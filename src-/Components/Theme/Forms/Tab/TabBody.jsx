import React, {Component} from 'react';

export class TabBody extends Component {
    constructor(props){
        super(props);
    }
   
    render(){
        
        return(
            <React.Fragment>
                <div className="card-body">
                    <div className="tab-content">
                        {
                            this.props.children
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
