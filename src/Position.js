import React from 'react';

function Position(props){

    return (
        <div className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{props.title}</h5>
            </div>
            <p className="mb-1">{props.description}</p>
            <button className="btn btn-primary" onClick={props.onClick}>Apply</button>
        </div>
    )
}

export default Position;