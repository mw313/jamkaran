import React, {Component} from 'react';

export class TabList extends Component {
    constructor(props){
        super(props);
    }
   
    render(){
        const {children, active, href} = this.props;
        return(
            <React.Fragment>
                <li className="nav-item text-center">
                    <a className={active?"nav-link active":"nav-link"} id="first-tab_" data-toggle="tab" href={"#"+href} role="tab" aria-controls="first" aria-selected="true">
                        {
                            children
                        }
                    </a>
                </li>
            </React.Fragment>
        );
    }
}
