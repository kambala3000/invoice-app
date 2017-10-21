import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap';

import api from '../../api/customers';

class InvoiceItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    componentDidMount() {
        api.getCustomerById(this.props.customerId).then(response => {
            this.setState({ name: response.name });
        });
    }

    render() {
        const { id, num, discount, total, onDelete } = this.props;
        return (
            <tr>
                <td>{num}</td>
                <td>{this.state.name || 'Loading information...'}</td>
                <td>{discount}</td>
                <td>{total}</td>
                <td>
                    <ButtonToolbar>
                        <Button bsStyle="primary">Edit</Button>
                        <Button bsStyle="danger" onClick={() => onDelete(id)}>
                            &times;
                        </Button>
                    </ButtonToolbar>
                </td>
            </tr>
        );
    }
}

InvoiceItem.propTypes = {
    id: PropTypes.number.isRequired,
    customerId: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default InvoiceItem;
