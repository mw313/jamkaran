import React, {Component} from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Dashboard } from '../Base';

class Main extends Component{
    render(){
        return (
            <main className="main">
                {/* <Breadcrumb /> */}
                <div className="container-fluid">
                    <div className="animated fadeIn">
                        <div className="row">
                            <Dashboard />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export {Main};

