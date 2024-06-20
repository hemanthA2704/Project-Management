import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import CreateProject from "./CreateProject";

class Modal extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  

  render() {
    
    return (
      <div>
        <a className="addProjectIcon modal-trigger" data-target="modal1"><i class="material-icons">add</i></a>
        <div ref={Modal => { this.Modal = Modal;}} id="modal1" className="modal">
            <CreateProject/>
        </div>
      </div>
    );
  }
}

export default Modal;