import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap';

class CustomerItem extends Component {
    render() {
        const { num, name, address, phone } = this.props;
        return (
            <tr>
                <td>{num}</td>
                <td>{name}</td>
                <td>{address}</td>
                <td>{phone}</td>
                <td>
                    <ButtonToolbar>
                        <Button bsStyle="primary">edit</Button>
                        <Button bsStyle="danger">delete</Button>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
}

CustomerItem.propTypes = {
    num: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
};

export default CustomerItem;
