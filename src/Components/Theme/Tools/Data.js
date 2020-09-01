import axios from 'axios';
import Config from '../../Config';
import $ from 'jquery';
import {NotificationManager} from 'react-notifications';
import { Tools } from './Tools';
import {Lang} from './../';



class Data{
    constructor(){
        // this.url = url;
    }

    /**
     *
     * @param {*} refs
     * @param {*} type = new or edit
     */
    save(url, parent, type='new', nextUrl='',callback=''){
        // console.log('save');
        // console.log(callback);
        let data = {};
        let {refs} = parent;

        let targetBTN = window.event.target;

        $('#contentFrame').css('filter', 'blur(1px)');
        $(targetBTN).addClass('btn-loading');
        $(targetBTN).attr('disabled', 'disabled');

        if(type=="edit"|| type=="update"){
            data['_method'] = 'PUT';
        }

        Object.keys(refs).forEach((ref, index)=>{
                if(ref.value!=undefined){
                    data[ref] = refs[ref].value;
                }
                else{
                    // console.log(refs[ref].refs.item);
                    // console.log(ref);
                    // console.log(Object.keys(refs[ref].refs).length);
                    if(refs[ref].refs.item == undefined && Object.keys(refs[ref].refs).length >= 1){ // Radio Button
                        data[ref] = null;
                        Object.keys(refs[ref].refs).forEach((item)=>{
                            if(refs[ref].refs[item].checked == true){
                                data[ref] = refs[ref].refs[item].value;
                            }
                        })
                    }
                    else if(refs[ref].refs.item.type == "checkbox"){
                        if(data[ref] = refs[ref].refs.item.checked)
                        {
                            data[ref] = refs[ref].refs.item.value;
                        }
                        else{
                            data[ref] = 0;
                        }
                    }
                    else if(refs[ref].refs.item.multiple == true)
                    {
                        // console.log(refs[ref].refs.item);
                        var values = window.$('#'+refs[ref].refs.item.id).val();
                        //console.log(values);
                        data[ref] = values;
                        // console.log(values);

                    }
                    else if(refs[ref].refs.item.dataset.type=='editor'){
                        // console.log(refs[ref].refs.item.editor);
                        let value = refs[ref].refs.item.editor.getData();
                        // console.log(value);
                        // let val = $("#"+refs[ref].refs.item.id).getData();
                        data[ref] = value;
                    }
                    else{
                        data[ref] = refs[ref].refs.item.value;
                    }
                    // if(refs[ref].refs.item.type != "editor")
                    // {
                    //     refs[ref].refs.item.value = editor.getData;
                    // }

                }
            }
        );

        //console.log(data);

        axios.post(`${Config.getHost()}${url}`, data)
        // axios({
        //     headers: {
        //         // 'content-type': 'application/json',
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //         // 'Content-Type': 'multipart/form-data'
        //     },
        //     method: 'POST',
        //     url: `${Config.getHost()}${url}`,
        //     data: data
        //     // params: data
        // })
        .then((response)=>{

            let result = parseInt(response.data);
            let message = response.data;
            // console.log(Lang(message));

            if(result != NaN){
                parent.setState({lastId: response.data});
                message =Lang('public.save_message');
            }
            NotificationManager.success(message, 'پیام', 5000);


            if(nextUrl != '')
            {

                let pathNextUrl = this.getSystemPrefix()+nextUrl;
                parent.props.history.replace(pathNextUrl);

            }
            if(typeof callback == "function"){
                callback(data, response.data);
            }
        })
        .catch((error)=>{
            if (error.response) {
                // The request was made and the server responded with a status code

                if(error.response.status == 422){
                    parent.setState({errors: error.response.data.errors});
                    NotificationManager.error(Lang('public.error-422'),Lang('public.error message'), 5000);
                }

                if(error.response.status == 401){
                    parent.setState({errors: error.response.data.errors});
                    NotificationManager.error(Lang('public.error-401'),Lang('public.error message'), 5000);
                }

            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);
            }
            // console.log(error.config);
            // alert(error);
            if(error == 'Error: Request failed with status code 422'){
                // NotificationManager.error('داده ها به درستی ارسال نگردیده است!!', 'پیغام خطا', 5000);
            }
            else{
                NotificationManager.error(Lang('public.Connection error'),Lang('public.error message'), 5000);
            }
        })
        .then(()=>{
            setTimeout(()=>{
                $(targetBTN).removeClass('btn-loading');
                $(targetBTN).attr('disabled', false);
                $('#contentFrame').css('filter', 'blur(0)');
            }, 1000);

        });
    }

    destroy(e){
        // let id = e.currentTarget.attributes['data-id'].value;
        // let url = `${Config.getHost()}/admin/fa/brands/del/${id}`;
        let result = window.confirm(Lang('public.Are you sure you want to delete?'));
        let url = `${Config.getHost()}`+e.currentTarget.attributes['data-url'].value;
        if(result == true){
            // alert('deleting record');
            const options = {
                url,
                method: "POST",
                header: {
                    'content-type': 'multipart/form-data'
                },
                data: {'_method':"delete"}
            }

            axios(options)
                .then((response)=>{
                    let rand = Math.random()*10000;
                    // NotificationManager.success('داده ی مورد نظر حذف گردید!!', 'پیغام', 5000);
                    NotificationManager.success(response.data, 'پیغام', 5000);
                    this.props.history.push(this.props.history.location.pathname+`?${rand}`);
                })
                .catch((error)=>{
                    if(error.response.status == 404){
                        // alert('رکورد مورد نظر یافت نشد، احتمالا قبلا حذف گردیده است!!');
                        NotificationManager.error(Lang('public.The record was not found, probably deleted already'), 5000);
                        this.render();
                    }
                })
        }
        else{
            // alert('reject');
            this.props.history.push(this.props.history.location.pathname+`?${rand}`);

        }
    }

    resetForm(parent){
        let refs = parent.refs;
        parent.refs.forEach();
    }

    getSystemPrefix(){
        let systemPrefix = "";
        let url = window.location.href;
        let urlSegments= url.split('#');

        if(urlSegments.length == 2){
            let path = urlSegments[1].split("/");
            systemPrefix = "/"+path[1];
        }
        return systemPrefix;
    }

    getInfo(url, parent, variableName = "items", callback=null){
        // console.log(url);
        const options = {
            url:Config.getHost()+url,
            method: "GET",
            header: {
                'content-type': 'application/json'
            }
        }

        axios(options)
            .then((response)=>{
                parent.setState({[variableName]: response.data});
            })
            .catch((error)=>{
                if (error.response) {
                    if(error.response.status == 422){
                        parent.setState({errors: error.response.data.errors});
                        NotificationManager.error(Lang('public.error-422'),Lang('public.error message'), 5000);
                    }

                    if(error.response.status == 401){
                        parent.setState({errors: error.response.data.errors});
                        NotificationManager.error(Lang('public.error-401'),Lang('public.error message'), 3000);
                    }
                }
            })
            .then(()=>{
                setTimeout(()=>parent.setState({loading: ""}), 400);
                if(callback != null){
                    callback();
                }
            });
    }

    archive(e)
    {
        let result = window.confirm(Lang('Move the ad to the archive list?'));
        let url = `${Config.getHost()}`+e.currentTarget.attributes['data-url'].value;
        if(result == true){
            const options = {
                url,
                method: "POST",
                header: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios(options)
            .then((response)=>{
                let rand = Math.random()*10000;
                // NotificationManager.success('داده ی مورد نظر حذف گردید!!', 'پیغام', 5000);
                NotificationManager.success(response.data, 'پیغام', 5000);
                this.props.history.push(this.props.history.location.pathname+`?${rand}`);
            })
            .catch((error)=>{
                if(error.response.status == 422){
                    alert(Lang('You can only archive verified ads!'));
                    this.render();
                }
            })
        }
    }
}

let DataObj = new Data();
export {Data, DataObj};
