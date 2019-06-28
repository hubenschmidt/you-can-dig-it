import React from "react";
import "./style.css";
import "./style.css";


function Modal(props){
    return(
        <>
        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Set Up Your Library</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <div className="input-group mb-3 search">
                <input type="text" className="form-control" placeholder="Search album..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <div className="input-group-append">
                    <button className="btn btn-outline-themer" type="button" id="button-addon2">Search</button>
                </div>
            </div>
                <div className="container scroll">
                    <div className="row justify-content-center">
                        {props.array?
                        props.array.map( album =>{
                            return(<div className="title_card" style={{backgroundImage: 'url(' + album.img + ')'}}></div>);
                        }):
                        <div/>}
                    </div>
                </div>
                <div className="row">
                    <div className="col discog">
                            <button className="btn btn-themer"><i className="fas fa-compact-disc"></i> Import from Discogs</button>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-secondary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
}

export default Modal;