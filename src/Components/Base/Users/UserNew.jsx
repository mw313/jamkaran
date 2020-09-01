import React, {Component} from 'react';
import {Card, Input, Select2} from "../../Theme";

class UserNew extends Component{
    render(){
        return (
            <Card title="کاربر جدید">
                <Input title="نام" />
            </Card>
        );
    }
}

export {UserNew};
