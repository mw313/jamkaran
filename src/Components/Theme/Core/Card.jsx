
import React, {Component} from 'react';

class Card extends Component{
    render(){
        let {title, children} = this.props;
        return (
            <div class="card">
                <div class="card-header">
                    {title}
                </div>
                <div class="card-body">
                    {children}
                </div>
            </div>
        );
    }
}

export {Card};

