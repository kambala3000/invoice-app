import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props.modalData.data };
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown(e) {
        const { onSave } = this.props.modalData;
        const { customModalHandler } = this.props;
        if (e.keyCode === 13) {
            onSave(this.state, customModalHandler);
        }
        if (e.keyCode === 27) {
            customModalHandler();
        }
    }

    render() {
        const { title, data, onSave } = this.props.modalData;
        const { customModalHandler } = this.props;
        return (
            <Modal show={true} onHide={customModalHandler}>
                <Modal.Header>
                    <Modal.Title>
                        <strong>{title}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data &&
                        Object.keys(data).map((objKey, index) => (
                            <FormGroup key={`${objKey}`}>
                                <ControlLabel>
                                    {objKey[0].toUpperCase() + objKey.slice(1)}
                                </ControlLabel>
                                <FormControl
                                    type="text"
                                    autoFocus={index === 0}
                                    value={this.state[objKey]}
                                    onChange={e => this.setState({ [objKey]: e.target.value })}
                                    onKeyDown={this.onKeyDown}
                                    onFocus={
                                        index === 0
                                            ? e => {
                                                  const val = e.target.value;
                                                  e.target.value = '';
                                                  e.target.value = val;
                                              }
                                            : null
                                    }
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={customModalHandler}>Close</Button>
                    <Button
                        bsStyle="success"
                        onClick={() => {
                            onSave(this.state, customModalHandler);
                        }}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

CustomModal.propTypes = {
    modalData: PropTypes.object.isRequired,
    customModalHandler: PropTypes.func.isRequired
};

export default CustomModal;
