
import React, {Component} from 'react';

class Card extends Component{
    render(){
        let {title, children} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        );
    }
}

export {Card};

