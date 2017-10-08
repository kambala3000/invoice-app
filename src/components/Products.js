import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Grid, Button, Table } from 'react-bootstrap';

class Products extends Component {
    render() {
        return (
            <Grid>
                <PageHeader>
                    <strong>Product list</strong>
                    <Button className="page-header-btn">Create</Button>
                </PageHeader>
                <Table responsive>
                    <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th width="65%">Name</th>
                            <th width="30%">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                    </tbody>
                </Table>
            </Grid>
        );
    }
}

Products.propTypes = {};

export default Products;
