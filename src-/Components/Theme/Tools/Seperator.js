import React from 'react';

export const Seperator = (props) => {
  let {label, className} = props;

  return(
      <div className={"col-md-12 seperator "+className}>
          <div className="seperator-title">
            {label}
          </div>
          <div className="seperator-hr">
            <hr/>
          </div>
      </div>
  );
}
