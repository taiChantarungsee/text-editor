import React, { Component } from 'react';
import Modal from 'material-ui/Modal';

class SimpleModal extends Component {
    state = {
      open: false,
    };
  
    handleOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
};

render() {
    return (
      <Modal 
        open={this.state.open}
        onClose={this.handleClose}>
        <GoogleModalComponent />
      </Modal>
    );
  }
}
export default GoogleModalComponent;