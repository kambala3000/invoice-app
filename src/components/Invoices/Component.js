import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Grid, Button, Table } from 'react-bootstrap';

import api from '../../api/invoices';
import InvoiceItem from './InvoiceItem';

class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: []
        };
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        document.title = 'Invoices';
        this.getInvoices();
    }

    getInvoices() {
        api.getInvoices().then(response => {
            this.setState({
                invoices: response
            });
        });
    }

    onDelete(id) {
        console.log(id);
    }

    render() {
        const { invoices } = this.state;
        return (
            <Grid>
                <PageHeader>
                    <strong>Invoice list</strong>
                    <Button className="page-header-btn" href="/invoices/create">
                        Create
                    </Button>
                </PageHeader>
                <Table responsive>
                    <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th width="35%">Customer</th>
                            <th width="20%">Discount</th>
                            <th width="20%">Total</th>
                            <th width="20%" />
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length > 0 &&
                            invoices
                                .map((item, index) => (
                                    <InvoiceItem
                                        key={item.id}
                                        id={item.id}
                                        num={invoices.length - index}
                                        customerId={item.customer_id}
                                        discount={item.discount}
                                        total={item.total}
                                        onDelete={this.onDelete}
                                    />
                                ))
                                .reverse()}
                    </tbody>
                </Table>
            </Grid>
        );
    }
}

Invoices.propTypes = {
    dialogModalHandler: PropTypes.func.isRequired
};

export default Invoices;
