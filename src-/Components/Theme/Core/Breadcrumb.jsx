import React, {Component} from 'react';

class Breadcrumb extends Component{
    render(){
        return (
        <ol class="breadcrumb">
            <li class="breadcrumb-item">خانه</li>
            <li class="breadcrumb-item"><a href="#">مدیریت</a>
            </li>
            <li class="breadcrumb-item active">داشبرد</li>
            
            <li class="breadcrumb-menu">
                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <a class="btn btn-secondary" href="#"><i class="icon-speech"></i></a>
                    <a class="btn btn-secondary" href="./"><i class="icon-graph"></i> &nbsp;داشبرد</a>
                    <a class="btn btn-secondary" href="#"><i class="icon-settings"></i> &nbsp;تنظیمات</a>
                </div>
            </li>
        </ol>        
        );
    }
}

export {Breadcrumb};

