import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Grid, Button, Table } from 'react-bootstrap';

import api from '../api';
import CustomRow from './CustomRow';

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        };
        this.getCustomers = this.getCustomers.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.openCreateModal = this.openCreateModal.bind(this);
    }

    componentDidMount() {
        document.title = 'Customers';
        this.getCustomers();
    }

    getCustomers() {
        api.getCustomerList().then(response => {
            this.setState({
                customers: response
            });
        });
    }

    openCreateModal() {
        const modalData = {
            title: 'Create customer',
            data: {
                name: '',
                address: '',
                phone: ''
            },
            onSave: (customerData, callback) => {
                api.createCustomer(customerData).then(() => {
                    this.getCustomers();
                    callback();
                });
            }
        };

        this.props.customModalHandler(modalData);
    }

    openEditModal(id, data) {
        const modalData = {
            title: 'Edit customer',
            data,
            onSave: (customerData, callback) => {
                api.editCustomerById(id, customerData).then(() => {
                    this.getCustomers();
                    callback();
                });
            }
        };

        this.props.customModalHandler(modalData);
    }

    openDeleteModal(id, itemTitle) {
        const modalData = {
            title: 'Delete customer',
            itemTitle,
            onAccept: callback => {
                api.deletetCustomerById(id).then(() => {
                    this.getCustomers();
                    callback();
                });
            }
        };

        this.props.dialogModalHandler(modalData);
    }

    render() {
        const { customers } = this.state;
        return (
            <Grid>
                <PageHeader>
                    <strong>Customer list</strong>
                    <Button className="page-header-btn" onClick={this.openCreateModal}>
                        Create
                    </Button>
                </PageHeader>
                <Table responsive>
                    <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th width="18%">Name</th>
                            <th width="38%">Address</th>
                            <th width="20%">Phone number</th>
                            <th width="19%" />
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 &&
                            customers.map((item, index) => (
                                <CustomRow
                                    key={item.id}
                                    id={item.id}
                                    num={++index}
                                    data={{
                                        name: item.name,
                                        address: item.address,
                                        phone: item.phone
                                    }}
                                    editHandler={this.openEditModal}
                                    deleteHandler={this.openDeleteModal.bind(
                                        this,
                                        item.id,
                                        item.name
                                    )}
                                />
                            ))}
                    </tbody>
                </Table>
            </Grid>
        );
    }
}

Customers.propTypes = {
    customModalHandler: PropTypes.func.isRequired,
    dialogModalHandler: PropTypes.func.isRequired
};

export default Customers;
