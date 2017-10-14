import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

class DialogModal extends Component {
    render() {
        const { title, itemTitle, onAccept } = this.props.modalData;
        const { dialogModalHandler } = this.props;
        return (
            <Modal show={true} onHide={dialogModalHandler}>
                <Modal.Header>
                    <Modal.Title>
                        <strong>{title}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete <strong>"{itemTitle}"?</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={dialogModalHandler}>Close</Button>
                    <Button
                        bsStyle="primary"
                        autoFocus
                        onClick={() => {
                            onAccept(dialogModalHandler);
                        }}
                    >
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

DialogModal.propTypes = {
    modalData: PropTypes.object.isRequired,
    dialogModalHandler: PropTypes.func.isRequired
};

export default DialogModal;
