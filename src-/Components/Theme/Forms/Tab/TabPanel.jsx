import React, {Component} from 'react';

export class TabPanel extends Component {
    constructor(props){
        super(props);
    }
   
    render(){
        const {children, active, id} = this.props;

        return(
            <React.Fragment>
                <div className={active?"tab-pane fade show active":"tab-pane fade show"} id={id} role="tabpanel" aria-labelledby="first-tab_">
                    {
                        children
                    }
                </div>
            </React.Fragment>
        );
    }
}