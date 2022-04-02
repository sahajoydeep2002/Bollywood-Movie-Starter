import React from 'react';
import {
    Link
  } from "react-router-dom";

function Card(props){
    var footer;
    if(props.footer)
        footer = (<div className="card-footer bg-transparent border-success">{props.footer}</div>);
    return (
        <div className="card" style={{width: "30rem"}}>
            <img className="card-img-top" src={props.photoUrl} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.description}</p>
                <Link className="btn btn-primary" to={props.link}>{props.buttonText}</Link>
            </div>
            {footer}
        </div>
    );
}

export default Card;