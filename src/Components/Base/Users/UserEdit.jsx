import {UserController} from './../../../Controllers';
import {UserNew} from './UserNew';
import {Data} from "../../Theme";

class UserEdit extends UserNew{
    constructor(props){
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        let {id} = this.props.match.params;
        this.state.id = id;
        this.state.back = true;
        this.state.pageTitle = "ویرایش اطلاعات متقاضی";
        UserController.show(id, this);
    }

    save(){
        let data = Data.getRefs(this);
        let {id} = this.state;
        // console.log(data);
        UserController.update(data, id, this);
    }
}

export {UserEdit};