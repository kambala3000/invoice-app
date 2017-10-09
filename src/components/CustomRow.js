import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap';

class CustomRow extends Component {
    render() {
        const { id, num, data, editHandler, deleteHandler } = this.props;
        return (
            <tr>
                <td>{num}</td>
                {Object.keys(data).map(objKey => <td key={`item${id}.${objKey}`}>{data[objKey]}</td>)}
                <td>
                    <ButtonToolbar>
                        <Button onClick={() => editHandler(id, data)} bsStyle="primary">
                            edit
                        </Button>
                        <Button onClick={() => deleteHandler(id)} bsStyle="danger">
                            delete
                        </Button>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
}

CustomRow.propTypes = {
    id: PropTypes.number.isRequired,
    num: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    editHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired
};

export default CustomRow;
