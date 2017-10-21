import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Grid, Button, Table } from 'react-bootstrap';

import api from '../api/products';
import CustomRow from './CustomRow';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
        this.getProducts = this.getProducts.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.openCreateModal = this.openCreateModal.bind(this);
    }

    componentDidMount() {
        document.title = 'Products';
        this.getProducts();
    }

    getProducts() {
        api.getProductsList().then(response => {
            this.setState({
                products: response
            });
        });
    }

    openCreateModal() {
        const modalData = {
            title: 'Create product',
            data: {
                name: '',
                price: ''
            },
            onSave: (productData, callback) => {
                api.createProduct(productData).then(() => {
                    this.getProducts();
                    callback();
                });
            }
        };

        this.props.customModalHandler(modalData);
    }

    openEditModal(id, data) {
        const modalData = {
            title: 'Edit product',
            data,
            onSave: (productData, callback) => {
                api.editProductById(id, productData).then(() => {
                    this.getProducts();
                    callback();
                });
            }
        };

        this.props.customModalHandler(modalData);
    }

    openDeleteModal(id, itemTitle) {
        const modalData = {
            title: 'Delete product',
            itemTitle,
            onAccept: callback => {
                api.deleteProductById(id).then(() => {
                    this.getProducts();
                    callback();
                });
            }
        };

        this.props.dialogModalHandler(modalData);
    }

    render() {
        const { products } = this.state;
        return (
            <Grid>
                <PageHeader>
                    <strong>Product list</strong>
                    <Button className="page-header-btn" onClick={this.openCreateModal}>
                        Create
                    </Button>
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
                            products
                                .map((item, index) => (
                                    <CustomRow
                                        key={item.id}
                                        id={item.id}
                                        num={products.length - index}
                                        data={{
                                            name: item.name,
                                            price: item.price
                                        }}
                                        editHandler={this.openEditModal}
                                        deleteHandler={this.openDeleteModal.bind(
                                            this,
                                            item.id,
                                            item.name
                                        )}
                                    />
                                ))
                                .reverse()}
                    </tbody>
                </Table>
            </Grid>
        );
    }
}

Products.propTypes = {
    customModalHandler: PropTypes.func.isRequired,
    dialogModalHandler: PropTypes.func.isRequired
};

export default Products;
