import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap';

const CustomRow = props => {
    const { id, num, data, editHandler, deleteHandler } = props;
    return (
        <tr>
            <td>{num}</td>
            {Object.keys(data).map(objKey => <td key={`item${id}.${objKey}`}>{data[objKey]}</td>)}
            <td>
                <ButtonToolbar>
                    <Button onClick={() => editHandler(id, data)} bsStyle="primary">
                        Edit
                    </Button>
                    <Button onClick={() => deleteHandler(id, data.name)} bsStyle="danger">
                        &times;
                    </Button>
                </ButtonToolbar>
            </td>
        </tr>
    );
};

CustomRow.propTypes = {
    id: PropTypes.number.isRequired,
    num: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    editHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired
};

export default CustomRow;
