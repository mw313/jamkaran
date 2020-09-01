import React, {Component} from 'react';

class Footer extends Component{
    render(){
        return (
            <footer className="footer">
                <span className="text-left">
                    <a href="http://coreui.io">CoreUI</a> &copy; 2020 creativeLabs.
                </span>
                <span className="pull-right">
                    Powered by <a href="http://coreui.io">Sanegar</a>
                </span>
            </footer>
        );
    }
}

export {Footer};