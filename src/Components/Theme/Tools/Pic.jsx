import React, { Component } from 'react';

class Pic extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {src, defaultImg, style,classImg} = this.props;

        var image = new Image();
        image.src = src;

        if (image.width == 0){
            return <img src={defaultImg} className={classImg} style={style} />;
        } else {
            return <img src={src} className={classImg} style={style} />;
        }
    }
}

export {Pic};
