import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Sidebar extends Component{
    render(){
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="icon-speedometer"></i> داشبورد
                            </Link>
                        </li>

                        <li className="nav-title">
                            مدیریت کاربران
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">
                                <i className="icon-user-follow"></i> فهرست متقاضیان
                            </Link>
                            <Link className="nav-link" to="/users/new">
                                <i className="icon-people"></i> متقاضی جدید
                            </Link>
                        </li>

                        <li className="nav-title" style={{display:"none"}}>
                            اطلاعات پایه
                        </li>
                        <li className="nav-item"  style={{display:"none"}}>
                            <a className="nav-link" href="#"><i className="icon-docs"></i> وضعیت تحصیلی </a>
                        </li>

                        <li className="nav-title">
                            طرح های خیریه
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/plans">
                                <i className="icon-people"></i> فهرست طرح ها
                            </Link>
                            <Link className="nav-link" to="/plans/new">
                                <i className="icon-people"></i> طرح جدید
                            </Link>
                            <Link className="nav-link" to="/users">
                                <i className="icon-people"></i> افراد مشمول
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export {Sidebar};
