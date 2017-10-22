import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    PageHeader,
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl,
    Table,
    Button
} from 'react-bootstrap';
import Select from 'react-select';

import customersApi from '../../api/customers';
import productsApi from '../../api/products';
import invoicesApi from '../../api/invoices';

class InvoiceForm extends Component {
    constructor() {
        super();
        this.state = {
            discount: 0,
            customers: [],
            products: [],
            customerId: null,
            productId: null,
            choosenProducts: [],
            invoiceItemsIds: []
        };
        this.saveInvoice = this.saveInvoice.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.filterProductsOptions = this.filterProductsOptions.bind(this);
        this.calcSum = this.calcSum.bind(this);
        this.onProductQtyChange = this.onProductQtyChange.bind(this);
        this.onProductRemove = this.onProductRemove.bind(this);
    }

    componentDidMount() {
        document.title = this.props.title;
        const { params } = this.context.router.route.match;
        customersApi.getCustomerList().then(response => {
            this.setState({ customers: response }, () => {
                if (params.invoiceId) {
                    invoicesApi.getInvoiceById(params.invoiceId).then(invoiceInfo => {
                        this.setState({
                            discount: invoiceInfo.discount,
                            customerId: invoiceInfo.customer_id
                        });
                    });
                }
            });
        });
        productsApi.getProductsList().then(response => {
            this.setState({ products: response }, () => {
                if (params.invoiceId) {
                    invoicesApi.getInvoiceItemsById(params.invoiceId).then(invoiceItems => {
                        const { products } = this.state;
                        let invoiceItemsIds = [];
                        let choosenProducts = [];
                        invoiceItems.forEach(invoiceItem => {
                            invoiceItemsIds.push(invoiceItem.id);
                            products.forEach(product => {
                                if (invoiceItem.product_id === product.id) {
                                    choosenProducts.push({
                                        id: product.id,
                                        itemId: invoiceItem.id,
                                        name: product.name,
                                        price: product.price,
                                        quantity: invoiceItem.quantity
                                    });
                                }
                            });
                        });
                        this.setState({ choosenProducts, invoiceItemsIds });
                    });
                }
            });
        });
    }

    saveInvoice() {
        const { customerId, discount, choosenProducts } = this.state;
        const { params } = this.context.router.route.match;

        const invoiceData = {
            customer_id: customerId,
            discount,
            total: this.calcSum()
        };

        if (params.invoiceId) {
            invoicesApi.editInvoiceById(params.invoiceId, invoiceData).then(() => {
                let { invoiceItemsIds } = this.state;
                choosenProducts.forEach(item => {
                    if (item.itemId) {
                        invoicesApi.editInvoiceItemById(params.invoiceId, item.itemId, {
                            quantity: item.quantity
                        });
                        invoiceItemsIds = invoiceItemsIds.filter(itemId => itemId !== item.itemId);
                    } else {
                        invoicesApi.sendInvoiceItem(params.invoiceId, {
                            product_id: item.id,
                            quantity: item.quantity
                        });
                    }
                });
                if (invoiceItemsIds.length !== 0) {
                    invoiceItemsIds.forEach(itemId => {
                        invoicesApi.deleteInvoiceItemById(params.invoiceId, itemId);
                    });
                }
                this.context.router.history.push('/invoices');
            });
        } else {
            invoicesApi.createInvoice(invoiceData).then(response => {
                choosenProducts.forEach(item => {
                    invoicesApi.sendInvoiceItem(response.id, {
                        product_id: item.id,
                        quantity: item.quantity
                    });
                });
                this.context.router.history.push('/invoices');
            });
        }
    }

    filterProductsOptions(currOpti) {
        const choosenProductsIds = this.state.choosenProducts.map(item => item.id);
        return currOpti.filter(item => choosenProductsIds.indexOf(item.value) === -1);
    }

