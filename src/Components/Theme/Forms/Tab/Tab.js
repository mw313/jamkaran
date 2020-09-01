import React, {Component} from 'react';

export class Tab extends Component {
    constructor(props){
        super(props);
    }
   
    render(){
        
        return(
            <React.Fragment>
                <div className="row mb-4">
                    <div className="col-md-12 col-lg-12 col-12 mb-4">
                        <div className="card">
                            {
                                this.props.children
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
