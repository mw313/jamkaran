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
                                <i className="icon-speedometer"></i> داشبورد <span className="tag tag-info">جدید</span>
                            </Link>
                        </li>

                        <li className="nav-title">
                            مدیریت کاربران
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/userLists">
                                <i className="icon-user-follow"></i> لیست کاربران
                            </Link>
                            <Link className="nav-link" to="/userNew">
                                <i className="icon-people"></i> کاربر جدید
                            </Link>
                        </li>

                        <li className="nav-title">
                            اطلاعات پایه
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="icon-docs"></i> وضعیت تحصیلی </a>
                        </li>

                        <li className="nav-title">
                            طرح های کمک رسانی
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="icon-people"></i> طرح ها </a>
                            <a className="nav-link" href="#"><i className="icon-docs"></i> افراد مشمول </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export {Sidebar};