    addProduct() {
        const { products, productId } = this.state;
        if (productId !== null) {
            let selectedProduct = {};
            products.forEach(item => {
                if (item.id === productId) {
                    selectedProduct = {
                        id: productId,
                        name: item.name,
                        price: item.price,
                        quantity: 1
                    };
                }
            });
            this.setState(prevState => ({
                choosenProducts: [...prevState.choosenProducts, selectedProduct],
                productId: null
            }));
        }
    }

    calcSum() {
        const { choosenProducts, discount } = this.state;
        let sum = 0;
        choosenProducts.forEach(item => {
            sum += item.quantity * item.price;
        });
        if (discount) {
            return (sum - sum / 100 * discount).toFixed(2);
        }
        return sum.toFixed(2);
    }

    onProductQtyChange(e, id) {
        e.persist();
        const val = e.target.value;
        if (val < 0) return;
        this.setState(prevState => ({
            choosenProducts: prevState.choosenProducts.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: val
                    };
                }
                return item;
            })
        }));
    }

    onProductRemove(id) {
        this.setState(prevState => ({
            choosenProducts: prevState.choosenProducts.filter(item => item.id !== id)
        }));
    }

    render() {
        const {
            discount,
            customers,
            products,
            customerId,
            productId,
            choosenProducts
        } = this.state;

        return (
            <Grid>
                <PageHeader>
                    <strong>{this.props.title}</strong>
                    <Button className="page-header-btn" href="/invoices">
                        Cancel
                    </Button>
                    <Button
                        className="page-header-btn"
                        bsStyle="success"
                        onClick={this.saveInvoice}
                        disabled={customerId === null || choosenProducts.length === 0}
                    >
                        Save
                    </Button>
                </PageHeader>
                <Row>
                    <Col xs={4} md={2}>
                        <FormGroup>
                            <ControlLabel>Discount (%)</ControlLabel>
                            <FormControl
                                type="number"
                                value={discount}
                                placeholder="0"
                                max="100"
                                min="0"
                                onChange={e => {
                                    const val = e.target.value;
                                    if (val < 0 || val > 100) return;
                                    this.setState({ discount: val });
                                }}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <ControlLabel>Customer</ControlLabel>
                            <Select
                                name="form-field-customer"
                                searchable={true}
                                clearable={true}
                                value={customerId}
                                required
                                options={customers.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                                onChange={item => {
                                    this.setState({
                                        customerId: item === null ? null : item.value
                                    });
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <ControlLabel>Add product</ControlLabel>
                            <Select
                                name="form-field-add-product"
                                searchable={true}
                                clearable={true}
                                value={productId}
                                options={products.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                                onChange={item => {
                                    this.setState({
                                        productId: item === null ? null : item.value
                                    });
                                }}
                                filterOptions={this.filterProductsOptions}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button
                            className="product-add-btn"
                            onClick={this.addProduct}
                            disabled={productId === null}
                        >
                            Add
                        </Button>
                    </Col>
                </Row>

                <Table responsive className="invoice-form-products">
                    <thead>
                        <tr>
                            <th width="35%">Name</th>
                            <th width="15%">Price</th>
                            <th width="20%">Qty</th>
                            <th width="30%%" />
                        </tr>
                    </thead>
                    <tbody>
                        {choosenProducts.length > 0 &&
                            choosenProducts
                                .map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <FormControl
                                                type="number"
                                                value={product.quantity}
                                                placeholder="0"
                                                min="0"
                                                onChange={e =>
                                                    this.onProductQtyChange(e, product.id)}
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                bsStyle="danger"
                                                onClick={() => this.onProductRemove(product.id)}
                                            >
                                                &times;
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                                .reverse()}
                    </tbody>
                </Table>
                <PageHeader>
                    <strong>
                        Total: <span>{this.calcSum()}</span>
                    </strong>
                </PageHeader>
            </Grid>
        );
    }
}

InvoiceForm.propTypes = {
    title: PropTypes.string.isRequired
};

InvoiceForm.contextTypes = {
    router: PropTypes.object
};

export default InvoiceForm;
