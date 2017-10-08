import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Grid, Button, Table } from 'react-bootstrap';

class Customers extends Component {
    render() {
        return (
            <Grid>
                <PageHeader>
                    <strong>Customer list</strong>
                    <Button className="page-header-btn">Create</Button>
                </PageHeader>
                <Table responsive>
                    <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th width="20%">Name</th>
                            <th width="50%">Address</th>
                            <th width="25%">Phone number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                    </tbody>
                </Table>
            </Grid>
        );
    }
}

Customers.propTypes = {};

export default Customers;
