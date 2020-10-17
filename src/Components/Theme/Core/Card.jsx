
import React, {Component} from 'react';

class Card extends Component{
    click(){
        window.history.back();
    }
    render(){
        let {title, children, back} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    {title}
                    {
                        back?
                            <div className="float-left">
                                <button onClick={this.click} className="btn btn-primary"> بازگشت </button>
                            </div>
                        :""
                    }
                </div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        );
    }
}

export {Card};

