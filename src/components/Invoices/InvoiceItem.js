import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button } from 'react-bootstrap';

import api from '../../api/invoices';

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
        const { num, discount, total } = this.props;
        return (
            <tr>
                <td>{num}</td>
                <td>{this.state.name || 'Loading information...'}</td>
                <td>{discount}</td>
                <td>{total}</td>
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

InvoiceItem.propTypes = {
    id: PropTypes.number.isRequired,
    customerId: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default InvoiceItem;
