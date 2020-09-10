import React, {Component} from 'react';

export class TabHeader extends Component {
    constructor(props){
        super(props);
    }
   
    render(){
        
        return(
            <React.Fragment>
                <div className="card-header pl-0 pr-0">
                    <ul className="nav nav-tabs card-header-tabs ml-0 mr-0" role="tablist">
                        {
                            this.props.children
                        }
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}
