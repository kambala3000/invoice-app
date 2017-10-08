import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Grid, Button, Table } from 'react-bootstrap';

import api from '../../api';
import CustomerItem from './CustomerItem';

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        };
    }

    componentDidMount() {
        document.title = 'Customers';
        api.getCustomerList().then(response => {
            this.setState({
                customers: response
            });
        });
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
                                <CustomerItem
                                    key={item.id}
                                    id={item.id}
                                    num={++index}
                                    name={item.name}
                                    address={item.address}
                                    phone={item.phone}
                                />
                            ))}
                    </tbody>
                </Table>
            </Grid>
        );
    }
}

Customers.propTypes = {};

export default Customers;
