import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';
import JsxParser from 'react-jsx-parser';
import {Link} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

import {Lang, Paging, Icon, Pic, CheckList, DataObj, Cookies, Access} from './../index';
import Config from './../../Config';

class Grid extends Component{
  constructor(props){
      super(props);

      this.getInfo = this.getInfo.bind(this);
      this.isJSX = this.isJSX.bind(this);
      this.search = this.search.bind(this);
      this.renderHeader = this.renderHeader.bind(this);
      this.setNewValues = this.setNewValues.bind(this);
      this.getLastValues = this.getLastValues.bind(this);

      let prefix = DataObj.getSystemPrefix();
      let insertLink = "";
      let insertLinkAccess = false;

      if(props.insertLink != undefined){
          insertLink = props.insertLink;
          insertLinkAccess = Access.check(insertLink);
          if(prefix != undefined && prefix != null){
              insertLink = insertLink.replace('#', '#'+prefix);
          }
      }

      const defaultValues = this.getLastValues();
      this.state = {
          url: props.url,
          items: [],
          status: "",
          hash: "",
          columns: props.columns!=undefined? props.columns:{},
          loading: 'tableLoading',
          page: defaultValues.page,
          pageInfo: {},
          perPage: defaultValues.perPage,

          sort: defaultValues.sort,
          sortLabel: defaultValues.sortLabel,
          sortType: defaultValues.sortType,
          sortTypeLabel: defaultValues.sortTypeLabel,
          activeSort: props.activeSort,
          search: defaultValues.search,
          activeSearch: props.activeSearch,
          insertLink: insertLink,
          insertLinkAccess: insertLinkAccess,
          insertLabel: props.insertLabel != undefined? props.insertLabel: Lang('New Item'),
          multiView: props.multiView,
          filters: props.filters != undefined? props.filters: [],
          Controller: props.Controller,
      };

      this.setNewValues();
  }

  getLastValues(){
      let name = this.props.url;
      let result = Cookies.get(name+"values");
      if(result == null || result == undefined){
          result = {page:1, perPage:10, sort:"", sortLabel:"", sortType:"", sortTypeLabel:"", search:""};
      }
      else{
          result = JSON.parse(result);
      }

      return result;
  }

  setNewValues(){
      let name = this.props.url;
      let {page, perPage, sort, sortLabel, sortType, sortTypeLabel, search} = this.state;
      const state = {page, perPage, sort, sortLabel, sortType, sortTypeLabel, search};
      let result = JSON.stringify(state);

      Cookies.set(name+"values", result);
  }

  componentWillMount() {
      this.state.hash = window.location.hash;
      this.getInfo(this.state.page);
  }

  componentWillUpdate(){
      if(this.state.hash != window.location.hash){
          this.state.hash = window.location.hash;
          this.getInfo(this.state.page);
      }
  }

  componentDidUpdate(){
      window.$('th:contains(عملیات)').addClass('op');
  }

  getInfo(page=1){
      this.setState({loading: "tableLoading"});
      this.state.page = page;
      this.state.status = "";
      const options = {
        page: page,
        number: this.state.perPage,
        sort: this.state.sort,
        sortType: this.state.sortType,
        search: this.state.search
      }
      
      this.setNewValues();
      this.state.Controller.index(options, this);
      return;
  }

  resolve(path, obj) {
      return path.split('.').reduce(function(prev, curr) {
          return prev ? prev[curr] : null
      }, obj || self)
  }

  isJSX(x){
      if(x.substr(0, 1) == "<"){
          return true;
      }
      else
      {
          return false;
      }
  }

  search(e){
      let search = this.refs.search.value;
      let keyCode = e.which;
      if(keyCode==13){
          this.state.search = search;
          this.getInfo(1);
      }
  }

  proccessFilters(){
      this.props.filters.forEach((filter, index)=>{
          if(filter.url != "" && filter.url != undefined)
          {
              axios.get(filter.url)
                  .then((response)=>{
                      // console.log(response.data);
                      let data = [];
                      response.data.forEach((d)=>{
                          if(filter.valueIdex == "" && filter.valueIdex == undefined) filter.valueIdex = "id";
                          if(filter.labelIndex == "" && filter.labelIndex == undefined) filter.labelIndex = "title";
                          data.push({value: d[filter.valueIdex], label: d[filter.labelIndex]})
                      });
                      this.props.filter[index].data = response.data;
                  })
                  .catch((error)=>{
                      console.log("Filter Error:"+this.props.filter[index].name+"-"+error);
                  });
          }
      });
  }

  toJSX(str, items){
      const del = this.delete;
      return <JsxParser
          key={Math.random()*1000}
        //   bindings={{...items}}
          bindings={items}
          components={{ Link, Config, Icon, Pic,CheckList }}
          jsx={str}
      />
  }

