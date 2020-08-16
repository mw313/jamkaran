import React, {Component} from 'react';

class Sidebar extends Component{
    render(){
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="index.html"><i className="icon-speedometer"></i> داشبرد <span className="tag tag-info">جدید</span></a>
                        </li>

                        <li className="nav-title">
                            مدیریت کاربران
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="icon-user-follow"></i> ثبت کاربر</a>
                            <a className="nav-link" href="#"><i className="icon-people"></i> لیست کاربران</a>
                            <a className="nav-link" href="#"><i className="icon-user-following"></i> دسترسی کاربران</a>
                        </li>

                        <li className="nav-title">
                            مدیریت فایل ها
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="icon-docs"></i> لیست فایل ها</a>
                        </li>

                        <li className="nav-title">
                            گزارش گیری
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="icon-people"></i> کاربران</a>
                            <a className="nav-link" href="#"><i className="icon-docs"></i>  فایل ها</a>
                        </li>                        
                    </ul>
                </nav>
            </div>
        );
    }
}

export {Sidebar};
