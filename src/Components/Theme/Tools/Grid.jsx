import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';
import JsxParser from 'react-jsx-parser';
import {Link} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

import {Lang, Paging, Icon, Pic, CheckList, DataObj, Cookies, Access} from './../index';
import Config from './../../Config';

/**
 * Grid Class
 * Design By Mehdi Wosughi
 *
 * Props:
 *      url: the main grin url
 *      columns
 *      activeSort
 *      activeSearch
 *      insertLink
 *      insertLabel
 */

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
          insertLabel: props.insertLabel != undefined? props.insertLabel: Lang('public.New Item'),
          multiView: props.multiView,
          filters: props.filters != undefined? props.filters: [],
      };

      this.setNewValues();
  }

  getLastValues(){
      let name = this.props.url;
      let result = Cookies.get(name+"values");
      if(result == null || result == undefined){
          result = {page:1, perPage:5, sort:"", sortLabel:"", sortType:"", sortTypeLabel:"", search:""};
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
      let {url} = this.state;
      this.state.page = page;
      this.state.status = "";
      const options = {
          url: Config.getHost() + url,
          method: "GET",
          header: {
              'content-type': 'application/json'
          },
          params: {
              page: page,
              number: this.state.perPage,
              sort: this.state.sort,
              sortType: this.state.sortType,
              search: this.state.search
          }
      }

      const params = {
            page:     page,
            number:   this.state.perPage,
            sort:     this.state.sort,
            sortType: this.state.sortType,
            search:   this.state.search
        };

      this.setNewValues();

      axios(options)
          .then((response)=>{
              let items = response.data.data;
              if(items == undefined || items.length == 0) this.state.status = "no-data";

              let pageInfo = response.data;
              delete pageInfo.data;
              this.setState({
                  items,
                  pageInfo
              })
          })
          .catch((error)=>{
              // console.log(error)
              if(error.response)
                if(error.response.status == 401){
                    NotificationManager.error(Lang('public.error-401'),Lang('public.error message'), 5000);
                    let {host, pathname} = window.location;
                    setTimeout(()=>window.location.href="//"+host+pathname, 2000);
                }
          })
          .then(()=>{
              setTimeout(()=>this.setState({loading: ""}), 400);
          });
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
      let {columns, pageInfo, items, loading, insertLink, insertLinkAccess, insertLabel, status} = this.state;
      // console.log(status);

      if(insertLink != undefined && insertLink != "" && insertLinkAccess){
          $('#newDIV').css("display", "inline");
          $('#newBTN').attr("href", insertLink);

        //   if(insertLabel){
        //       //__________ labels translate ______________
        //           let labels = insertLabel.split('-');
        //           let labelTranslate='';
        //           if((labels.length)>0)
        //           {
        //               labels.forEach((slice)=>{
        //                   labelTranslate += Lang('public.'+slice);
        //                   labelTranslate += " ";
        //               });
        //           }

        //       $('#newBTN').html((labelTranslate==''?Lang('public.'+insertLabel):labelTranslate));
        //   }
      }

      return(
          <div>
              {this.renderHeader()}
              <div className="separator mb-5"></div>
              <div className="table-responsive">
                <table className={"data-table responsive nowrap dataTable no-footer dtr-inline "+loading}
                      role="grid" id="grid">
                    <thead>
                        <tr className='row1'>
                            <th> {Lang('public.row')} </th>
                            {columns.map((col, index)=>
                                <th key={index} style={{width:col.width}}> {(col.label)?Lang("public."+col.label):""}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {(()=>{
                            if(status == "no-data")
                                return <tr><td colSpan={columns.length+1} style={{textAlign:"center"}}> {Lang('public.no data')} </td></tr>
                            else
                                return items.map((item, index)=>
                                    <tr key={index} role="row1" className={(index%2==0)?"even":"odd"}>
                                        <td key='1000'>
                                            {pageInfo.from+index}
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
      const numbers = [5, 10, 20, 30, 50, 100];

      return(
          <div className="collapse d-md-block" id="displayOptions">
              {(multiView)?
                  <span className="ml-3 mb-2 d-inline-block float-md-right">
                      <a href="#" className="mr-2 active">
                          <i className="flaticon-view-5 view-icon"></i>
                      </a>
                      <a href="#" className="mr-2">
                          <i className="flaticon-view-4 view-icon"></i>
                      </a>
                      <a href="#" className="mr-2">
                          <i className="flaticon-view-1 view-icon s"></i>
                      </a>
                  </span>
                  :""
              }
              <div className="d-block d-md-inline-block">
                  {
                      filters.map((filter, index)=>
                          <div key={index} className="btn-group float-md-left mr-1 mb-1">
                              <button className="btn btn-outline-dark btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {filter.label}
                              </button>
                              <div className="dropdown-menu dropdown-menu-right" x-placement="top-start" style={{position: "absolute", transform: "translate3d(0px, -106px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                                  {
                                      filter.data.map((item, index)=>
                                          <a key={index} className={this.state.sortType == "ASC"?"dropdown-item active":"dropdown-item"}
                                              onClick={()=>{
                                                  this.state.sortType = "ASC";
                                                  this.state.sortTypeLabel = Lang('public.ASC');
                                                  this.getInfo(1);
                                              }}>
                                              {item.label}
                                          </a>
                                      )
                                  }
                              </div>
                          </div>
                      )
                  }

                  {(activeSort)?
                      <React.Fragment>
                      <div className="btn-group float-md-left mr-1 mb-1">
                          <button className="btn btn-outline-dark btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {(sortTypeLabel!="")?sortTypeLabel:Lang('public.order')}
                          </button>
                          <div className="dropdown-menu dropdown-menu-right" x-placement="top-start" style={{position: "absolute", transform: "translate3d(0px, -106px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                              <a className={this.state.sortType == "ASC"?"dropdown-item active":"dropdown-item"} onClick={()=>{
                                      this.state.sortType = "ASC";
                                      this.state.sortTypeLabel = Lang('public.ASC');
                                      this.getInfo(1);
                                  }}>{Lang('public.ASC')}</a>
                              <a className={this.state.sortType == "DESC"?"dropdown-item active":"dropdown-item"} onClick={()=>{
                                      this.state.sortType = "DESC";
                                      this.state.sortTypeLabel = Lang('public.DESC');
                                      this.getInfo(1);
                                  }}>{Lang('public.DESC')}</a>
                          </div>
                      </div>
                      <div className="btn-group float-md-left mr-1 mb-1">
                          <button className="btn btn-outline-dark btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {(sortLabel!="")?sortLabel:Lang('public.Order By')}
                          </button>
                          <div className="dropdown-menu dropdown-menu-right" x-placement="top-start" style={{position: "absolute", transform: "translate3d(0px, -106px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                              <a onClick={()=>{
                                      this.setState({sort: "", sortLabel: ""});
                                      this.getInfo(1);
                                  }}
                                  className={this.state.sort == ""?"dropdown-item active":"dropdown-item"}>{Lang('public.Default Field')}</a>

                              {columns.map((item, index)=>{
                                      if(item.sort)
                                          return <a onClick={()=>{
                                              this.setState({sort: item.field, sortLabel: item.label});
                                              this.getInfo(1);
                                          }}
                                          key={index}
                                          className={this.state.sort == item.field?"dropdown-item active":"dropdown-item"}>{Lang('public.'+item.label)}</a>
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
                      <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top" onMouseDown={this.search}>
                          <input placeholder={Lang('public.Search')} ref="search" defaultValue={this.state.search} onKeyUp={this.search} />
                      </div>
                      :""
                  }
              </div>
              <div className="float-md-left">
                  <span className="text-muted text-small">{Lang('public.Display')} {pageInfo.from}-{pageInfo.to} {Lang('public.From')} {pageInfo.total} {Lang('public.Item')} </span>
                  <button className="btn btn-outline-dark btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {perPage}
                  </button>
                  <div className="dropdown-menu dropdown-menu-right1">
                      {numbers.map((n, i)=>
                          <a key={i} className={n!=perPage?"dropdown-item":"dropdown-item active"}
                          onClick={()=>{ this.state.perPage = n; this.getInfo(1) }}>{n}</a>
                      )}
                  </div>
              </div>
          </div>
      );
  }
}

export {Grid};
