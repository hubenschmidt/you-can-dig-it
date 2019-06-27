import React from "react";
import "./style.css";
import API from "../../utils/API";
import { Img } from "../../components/Image";

const btn_themer= {
  color: '#fff',
  backgroundColor: '#01897b',
  borderColor: '#01897b'
}

let s= [];

const onClick= id =>{
  API.findById(id)
      .then(res =>{
        return(
            <div>
          <Search />
          <Coverflow
            // width={100%}
            height={400}
            displayQuantityOfSide={2}
            navigation={false}
            clickable={true}
            enableHeading={true}
            currentFigureScale={1.1}
            otherFigureScale={0.8}

          >
            {Img({ albums: [{images: ""}]})}
          </Coverflow>
          {/* <Container> */}
          <Row>
            <Col size="md-3 sm-12">
              {this.state.activeRecord ?
                (<AlbumDetails activeRecord={this.state.activeRecord} />
                ) : (

                  <h1 className="text-center">Choose an album from your library to view details.</h1>)}

            </Col>
            <Col size="md-4 sm-12">
              {this.state.activeRecord && this.state.activeRecord.tracklist && this.state.activeRecord.tracklist.length > 0 ?
                (
                  <Track tracks={this.state.activeRecord.tracklist} />
                ) : (
                  <h1>...</h1>
                )}
            </Col>
            <Col size="md-4 sm-12 youtube">
              <YouTube
                videoId="2g811Eo7K8U"
                opts={this.state.opts}
                onReady={this._onReady}
              />
            </Col>
          </Row>
          {/* </Container> */}
        </div>
        );
      })
      .catch(err => console.log(err));
};

function Modal(props){
    s= props.something;
    return(
        <div className="modal fade" id="Searching" tabindex="-1" role="dialog" aria-labelledby="Searches" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="Searches">Search Album</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <div className="input-group mb-3 search">
                <input type="text" className="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <div className="input-group-append">
                    <button className="btn" style={btn_themer} type="button" id="button-addon2">Search</button>
                </div>
            </div>
                <div className= {props.array? "container scroll":"container"}>
                    <div className="row justify-content-center">
                        {props.array? props.array.map( album =>{
                            return(<div className="title_card" style={{backgroundImage: 'url(' + album.img + ')'}}></div>);
                        }):<></>}
                    </div>
                </div>
                <div className="row">
                    <div className="col discog">
                            <button className="btn" style={btn_themer}><i className="fas fa-compact-disc"></i> Import from Discogs</button>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Modal;