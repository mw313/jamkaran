import React, {Component} from 'react';

class Header extends Component{
    render(){
        return (
            <header className="navbar">
                <div className="container-fluid">
                    <button className="navbar-toggler mobile-toggler hidden-lg-up" type="button">&#9776;</button>
                    <a className="navbar-brand" href="#"></a>
                    <ul className="nav navbar-nav hidden-md-down">
                        <li className="nav-item">
                            <a className="nav-link navbar-toggler layout-toggler" href="#">&#9776;</a>
                        </li>

                        <li className="nav-item p-x-1">
                            <a className="nav-link" href="#">داشبورد</a>
                        </li>
                        <li className="nav-item p-x-1">
                            <a className="nav-link" href="#">Users</a>
                        </li>
                        <li className="nav-item p-x-1">
                            <a className="nav-link" href="#">Settings</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav pull-left hidden-md-down">
                        <li className="nav-item">
                            <a className="nav-link aside-toggle" href="#"><i className="icon-bell"></i><span className="tag tag-pill tag-danger">5</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="icon-list"></i></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="icon-location-pin"></i></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                <img src="img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
                                <span className="hidden-md-down">مدیر</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="dropdown-header text-xs-center">
                                    <strong>تنظیمات</strong>
                                </div>
                                <a className="dropdown-item" href="#"><i className="fa fa-user"></i> پروفایل</a>
                                <a className="dropdown-item" href="#"><i className="fa fa-wrench"></i> تنظیمات</a>                                
                                <div className="divider"></div>
                                <a className="dropdown-item" href="#"><i className="fa fa-lock"></i> خروج</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link navbar-toggler aside-toggle" href="#">&#9776;</a>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}

export {Header};