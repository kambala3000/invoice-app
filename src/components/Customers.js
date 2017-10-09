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
        this.openEditModal = this.openEditModal.bind(this);
    }

    componentDidMount() {
        document.title = 'Customers';
        api.getCustomerList().then(response => {
            this.setState({
                customers: response
            });
        });
    }

    openEditModal(id, data) {
        const modalData = {
            title: 'Edit customer',
            data,
            onSave: customerData => {
                api.editCustomerById(id, customerData);
            }
        };
        this.props.triggerModal(modalData);
    }

    render() {
        const { customers } = this.state;
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
                                    deleteHandler={null}
                                />
                            ))}
                    </tbody>
                </Table>
            </Grid>
        );
    }
}

Customers.propTypes = {
    triggerModal: PropTypes.func.isRequired
};

export default Customers;
