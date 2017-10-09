import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Grid, Button, Table } from 'react-bootstrap';

import api from '../api';
import CustomRow from './CustomRow';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        document.title = 'Products';
        api.getProductsList().then(response => {
            this.setState({
                products: response
            });
        });
    }
    render() {
        const { products } = this.state;
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
                            <th width="60%">Name</th>
                            <th width="15%">Price</th>
                            <th width="20%" />
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 &&
                            products.map((item, index) => (
                                <CustomRow
                                    key={item.id}
                                    id={item.id}
                                    num={++index}
                                    data={{
                                        name: item.name,
                                        price: item.price
                                    }}
                                    editHandler={null}
                                    deleteHandler={null}
                                />
                            ))}
                    </tbody>
                </Table>
            </Grid>
        );
    }
}

Products.propTypes = {};

export default Products;
