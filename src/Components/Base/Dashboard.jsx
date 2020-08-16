import React, {Component} from 'react';

class Dashboard extends Component{
    render(){
        return (
            <React.Fragment>
            <div className="col-sm-6 col-lg-3">
                <div className="card card-inverse card-primary">
                    <div className="card-block p-b-0">
                        <div className="btn-group pull-left">
                            <button type="button" className="btn btn-transparent active dropdown-toggle p-a-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="icon-settings"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                        <h4 className="m-b-0">9.823</h4>
                        <p>کاربر آنلاین</p>
                    </div>
                    <div className="chart-wrapper p-x-1" style={{"height":"70px"}}>
                        <canvas id="card-chart1" className="chart" height="70"></canvas>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 col-lg-3">
                <div className="card card-inverse card-info">
                    <div className="card-block p-b-0">
                        <button type="button" className="btn btn-transparent active p-a-0 pull-left">
                            <i className="icon-location-pin"></i>
                        </button>
                        <h4 className="m-b-0">9.823</h4>
                        <p>کاربر آنلاین</p>
                    </div>
                    <div className="chart-wrapper p-x-1" style={{"height":"70px"}}>
                        <canvas id="card-chart2" className="chart" height="70"></canvas>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 col-lg-3">
                <div className="card card-inverse card-warning">
                    <div className="card-block p-b-0">
                        <div className="btn-group pull-left">
                            <button type="button" className="btn btn-transparent active dropdown-toggle p-a-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="icon-settings"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                        <h4 className="m-b-0">9.823</h4>
                        <p>کاربر آنلاین</p>
                    </div>
                    <div className="chart-wrapper" style={{"height":"70px"}}>
                        <canvas id="card-chart3" className="chart" height="70"></canvas>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 col-lg-3">
                <div className="card card-inverse card-danger">
                    <div className="card-block p-b-0">
                        <div className="btn-group pull-left">
                            <button type="button" className="btn btn-transparent active dropdown-toggle p-a-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="icon-settings"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                        <h4 className="m-b-0">9.823</h4>
                        <p>کاربر آنلاین</p>
                    </div>
                    <div className="chart-wrapper p-x-1" style={{"height":"70px"}}>
                        <canvas id="card-chart4" className="chart" height="70"></canvas>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export {Dashboard};
