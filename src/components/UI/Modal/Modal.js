import React, { Component } from "react";

import Auxiliary from "../../../hoc/Auxiliary";
import classes from "./Modal.css";
import Backdrop from "./Backdrop/Backdrop";

class Modal extends Component {
  render() {
    return (
      <Auxiliary>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed}
          modalForImage={this.props.modalForImage ? true : false}
        />
        <div
          className={
            this.props.modalForImage ? classes.ImgModal : classes.Modal
          }
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

export default Modal;
