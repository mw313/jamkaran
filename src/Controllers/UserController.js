import {loadDB} from "../Models/adapter";

class UserController {
    static index(filters = {}, component) {
        loadDB( async (models)=>{
            let {User} = models;
            let users = await User.find(filters);
            console.log(users);
            component.setState({users});
        });
    }

    static create(data, component){
        loadDB( async (models)=>{
            let {User} = models;
            let user = await User.create(data);
            component.setState({saved: true});
        });
    }

    static update(data, id, component){
        loadDB( async (models)=>{
            let {User} = models;
            let user = await User.create(data);
            component.setState({saved: true});
        });
    }

    static delete(id, component){
        loadDB( async (models)=>{
            let {User} = models;
            let user = await User.create(data);
            component.setState({saved: true});
        });
    }
}

export {UserController};