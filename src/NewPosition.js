import React from 'react';

function NewPosition(props){

    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Open Position</h5>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Title</label>
                        <input name="title" value={props.title} type="text" className="form-control" id="inputEmail4" onChange={props.onChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputDescription">Description</label>
                        <textarea name="description" value={props.description} className="form-control" id="inputDescription" rows="3" onChange={props.onChange}></textarea>
                    </div>
                </div>
                <button className="btn btn-danger" onClick={props.onRemove}>Remove</button>
            </div>
        </div>
    )
}

export default NewPosition;