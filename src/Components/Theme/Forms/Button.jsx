import React from 'react';

export const Button = (props) => {
  let {label, onClick, className, disabled} = props;

  className == undefined ?className="btn btn-primary":className=className;
  return(
      <button className={className} type="button" disabled={disabled?true:false} onClick={(event)=>{
                      window.event = event;
                      onClick(event)}
                  }>
          {label}
          <span className="loading"></span>
      </button>
  );
}
