import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Grid, Button, Table } from 'react-bootstrap';

class Invoices extends Component {
    render() {
        return (
            <Grid>
                <PageHeader>
                    <strong>Invoice list</strong>
                    <Button className="page-header-btn">Create</Button>
                </PageHeader>
                <Table responsive>
                    <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th width="35%">Customer</th>
                            <th width="25%">Discount</th>
                            <th width="25%">Total</th>
                            <th width="10%%" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>
                                <Button bsStyle="link">edit</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Grid>
        );
    }
}

Invoices.propTypes = {};

export default Invoices;
