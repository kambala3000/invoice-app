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

class InvoiceEdit extends Component {
    render() {
        const options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
            { value: 'three', label: 'Three' }
        ];
        return (
            <Grid>
                <PageHeader>
                    <strong>Edit invoice</strong>
                </PageHeader>
                <Row>
                    <Col xs={4} md={2}>
                        <FormGroup>
                            <ControlLabel>Discount (%)</ControlLabel>
                            <FormControl type="text" value={0} placeholder="0" />
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
                                value="one"
                                options={options}
                                searchable={true}
                                clearable={true}
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
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button className="product-add-btn">Add</Button>
                    </Col>
                </Row>

                <Table responsive>
                    <thead>
                        <tr>
                            <th width="35%">Name</th>
                            <th width="15%">Price</th>
                            <th width="20%">Qty</th>
                            <th width="30%%" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>
                                <FormControl type="text" value="1" />
                            </td>
                            <td />
                        </tr>
                    </tbody>
                </Table>
                <PageHeader>
                    <strong>
                        Total: <span>14.88</span>
                    </strong>
                </PageHeader>
            </Grid>
        );
    }
}

InvoiceEdit.propTypes = {};

export default InvoiceEdit;
