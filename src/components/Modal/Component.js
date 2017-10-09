import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    FormGroup,
    ControlLabel,
    FormControl,
    ButtonToolbar,
    Button
} from 'react-bootstrap';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props.modalData.data };
    }

    render() {
        const { title, data } = this.props.modalData;
        return (
            <Modal show={true}>
                <Modal.Header>
                    <Modal.Title>
                        <strong>{title}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data &&
                        Object.keys(data).map(objKey => (
                            <FormGroup key={`${objKey}`}>
                                <ControlLabel>{objKey}</ControlLabel>
                                <FormControl type="text" value={data[objKey]} />
                                <FormControl.Feedback />
                            </FormGroup>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button>Close</Button>
                    <Button bsStyle="success">Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

CustomModal.propTypes = {
    modalData: PropTypes.object.isRequired
};

export default CustomModal;
