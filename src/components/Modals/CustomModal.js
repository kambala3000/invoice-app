import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props.modalData.data };
    }

    render() {
        const { title, data, onSave } = this.props.modalData;
        const { customModalHandler } = this.props;
        return (
            <Modal show={true} onHide={customModalHandler}>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        onSave(this.state, customModalHandler);
                    }}
                >
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
                                        required={index === 0}
                                        onFocus={
                                            index === 0
                                                ? e => {
                                                      const val = e.target.value;
                                                      e.target.value = '';
                                                      e.target.value = val;
                                                  }
                                                : null
                                        }
                                        maxLength="100"
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={customModalHandler}>Close</Button>
                        <Button type="submit" bsStyle="success">
                            Save
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

CustomModal.propTypes = {
    modalData: PropTypes.object.isRequired,
    customModalHandler: PropTypes.func.isRequired
};

export default CustomModal;
