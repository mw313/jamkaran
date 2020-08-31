import React, {Component} from 'react';
import { Routes } from './Routes';

class Main extends Component{
    render(){
        return (
            <main className="main">
                {/* <Breadcrumb /> */}
                <div className="container-fluid">
                    <div className="animated fadeIn">
                        <div className="row">
                            <Routes />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export {Main};