  render(){
      let {columns, pageInfo, items, loading, status} = this.state;

      console.log(items);

      return(
          <div>
              {this.renderHeader()}
              <div className="separator mb-5"></div>
              <div className="table-responsive">
                <table className={"table table-striped "+loading}
                      role="grid" id="grid">
                    <thead>
                        <tr className='row1'>
                            <th> # </th>
                            {columns.map((col, index)=>
                                <th key={index} style={{width:col.width}}> {(col.label)?Lang(col.label):""}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {(()=>{
                            if(items == undefined || items.length == 0)
                                return <tr><td colSpan={columns.length+1} style={{textAlign:"center"}}> داده ای یافت نشد!! </td></tr>
                            else
                                return items.map((item, index)=>
                                    <tr key={index} role="row1" className={(index%2==0)?"even":"odd"}>
                                        <td key='1000'>
                                            {pageInfo.from + index}
                                        </td>
                                        {columns.map((col, index)=>{
                                                if(!this.isJSX(col.field)){
                                                    let resolve = this.resolve(col.field, item);
                                                    let result = [];
                                                    // console.log();
                                                    // console.log(typeof resolve + resolve);
                                                    if(typeof resolve != "object" || resolve == null){
                                                        result.push(<span key={'span'+index} dangerouslySetInnerHTML={{__html: resolve}} />);
                                                    }
                                                    else{
                                                        resolve.map((item, index)=>{
                                                            result.push(<div key={index}>
                                                                {item.title?item.title
                                                                    :item.name?item.name
                                                                    :item.label?item.label:""}
                                                                </div>);
                                                        })
                                                    }
                                                    return (<td key={index}>
                                                        {/* {this.resolve(columns[col], item)}  */}
                                                        {/* {this.toJSX("{item."+col.field+"}", {this:this, item:item})} */}
                                                        {result}
                                                    </td>)
                                                }
                                                else
                                                {
                                                    // console.log(col.field);
                                                    return (<td key={index}>
                                                        {/* <div dangerouslySetInnerHTML={{__html: columns[col].replace(/:id/g, item.id)}}></div> */}
                                                        {this.toJSX(col.field, Object.assign( {}, {this:this, item:item}, col.bindings ))}
                                                    </td>)
                                                }
                                            }
                                        )}

                                    </tr>
                            )
                        })()
                    }
                    </tbody>
                </table>
              </div>
              {
                  (pageInfo.last_page > 2) ? <div className="separator mb-2"></div> : ""
              }
              <Paging pageInfo={pageInfo} pagingHandler={this.getInfo} />
          </div>
      );
  }

  renderHeader(){

      let {pageInfo, perPage, activeSearch, activeSort, multiView, columns, sort, sortLabel, sortType, sortTypeLabel, filters} = this.state;
      let {searchPlaceholder} = this.props;
      const numbers = [5, 10, 20, 30, 50, 100];

    //   return "";

      return(
          <div className="d-md-block" id="displayOptions">
              <div className="d-block col-md-12 d-md-inline-block">
                   <div className="btn-group float-md-left mr-1 mb-1 float-md-left">
                        {/* <span className="text-muted text-small">نمایش {pageInfo.from}-{pageInfo.to} از {pageInfo.total} آیتم </span> */}
                        <button className="btn btn-filter dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {perPage}
                        </button>
                        <div className="dropdown-menu dropdown-menu-bottom">
                            {numbers.map((n, i)=>
                                <a key={i} className={n!=perPage?"dropdown-item":"dropdown-item active"}
                                onClick={()=>{ this.state.perPage = n; this.getInfo(1) }}>{n}</a>
                            )}
                        </div>
                    </div>
                  {(activeSort)?
                      <React.Fragment>
                        <div className="btn-group float-md-left mr-1 mb-1">
                            <button className="btn btn-filter dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {(sortTypeLabel!="")?sortTypeLabel:"ترتیب"}
                            </button>

                            <div className="dropdown-menu dropdown-menu-bottom" x-placement="top-start" style={{position: "absolute", transform: "translate3d(0px, -106px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                                <a className={this.state.sortType == "ASC"?"dropdown-item active":"dropdown-item"} onClick={()=>{
                                        this.state.sortType = "ASC";
                                        this.state.sortTypeLabel = "صعودی";
                                        this.getInfo(1);
                                    }}>{"صعودی"}</a>
                                <a className={this.state.sortType == "DESC"?"dropdown-item active":"dropdown-item"} onClick={()=>{
                                        this.state.sortType = "DESC";
                                        this.state.sortTypeLabel = "نزولی";
                                        this.getInfo(1);
                                    }}>{"نزولی"}</a>
                            </div>
                        </div>
                        <div className="btn-group float-md-left mr-1 mb-1">
                            <button className="btn btn-filter dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {(sortLabel!="")?sortLabel:"ترتیب بر اساس"}
                            </button>
                            <div className="dropdown-menu dropdown-menu-bottom" x-placement="top-start" style={{position: "absolute", transform: "translate3d(0px, -106px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                                <a onClick={()=>{
                                        this.setState({sort: "", sortLabel: ""});
                                        this.getInfo(1);
                                    }}
                                    className={this.state.sort == ""?"dropdown-item active":"dropdown-item"}>{Lang('Default Field')}</a>

                                {columns.map((item, index)=>{
                                        if(item.sort)
                                            return <a onClick={()=>{
                                                this.setState({sort: item.field, sortLabel: item.label});
                                                this.getInfo(1);
                                            }}
                                            key={index}
                                            className={this.state.sort == item.field?"dropdown-item active":"dropdown-item"}>{Lang(''+item.label)}</a>
                                        else
                                            return null;
                                    }
                                )}
                            </div>
                        </div>
                      </React.Fragment>
                      :""
                  }
                  {(activeSearch)?
                      <div className="form-group col-md-4" onMouseDown={this.search}>
                          <input className="form-control" placeholder={searchPlaceholder?searchPlaceholder:"جستجو"} ref="search" defaultValue={this.state.search} onKeyUp={this.search} />
                      </div>
                      :""
                  }
              </div>
              
          </div>
      );
  }
}

export {Grid};
